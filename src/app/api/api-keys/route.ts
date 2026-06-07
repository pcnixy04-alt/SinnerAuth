import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { generateApiKey } from "@/lib/utils"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apiKeys = await prisma.apiKey.findMany({
    where: { userId: session.user.id },
    include: { project: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(apiKeys)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } })
    if (user?.plan === "FREE") {
      const count = await prisma.apiKey.count({ where: { userId: session.user.id, isActive: true } })
      if (count >= 1) {
        return NextResponse.json({ error: "Free plan limit: 1 API key. Upgrade to create more." }, { status: 403 })
      }
    }

    const { name, projectId, permissions, expiresInDays } = await req.json()

    if (!name || !projectId) {
      return NextResponse.json({ error: "Name and project ID are required" }, { status: 400 })
    }

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: session.user.id },
    })
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const { key: fullKey, prefix, lastChars } = generateApiKey()

    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key: fullKey,
        prefix,
        lastChars,
        permissions: permissions || [],
        userId: session.user.id,
        projectId,
        expiresAt: expiresInDays ? new Date(Date.now() + expiresInDays * 86400000) : null,
      },
    })

    return NextResponse.json({ ...apiKey, fullKey }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
