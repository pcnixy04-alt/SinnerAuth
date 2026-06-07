import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          },
        })

        if (!user || !user.passwordHash) return null

        if (!user.isActive) {
          throw new Error("Your account has been banned from SinnerAuth")
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) return null

        const isExpired = user.plan === "PROFESSIONAL" && user.planExpiresAt && new Date(user.planExpiresAt) < new Date()
        if (isExpired) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: "FREE", planExpiresAt: null, planReminded: false },
          })
          user.plan = "FREE"
          user.planExpiresAt = null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.displayName || user.username,
          image: user.avatarUrl,
          role: user.role,
          plan: user.plan,
          planExpiresAt: user.planExpiresAt?.toISOString() ?? null,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.plan = (user as any).plan
        token.planExpiresAt = (user as any).planExpiresAt
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).role = token.role
        ;(session.user as any).plan = token.plan
        ;(session.user as any).planExpiresAt = token.planExpiresAt
      }
      return session
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id) {
        await prisma.auditLog.create({
          data: {
            action: "LOGIN",
            userId: user.id,
            resource: "user",
            resourceId: user.id,
            details: { method: "credentials" },
          },
        }).catch(() => {})
      }
    },
  },
}
