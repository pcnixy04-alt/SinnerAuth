"use client"

import { useEffect, useState } from "react"
import { timeAgo } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Radio, ShieldOff, Loader2 } from "lucide-react"

interface Session {
  id: string
  ipAddress: string
  userAgent: string
  location: string
  isActive: boolean
  lastActivity: string
  createdAt: string
  user: {
    username: string
    email: string
  }
  project: {
    name: string
  }
}

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [terminating, setTerminating] = useState<string | null>(null)

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/sessions")
      if (res.ok) {
        const data = await res.json()
        setSessions(data)
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const handleTerminate = async (id: string) => {
    if (!confirm("Are you sure you want to terminate this session?")) return
    setTerminating(id)
    try {
      await fetch(`/api/admin/sessions/${id}`, { method: "DELETE" })
      await fetchSessions()
    } catch {
      /* ignore */
    } finally {
      setTerminating(null)
    }
  }

  const activeCount = sessions.filter((s) => s.isActive).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Session Monitor</h1>
          <p className="text-sm text-muted mt-1">Track all active sessions across the platform</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-gradient-glass">
          <Radio className="w-4 h-4 text-success" />
          <span className="text-sm text-muted">Active:</span>
          <span className="text-sm font-bold text-success">{activeCount}</span>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2 text-base">
            <Radio className="w-4 h-4 text-primary" />
            All Sessions
            <span className="text-xs text-muted font-normal ml-auto">{sessions.length} total</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="ml-3 text-sm text-muted">Loading sessions...</span>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ShieldOff className="w-10 h-10 text-muted mb-3" />
              <p className="text-sm text-muted">No sessions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">User</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">IP Address</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">Device</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">Project</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">Last Activity</th>
                    <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-white font-medium">{session.user.username}</span>
                          <span className="text-xs text-muted">{session.user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm font-mono text-primary/80">{session.ipAddress}</code>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted" title={session.userAgent}>
                          {session.userAgent.length > 50
                            ? session.userAgent.slice(0, 50) + "..."
                            : session.userAgent}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white">{session.project.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={session.isActive ? "success" : "secondary"}>
                          {session.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted">{timeAgo(session.lastActivity)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={terminating === session.id}
                          onClick={() => handleTerminate(session.id)}
                        >
                          {terminating === session.id ? (
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                          ) : null}
                          Terminate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
