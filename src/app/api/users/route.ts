import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const requester = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
  const isAdmin = requester?.role === "SUPER_ADMIN"

  const users = await prisma.user.findMany({
    where: isAdmin ? undefined : { id: session.user.id },
    select: {
      id: true,
      email: true,
      username: true,
      displayName: true,
      role: true,
      isActive: true,
      isVerified: true,
      lastLoginAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: isAdmin ? 50 : undefined,
  })

  return NextResponse.json(users)
}
