import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const seg = () => Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `${seg()}-${seg()}-${seg()}-${seg()}`
}

function randomIp(): string {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
]

const locations = ["New York, US", "London, UK", "Tokyo, JP", "Berlin, DE", "Sydney, AU", "Toronto, CA", "Mumbai, IN", "Seoul, KR"]

export async function POST() {
  const existingAdmin = await prisma.user.findUnique({ where: { username: "SinnerAdmin" } })
  if (!existingAdmin) {
    return NextResponse.json({ error: "Admin not found. Run /api/admin/seed first." }, { status: 400 })
  }

  const existingData = await prisma.user.count({ where: { username: { startsWith: "testuser" } } })
  if (existingData > 0) {
    return NextResponse.json({ message: "Demo data already exists. Delete it first if you want to re-seed." })
  }

  const passwordHash = await bcrypt.hash("demo1234", 12)

  const usersData = [
    { email: "alice@demo.com", username: "alice", displayName: "Alice Johnson" },
    { email: "bob@demo.com", username: "bob", displayName: "Bob Smith" },
    { email: "carol@demo.com", username: "carol", displayName: "Carol Williams" },
    { email: "dave@demo.com", username: "dave", displayName: "Dave Brown" },
  ]

  const users = await Promise.all(
    usersData.map((u, i) =>
      prisma.user.create({
        data: {
          ...u,
          passwordHash,
          role: i === 0 ? "ADMIN" : "USER",
          isVerified: i < 3,
          isActive: i !== 3,
          lastLoginAt: new Date(Date.now() - Math.random() * 86400000 * 7),
        },
      })
    )
  )

  const projects = await Promise.all([
    prisma.project.create({
      data: { name: "SinnerGuard", description: "Advanced anti-cheat protection system", slug: "sinner-guard", userId: existingAdmin.id, isActive: true },
    }),
    prisma.project.create({
      data: { name: "SinnerAuth Pro", description: "Premium authentication service", slug: "sinner-auth-pro", userId: existingAdmin.id, isActive: true },
    }),
    prisma.project.create({
      data: { name: "SinnerAnalytics", description: "Real-time analytics platform", slug: "sinner-analytics", userId: users[0].id, isActive: true },
    }),
    prisma.project.create({
      data: { name: "RetroArcade", description: "Classic game emulator service", slug: "retro-arcade", userId: users[1].id, isActive: false },
    }),
  ])

  const licenseTypes = ["premium", "enterprise", "basic", "lifetime", "monthly", "yearly"]
  const statuses = ["ACTIVE", "ACTIVE", "ACTIVE", "SUSPENDED", "EXPIRED", "REVOKED"] as const

  const licenses = await Promise.all(
    Array.from({ length: 12 }, (_, i) =>
      prisma.license.create({
        data: {
          key: generateKey(),
          status: statuses[i % statuses.length],
          type: licenseTypes[i % licenseTypes.length],
          maxUsers: [1, 1, 5, 10, 25, 100][i % 6],
          maxDevices: [1, 3, 5, 10, 25, -1][i % 6],
          expiresAt: i % 3 === 0 ? new Date(Date.now() + 86400000 * 30 * (i + 1)) : null,
          userId: users[i % users.length].id,
          projectId: projects[i % projects.length].id,
        },
      })
    )
  )

  const sessions = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.session.create({
        data: {
          token: crypto.randomUUID(),
          ipAddress: randomIp(),
          userAgent: userAgents[i % userAgents.length],
          location: locations[i % locations.length],
          isActive: i < 6,
          lastActivity: new Date(Date.now() - Math.random() * 3600000 * 24 * 3),
          expiresAt: new Date(Date.now() + 86400000 * 7),
          userId: users[i % users.length].id,
          projectId: projects[i % projects.length].id,
        },
      })
    )
  )

  const platforms = ["Windows", "macOS", "Linux", "Android", "iOS", "Windows", "Linux", "macOS", "Android", "iOS"]
  const devices = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.device.create({
        data: {
          hwid: crypto.randomUUID(),
          name: `${platforms[i]} ${["Desktop", "Laptop", "Phone", "Tablet", "Server"][i % 5]}`,
          platform: platforms[i],
          osVersion: `${["10.0.19045", "14.5", "6.8.0", "14.0", "17.4"][i % 5]}`,
          isTrusted: i < 7,
          isBanned: i > 8,
          lastSeenAt: new Date(Date.now() - Math.random() * 3600000 * 48),
          userId: users[i % users.length].id,
          projectId: projects[i % projects.length].id,
          licenseId: i < licenses.length ? licenses[i].id : null,
        },
      })
    )
  )

  const auditActions = [
    "LOGIN", "LOGOUT", "LOGIN", "CREATE", "UPDATE", "DELETE", "LOGIN_FAILED", "LOGIN",
    "API_KEY_CREATED", "PASSWORD_RESET", "LOGIN", "LICENSE_CREATED", "SESSION_TERMINATED",
    "LOGIN", "LOGOUT", "ROLE_CHANGED", "LOGIN", "LOGIN_FAILED", "LOGIN", "SETTINGS_UPDATED",
    "LOGIN", "API_KEY_REVOKED", "LOGIN", "LOGOUT", "LICENSE_REVOKED", "LOGIN",
    "CONFIGURATION_UPDATED", "LOGIN", "THREAT_DETECTED", "LOGIN",
  ] as const

  const resources = ["user", "project", "license", "session", "api_key", "configuration", "device"]
  const auditDetails = [
    { browser: "Chrome 120", os: "Windows 10" },
    { reason: "User requested logout" },
    { field: "displayName", oldValue: "Alice", newValue: "Alice Johnson" },
    { projectName: "SinnerGuard" },
    { licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX" },
    { reason: "Admin action" },
    { attempt: 3, ip: randomIp() },
    { browser: "Safari", os: "macOS 14.5" },
    { keyName: "Production API Key" },
    { method: "email" },
    { browser: "Chrome 119", os: "Linux" },
    { licenseType: "premium" },
    { sessionDuration: "2h 15m" },
    { browser: "Firefox 121", os: "Windows 11" },
    {},
    { from: "USER", to: "ADMIN" },
    { browser: "Edge 120", os: "Windows 10" },
    {},
    { browser: "Chrome Mobile", os: "Android 14" },
    { theme: "dark", language: "en" },
    { browser: "Safari", os: "iOS 17.4" },
    { keyName: "Development Key" },
    { browser: "Chrome 120", os: "macOS" },
    {},
    { reason: "Subscription expired" },
    { browser: "Chrome 120", os: "Windows 11" },
    { key: "rate_limit", oldValue: 100, newValue: 200 },
    { browser: "Firefox", os: "Linux" },
    { type: "brute_force", source: randomIp(), severity: "high" },
    { browser: "Chrome 120", os: "Windows 10" },
  ]

  const auditLogs = await Promise.all(
    auditActions.map((action, i) =>
      prisma.auditLog.create({
        data: {
          action,
          resource: resources[i % resources.length],
          resourceId: i % 3 === 0 ? crypto.randomUUID().slice(0, 8) : null,
          details: auditDetails[i],
          ipAddress: randomIp(),
          userAgent: userAgents[i % userAgents.length],
          userId: users[i % users.length].id,
          createdAt: new Date(Date.now() - i * 3600000 * 2 - Math.random() * 3600000),
        },
      })
    )
  )

  const apiKeys = await Promise.all([
    prisma.apiKey.create({
      data: {
        name: "Production API Key",
        key: `sk_prod_${crypto.randomUUID().replace(/-/g, "")}`,
        prefix: "sk_prod",
        lastChars: crypto.randomUUID().slice(-4),
        permissions: ["READ_USERS", "READ_PROJECTS", "READ_LICENSES"],
        userId: existingAdmin.id,
        projectId: projects[0].id,
      },
    }),
    prisma.apiKey.create({
      data: {
        name: "Development API Key",
        key: `sk_dev_${crypto.randomUUID().replace(/-/g, "")}`,
        prefix: "sk_dev",
        lastChars: crypto.randomUUID().slice(-4),
        permissions: ["READ_USERS", "WRITE_USERS"],
        userId: users[0].id,
        projectId: projects[2].id,
        isActive: false,
      },
    }),
    prisma.apiKey.create({
      data: {
        name: "Staging API Key",
        key: `sk_stag_${crypto.randomUUID().replace(/-/g, "")}`,
        prefix: "sk_stag",
        lastChars: crypto.randomUUID().slice(-4),
        permissions: ["READ_LICENSES", "WRITE_LICENSES", "MANAGE_API_KEYS"],
        userId: existingAdmin.id,
        projectId: projects[1].id,
      },
    }),
  ])

  const configs = await Promise.all([
    prisma.configuration.create({
      data: {
        key: "rate_limit",
        value: { requests_per_minute: 60, burst: 100 },
        description: "API rate limiting configuration",
        environment: "production",
        userId: existingAdmin.id,
        projectId: projects[0].id,
      },
    }),
    prisma.configuration.create({
      data: {
        key: "session_timeout",
        value: { idle: 1800, absolute: 86400 },
        description: "Session timeout settings",
        environment: "production",
        userId: existingAdmin.id,
        projectId: projects[0].id,
      },
    }),
    prisma.configuration.create({
      data: {
        key: "encryption",
        value: { algorithm: "aes-256-gcm", key_rotation_days: 90 },
        description: "Encryption settings",
        environment: "production",
        userId: users[0].id,
        projectId: projects[2].id,
        isEncrypted: true,
      },
    }),
    prisma.configuration.create({
      data: {
        key: "email_templates",
        value: { welcome: "welcome-email-template", reset_password: "reset-password-template" },
        description: "Email template configuration",
        environment: "staging",
        userId: existingAdmin.id,
        projectId: projects[1].id,
      },
    }),
    prisma.configuration.create({
      data: {
        key: "feature_flags",
        value: { dark_mode: true, beta_api: false, analytics_v2: true },
        description: "Feature flags for gradual rollout",
        environment: "production",
        userId: existingAdmin.id,
        projectId: projects[1].id,
      },
    }),
  ])

  const webhooks = await Promise.all([
    prisma.webhook.create({
      data: {
        name: "License Events",
        url: "https://hooks.example.com/license-events",
        secret: crypto.randomUUID(),
        events: ["LICENSE_CREATED", "LICENSE_REVOKED", "LICENSE_SUSPENDED"],
        userId: existingAdmin.id,
        projectId: projects[0].id,
        lastTriggeredAt: new Date(Date.now() - 3600000 * 2),
      },
    }),
    prisma.webhook.create({
      data: {
        name: "User Events",
        url: "https://hooks.example.com/user-events",
        secret: crypto.randomUUID(),
        events: ["USER_REGISTERED", "USER_DELETED", "USER_SUSPENDED"],
        userId: users[0].id,
        projectId: projects[2].id,
        isActive: false,
      },
    }),
  ])

  return NextResponse.json({
    message: "Demo data created successfully",
    counts: {
      users: users.length,
      projects: projects.length,
      licenses: licenses.length,
      sessions: sessions.length,
      devices: devices.length,
      auditLogs: auditLogs.length,
      apiKeys: apiKeys.length,
      configurations: configs.length,
      webhooks: webhooks.length,
    },
  })
}
