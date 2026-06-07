import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const { value } = await req.json()

    const config = await prisma.configuration.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!config) {
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 })
    }

    const updated = await prisma.configuration.update({
      where: { id },
      data: { value },
    })

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
