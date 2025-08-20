import NextAuth, { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/" },

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // 👈 id session me inject
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // 👈 id token me save
      }
      return token;
    },
  },
  
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
