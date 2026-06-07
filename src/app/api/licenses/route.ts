import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { generateLicenseKey } from "@/lib/utils"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const licenses = await prisma.license.findMany({
    where: { userId: session.user.id },
    include: {
      project: { select: { name: true } },
      _count: { select: { devices: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return NextResponse.json(licenses)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { projectId, type, maxUsers, maxDevices, expiresInDays } = await req.json()

    if (!projectId || !type) {
      return NextResponse.json({ error: "Project ID and type are required" }, { status: 400 })
    }

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: session.user.id },
    })
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const license = await prisma.license.create({
      data: {
        key: generateLicenseKey(),
        type,
        maxUsers: maxUsers || 1,
        maxDevices: maxDevices || 1,
        expiresAt: expiresInDays ? new Date(Date.now() + expiresInDays * 86400000) : null,
        userId: session.user.id,
        projectId,
      },
    })

    return NextResponse.json(license, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
