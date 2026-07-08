import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {

  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid Notice ID",
    });
  }

  // ==========================
  // GET SINGLE NOTICE
  // ==========================

  if (req.method === "GET") {

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

      return res.status(200).json(notice);

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        error: "Failed to fetch notice",
      });

    }

  }

  // ==========================
  // UPDATE NOTICE
  // ==========================

  if (req.method === "PUT") {

    try {

      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      if (!title?.trim() || !body?.trim()) {
        return res.status(400).json({
          error: "Title and Body are required.",
        });
      }

      const updatedNotice = await prisma.notice.update({

        where: {
          id,
        },

        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },

      });

      return res.status(200).json(updatedNotice);

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        error: "Failed to update notice.",
      });

    }

  }

  // ==========================
  // DELETE NOTICE
  // ==========================

  if (req.method === "DELETE") {

    try {

      await prisma.notice.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Notice deleted successfully.",
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        error: "Failed to delete notice.",
      });

    }

  }

  return res.status(405).json({
    error: "Method Not Allowed",
  });

}