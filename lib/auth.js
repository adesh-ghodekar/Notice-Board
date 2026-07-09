import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        login: {
          label: "Email or Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const login = credentials.login.trim();

        const admin = login.includes("@")
          ? await prisma.admin.findUnique({ where: { email: login } })
          : await prisma.admin.findUnique({ where: { username: login } });

        if (!admin) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin.id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Shared guard for API routes: resolves the session and writes a 401
 * response automatically when there isn't one. Callers should `return`
 * immediately when this resolves to `null`.
 *
 *   const session = await requireAdmin(req, res);
 *   if (!session) return;
 */
export async function requireAdmin(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  return session;
}
