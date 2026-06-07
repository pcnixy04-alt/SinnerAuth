import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const devices = await prisma.device.findMany({
    where: { userId: session.user.id },
    include: {
      project: { select: { name: true } },
      license: { select: { key: true } },
    },
    orderBy: { lastSeenAt: "desc" },
    take: 50,
  })

  return NextResponse.json(devices)
}
