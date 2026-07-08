import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const {
      name,
      username,
      email,
      password,
    } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const existing = await prisma.admin.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existing) {
      return res.status(400).json({
        error: "Username or Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(admin);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to create admin.",
    });
  }
}