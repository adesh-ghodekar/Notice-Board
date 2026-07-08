import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
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
            ? await prisma.admin.findUnique({
                where: {
                    email: login,
                },
            })
            : await prisma.admin.findUnique({
                where: {
                    username: login,
                },
            });

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

export default NextAuth(authOptions);