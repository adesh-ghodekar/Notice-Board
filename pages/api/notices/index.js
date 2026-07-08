import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {

  if (req.method === "GET") {

    try {

      const notices = await prisma.notice.findMany({
        orderBy: [
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

  return res.status(405).json({
    error: "Method Not Allowed",
  });

}