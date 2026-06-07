import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { isBanned } = await req.json()

  const device = await prisma.device.findFirst({
    where: { id: params.id, userId: session.user.id },
  })

  if (!device) {
    return NextResponse.json({ error: "Device not found" }, { status: 404 })
  }

  const updated = await prisma.device.update({
    where: { id: params.id },
    data: { isBanned },
  })

  return NextResponse.json(updated)
}
