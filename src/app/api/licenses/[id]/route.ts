import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const license = await prisma.license.findFirst({
    where: { id: params.id, userId: session.user.id },
  })

  if (!license) {
    return NextResponse.json({ error: "License not found" }, { status: 404 })
  }

  await prisma.license.update({
    where: { id: params.id },
    data: { status: "REVOKED" },
  })

  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { status } = await req.json()

  const license = await prisma.license.findFirst({
    where: { id: params.id, userId: session.user.id },
  })

  if (!license) {
    return NextResponse.json({ error: "License not found" }, { status: 404 })
  }

  const updated = await prisma.license.update({
    where: { id: params.id },
    data: { status },
  })

  return NextResponse.json(updated)
}
