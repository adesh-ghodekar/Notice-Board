import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";
import { validateNoticeInput, toNoticeData } from "../../../utils/validateNotice";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Notice ID" });
  }

  // ==========================
  // GET SINGLE NOTICE (PUBLIC)
  // ==========================
  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({ where: { id } });

      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      return res.status(200).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch notice" });
    }
  }

  // ==========================
  // AUTH CHECK
  // ==========================
  const session = await requireAdmin(req, res);
  if (!session) return;

  // ==========================
  // UPDATE NOTICE
  // Runs the exact same validation as create, so a PUT can't skip
  // checks (e.g. an invalid publishDate) that POST enforces.
  // ==========================
  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const errors = validateNoticeInput(req.body);

      if (errors.length > 0) {
        return res.status(400).json({ error: errors[0] });
      }

      const updatedNotice = await prisma.notice.update({
        where: { id },
        data: toNoticeData(req.body),
      });

      return res.status(200).json(updatedNotice);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Notice not found" });
      }

      console.error(error);
      return res.status(500).json({ error: "Failed to update notice." });
    }
  }

  // ==========================
  // DELETE NOTICE
  // ==========================
  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({ where: { id } });

      return res.status(200).json({ message: "Notice deleted successfully." });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Notice not found" });
      }

      console.error(error);
      return res.status(500).json({ error: "Failed to delete notice." });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Method Not Allowed" });
}
