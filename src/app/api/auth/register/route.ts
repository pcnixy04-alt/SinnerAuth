import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, createAuditLog } from "@/lib/auth"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(30),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, username } = registerSchema.parse(body)

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        displayName: username,
      },
    })

    await createAuditLog({
      action: "CREATE",
      userId: user.id,
      resource: "user",
      resourceId: user.id,
      details: { method: "register" },
    }).catch(() => {})

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
