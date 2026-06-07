import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: string, ipAddress?: string, userAgent?: string) {
  const token = require("crypto").randomBytes(48).toString("hex")
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = await prisma.session.create({
    data: {
      token,
      userId,
      ipAddress,
      userAgent,
      expiresAt,
    },
  })

  return session
}

export async function validateSession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session || !session.isActive || session.expiresAt < new Date()) {
    return null
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { lastActivity: new Date() },
  })

  return session
}

export async function createAuditLog(params: {
  action: string
  userId: string
  resource?: string
  resourceId?: string
  details?: any
  ipAddress?: string
  userAgent?: string
}) {
  return prisma.auditLog.create({
    data: {
      action: params.action as any,
      userId: params.userId,
      resource: params.resource,
      resourceId: params.resourceId,
      details: params.details,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    },
  })
}
