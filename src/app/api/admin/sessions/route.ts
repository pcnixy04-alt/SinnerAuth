import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const requester = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (requester?.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const sessions = await prisma.session.findMany({
    include: {
      user: { select: { username: true, email: true } },
      project: { select: { name: true } },
    },
    orderBy: { lastActivity: "desc" },
    take: 100,
  })

  return NextResponse.json(sessions)
}
