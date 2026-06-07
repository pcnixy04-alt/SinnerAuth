import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const configs = await prisma.configuration.findMany({
    where: { userId: session.user.id },
    include: { project: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(configs)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { key, value, projectId, environment, isEncrypted, description } = await req.json()

    if (!key || !projectId) {
      return NextResponse.json({ error: "Key and project ID are required" }, { status: 400 })
    }

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: session.user.id },
    })
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const config = await prisma.configuration.create({
      data: {
        key,
        value,
        userId: session.user.id,
        projectId,
        environment: environment || "production",
        isEncrypted: isEncrypted || false,
        description,
      },
    })

    return NextResponse.json(config, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
