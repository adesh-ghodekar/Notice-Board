import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const session = await requireAdmin(req, res);
  if (!session) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const name = req.body?.name?.trim();
    const username = req.body?.username?.trim();
    const email = req.body?.email?.trim();
    const password = req.body?.password;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const existing = await prisma.admin.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existing) {
      return res.status(400).json({ error: "Username or Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { name, username, email, password: hashedPassword },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        // password intentionally excluded from the response
      },
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create admin." });
  }
}
