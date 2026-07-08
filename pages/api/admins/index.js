import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (req.method === "GET") {
    try {
      const admins = await prisma.admin.findMany({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return res.status(200).json(admins);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Failed to fetch admins.",
      });
    }
  }

  return res.status(405).json({
    error: "Method Not Allowed",
  });
}