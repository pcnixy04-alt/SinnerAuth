import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST() {
  const existing = await prisma.user.findUnique({ where: { username: "SinnerAdmin" } })
  if (existing) {
    return NextResponse.json({ message: "Admin already exists", id: existing.id })
  }

  const passwordHash = await bcrypt.hash("00", 12)
  const admin = await prisma.user.create({
    data: {
      email: "admin@sinnerauth.com",
      username: "SinnerAdmin",
      displayName: "Sinner Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isVerified: true,
    },
  })

  return NextResponse.json({ message: "Admin created", id: admin.id }, { status: 201 })
}
