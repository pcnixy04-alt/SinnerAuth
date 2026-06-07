"use client"

import { motion } from "framer-motion"
import { Users, Radio, Key, Monitor, FolderKanban, Activity, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { timeAgo } from "@/lib/utils"

interface UserSummary {
  id: string
  email: string
  username: string
  role: "USER" | "ADMIN" | "SUPER_ADMIN"
  isActive: boolean
  createdAt: string
}

interface SessionSummary {
  id: string
  isActive: boolean
  lastActivity: string
  user: { username: string }
  project: { name: string }
  ipAddress: string
  userAgent: string
}

interface DashboardData {
  stats: {
    totalUsers: number
    activeSessions: number
    totalLicenses: number
    totalDevices: number
    totalProjects: number
  }
  recentUsers: UserSummary[]
  recentSessions: SessionSummary[]
}

const statCards = [
  { label: "Total Users", key: "totalUsers" as const, icon: Users, gradient: "from-primary to-cyan-500" },
  { label: "Active Sessions", key: "activeSessions" as const, icon: Radio, gradient: "from-secondary to-purple-500" },
  { label: "Licenses", key: "totalLicenses" as const, icon: Key, gradient: "from-accent to-pink-500" },
  { label: "Devices", key: "totalDevices" as const, icon: Monitor, gradient: "from-success to-green-500" },
  { label: "Projects", key: "totalProjects" as const, icon: FolderKanban, gradient: "from-warning to-yellow-500" },
]

const roleVariant: Record<string, "default" | "secondary" | "destructive"> = {
  USER: "secondary",
  ADMIN: "default",
  SUPER_ADMIN: "destructive",
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load admin dashboard")
        return res.json()
      })
      .then((json: DashboardData) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <span className="text-sm text-muted">Loading admin panel...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-sm text-accent">Error: {error}</div>
      </div>
    )
  }

  const { stats, recentUsers, recentSessions } = data!

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-xs font-bold text-white">Admin Control Panel</h1>
        <p className="text-sm text-muted mt-1">Full platform management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          const value = stats[stat.key]
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} p-2`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <p className="text-xs text-muted mt-0.5 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Recent Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">User</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Email</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Role</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Status</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => {
                  const initials = user.username.slice(0, 2).toUpperCase()
                  return (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{initials}</span>
                          </div>
                          <span className="text-sm text-white">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-muted">{user.email}</td>
                      <td className="px-5 py-3">
                        <Badge variant={roleVariant[user.role] || "default"} className="text-xs">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={user.isActive ? "success" : "warning"} className="text-xs">
                          {user.isActive ? (
                            <><span className="w-1.5 h-1.5 rounded-full bg-success inline-block mr-1.5" />Active</>
                          ) : (
                            <><span className="w-1.5 h-1.5 rounded-full bg-warning inline-block mr-1.5" />Suspended</>
                          )}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-sm text-muted">{timeAgo(user.createdAt)}</td>
                    </tr>
                  )
                })}
                {recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-muted">No recent users</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">User</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">IP Address</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Device</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Project</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Status</th>
                  <th className="text-left text-xs text-muted font-medium px-5 py-3">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{session.user.username.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="text-sm text-white">{session.user.username}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-muted font-mono">{session.ipAddress}</td>
                    <td className="px-5 py-3 text-sm text-muted max-w-[180px] truncate" title={session.userAgent}>{session.userAgent}</td>
                    <td className="px-5 py-3 text-sm text-muted">{session.project.name}</td>
                    <td className="px-5 py-3">
                      <Badge variant={session.isActive ? "success" : "secondary"} className="text-xs">
                        {session.isActive ? (
                          <><span className="w-1.5 h-1.5 rounded-full bg-success inline-block mr-1.5" />Active</>
                        ) : (
                          <><span className="w-1.5 h-1.5 rounded-full bg-muted inline-block mr-1.5" />Inactive</>
                        )}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-sm text-muted">{timeAgo(session.lastActivity)}</td>
                  </tr>
                ))}
                {recentSessions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-sm text-muted">No recent sessions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
