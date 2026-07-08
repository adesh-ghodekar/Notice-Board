import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid Notice ID",
    });
  }

  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id,
      },
    });

    if (!notice) {
      return res.status(404).json({
        error: "Notice not found",
      });
    }

    const updatedNotice = await prisma.notice.update({
      where: {
        id,
      },
      data: {
        pinned: !notice.pinned,
      },
    });

    return res.status(200).json(updatedNotice);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to update pinned status.",
    });
  }
}