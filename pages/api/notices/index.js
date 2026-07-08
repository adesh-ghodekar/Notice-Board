import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {

  // ==========================
  // GET ALL NOTICES (PUBLIC)
  // ==========================
  if (req.method === "GET") {
    try {

      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            pinned: "desc",
          },
          {
            priority: "desc",
          },
          {
            publishDate: "desc",
          },
        ],
      });

      return res.status(200).json(notices);

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        error: "Failed to fetch notices",
      });

    }
  }

  // ==========================
  // AUTH CHECK
  // ==========================
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  // ==========================
  // CREATE NOTICE
  // ==========================
  if (req.method === "POST") {

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

      if (!publishDate || isNaN(Date.parse(publishDate))) {
        return res.status(400).json({
          error: "Invalid publish date.",
        });
      }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
          pinned: false,
        },
      });

      return res.status(201).json(notice);

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        error: "Failed to create notice.",
      });

    }

  }

  return res.status(405).json({
    error: "Method Not Allowed",
  });
}