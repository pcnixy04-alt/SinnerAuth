import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, createSession, createAuditLog } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
      await createAuditLog({
        action: "LOGIN_FAILED",
        userId: user.id,
        resource: "user",
        resourceId: user.id,
        details: { reason: "Invalid password" },
      })

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const session = await createSession(user.id)

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    await createAuditLog({
      action: "LOGIN",
      userId: user.id,
      resource: "session",
      resourceId: session.id,
    })

    return NextResponse.json({
      session: {
        token: session.token,
        expiresAt: session.expiresAt,
      },
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    })
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
