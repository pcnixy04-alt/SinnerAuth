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

  const [totalUsers, activeSessions, totalLicenses, totalDevices, totalProjects, recentUsers, recentSessions] = await Promise.all([
    prisma.user.count(),
    prisma.session.count({ where: { isActive: true } }),
    prisma.license.count(),
    prisma.device.count(),
    prisma.project.count(),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, email: true, username: true, role: true, isActive: true, createdAt: true } }),
    prisma.session.findMany({ orderBy: { lastActivity: "desc" }, take: 5, include: { user: { select: { username: true } }, project: { select: { name: true } } } }),
  ])

  return NextResponse.json({
    stats: { totalUsers, activeSessions, totalLicenses, totalDevices, totalProjects },
    recentUsers,
    recentSessions,
  })
}
