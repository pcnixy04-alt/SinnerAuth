"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { timeAgo, truncate } from "@/lib/utils"

interface AuditUser {
  username: string
  email: string
}

interface AuditLog {
  id: string
  action: string
  resource: string
  resourceId: string | null
  details: unknown
  ipAddress: string
  userAgent: string
  createdAt: string
  user: AuditUser | null
}

const actionBadgeVariant: Record<string, "success" | "warning" | "destructive" | "info" | "default"> = {
  LOGIN: "success",
  LOGOUT: "warning",
  REGISTER: "success",
  LOGIN_FAILED: "destructive",
  API_KEY_CREATED: "info",
  API_KEY_DELETED: "destructive",
  PASSWORD_RESET: "warning",
  PASSWORD_CHANGED: "info",
  PROFILE_UPDATED: "info",
  SESSION_TERMINATED: "destructive",
  ADMIN_ACTION: "default",
}

function formatAction(action: string): string {
  const labels: Record<string, string> = {
    LOGIN: "User Login",
    LOGOUT: "User Logout",
    REGISTER: "Registration",
    LOGIN_FAILED: "Failed Login",
    API_KEY_CREATED: "API Key Created",
    API_KEY_DELETED: "API Key Deleted",
    PASSWORD_RESET: "Password Reset",
    PASSWORD_CHANGED: "Password Changed",
    PROFILE_UPDATED: "Profile Updated",
    SESSION_TERMINATED: "Session Terminated",
    ADMIN_ACTION: "Admin Action",
  }
  return labels[action] ?? action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatDetails(details: unknown): string {
  if (!details) return "-"
  if (typeof details === "object") {
    return truncate(JSON.stringify(details), 50)
  }
  return truncate(String(details), 50)
}

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/audit")
      if (!res.ok) throw new Error("Failed to fetch audit logs")
      const data = await res.json()
      setLogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter((log) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      log.action.toLowerCase().includes(q) ||
      log.resource.toLowerCase().includes(q) ||
      log.ipAddress.toLowerCase().includes(q) ||
      (log.user?.username.toLowerCase().includes(q) ?? false) ||
      (log.user?.email.toLowerCase().includes(q) ?? false)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Log</h1>
          <p className="text-sm text-muted mt-1">Complete platform activity history</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Shield className="w-4 h-4 text-accent" />
          <span>{logs.length} total events</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search audit logs..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">Action</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">User</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Resource</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Details</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">IP Address</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-muted">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-destructive">
                      {error}
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-muted">
                      {search ? "No audit logs match your search." : "No audit logs found."}
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, i) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <Badge variant={actionBadgeVariant[log.action] ?? "default"}>
                          {formatAction(log.action)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {log.user ? (
                          <div>
                            <div className="text-sm text-white">{log.user.username}</div>
                            <div className="text-xs text-muted">{log.user.email}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted">System</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted">
                        {log.resource}
                        {log.resourceId && (
                          <span className="text-xs text-muted ml-1 font-mono">#{log.resourceId}</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted font-mono max-w-[200px] truncate">
                        {formatDetails(log.details)}
                      </td>
                      <td className="p-4 text-sm text-muted font-mono">{log.ipAddress}</td>
                      <td className="p-4 text-sm text-muted whitespace-nowrap">
                        {timeAgo(log.createdAt)}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
