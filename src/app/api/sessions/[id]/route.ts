import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const sess = await prisma.session.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!sess) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  await prisma.session.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
