export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
}

export type SidebarNavItem = NavItem & {
  items?: SidebarNavItem[]
}

export type DashboardConfig = {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export type User = {
  id: string
  email: string
  username: string
  displayName: string | null
  avatarUrl: string | null
  role: "USER" | "ADMIN" | "SUPER_ADMIN"
  isVerified: boolean
  isActive: boolean
  createdAt: string
}

export type Project = {
  id: string
  name: string
  description: string | null
  slug: string
  isActive: boolean
  createdAt: string
  _count?: {
    licenses: number
    sessions: number
    devices: number
  }
}

export type License = {
  id: string
  key: string
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED" | "REVOKED"
  type: string
  maxUsers: number
  maxDevices: number
  expiresAt: string | null
  createdAt: string
  project: { name: string }
}

export type Session = {
  id: string
  token: string
  ipAddress: string | null
  userAgent: string | null
  location: string | null
  isActive: boolean
  lastActivity: string
  expiresAt: string
  createdAt: string
}

export type Device = {
  id: string
  hwid: string
  name: string | null
  platform: string | null
  osVersion: string | null
  isTrusted: boolean
  isBanned: boolean
  lastSeenAt: string
  createdAt: string
}

export type AuditLog = {
  id: string
  action: string
  resource: string | null
  resourceId: string | null
  details: any
  ipAddress: string | null
  createdAt: string
}

export type ApiKey = {
  id: string
  name: string
  prefix: string
  lastChars: string
  isActive: boolean
  expiresAt: string | null
  lastUsedAt: string | null
  createdAt: string
}

export type Webhook = {
  id: string
  name: string
  url: string
  events: string[]
  isActive: boolean
  createdAt: string
}

export type Configuration = {
  id: string
  key: string
  value: any
  description: string | null
  isEncrypted: boolean
  environment: string
  updatedAt: string
}

export type DashboardStats = {
  totalUsers: number
  activeSessions: number
  totalLicenses: number
  activeLicenses: number
  totalDevices: number
  trustedDevices: number
  totalProjects: number
  totalApiKeys: number
  recentAuditLogs: AuditLog[]
  threatCount: number
  apiUsageToday: number
  responseTime: number
}
