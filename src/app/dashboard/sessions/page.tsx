"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Radio, XCircle, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { timeAgo } from "@/lib/utils"

interface Session {
  id: string
  token: string
  ipAddress: string
  userAgent: string
  location: string | null
  isActive: boolean
  lastActivity: string
  expiresAt: string
  createdAt: string
  project: { name: string } | null
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/sessions")
      if (!res.ok) throw new Error("Failed to fetch sessions")
      const data = await res.json()
      setSessions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const handleTerminate = async (id: string) => {
    if (!confirm("Are you sure you want to terminate this session?")) return
    try {
      const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to terminate session")
      fetchSessions()
    } catch (err) {
      console.error(err)
    }
  }

  const activeCount = sessions.filter((s) => s.isActive).length

  const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max) + "..." : str

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sessions</h1>
          <p className="text-sm text-muted mt-1">Monitor and manage active sessions</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Radio className="w-4 h-4 text-success" />
          <span>{activeCount} active sessions</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search sessions..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">User / Project</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">IP Address</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Device</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Location</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Last Activity</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-sm text-muted">
                      Loading sessions...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-sm text-destructive">
                      {error}
                    </td>
                  </tr>
                ) : sessions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-sm text-muted">
                      No sessions found.
                    </td>
                  </tr>
                ) : (
                  sessions.map((session, i) => (
                    <motion.tr
                      key={session.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-sm text-white font-medium">
                        {session.project?.name ?? "Unknown"}
                      </td>
                      <td className="p-4 text-sm text-muted font-mono">{session.ipAddress}</td>
                      <td className="p-4 text-sm text-muted">{truncate(session.userAgent, 40)}</td>
                      <td className="p-4 text-sm text-muted">{session.location ?? "Unknown"}</td>
                      <td className="p-4">
                        <Badge variant={session.isActive ? "success" : "warning"}>
                          {session.isActive ? "active" : "inactive"}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted">{timeAgo(session.lastActivity)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 text-muted hover:text-accent transition-colors"
                            onClick={() => handleTerminate(session.id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-muted hover:text-white transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
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
