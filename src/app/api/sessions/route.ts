import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const sessions = await prisma.session.findMany({
    where: { userId: session.user.id },
    include: { project: { select: { name: true } } },
    orderBy: { lastActivity: "desc" },
    take: 50,
  })

  return NextResponse.json(sessions)
}
