import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const session = await requireAdmin(req, res);
  if (!session) return;

  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Notice ID" });
  }

  try {
    const notice = await prisma.notice.findUnique({ where: { id } });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    const updatedNotice = await prisma.notice.update({
      where: { id },
      data: { pinned: !notice.pinned },
    });

    return res.status(200).json(updatedNotice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update pinned status." });
  }
}
