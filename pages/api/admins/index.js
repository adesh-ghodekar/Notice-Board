import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

export default async function handler(req, res) {
  const session = await requireAdmin(req, res);
  if (!session) return;

  if (req.method === "GET") {
    try {
      const admins = await prisma.admin.findMany({
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          // password intentionally excluded
        },
      });

      return res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch admins." });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: "Method Not Allowed" });
}
