import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";
import { validateNoticeInput, toNoticeData } from "../../../utils/validateNotice";

export default async function handler(req, res) {
  // ==========================
  // GET ALL NOTICES (PUBLIC)
  // Urgent-first ordering happens here, in the database query.
  // ==========================
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [{ pinned: "desc" }, { priority: "desc" }, { publishDate: "desc" }],
      });

      return res.status(200).json(notices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch notices" });
    }
  }

  // ==========================
  // AUTH CHECK (everything below requires an admin session)
  // ==========================
  const session = await requireAdmin(req, res);
  if (!session) return;

  // ==========================
  // CREATE NOTICE
  // ==========================
  if (req.method === "POST") {
    try {
      const errors = validateNoticeInput(req.body);

      if (errors.length > 0) {
        return res.status(400).json({ error: errors[0] });
      }

      const notice = await prisma.notice.create({
        data: {
          ...toNoticeData(req.body),
          pinned: false,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create notice." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method Not Allowed" });
}
