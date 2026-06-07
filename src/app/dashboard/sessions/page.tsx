"use client"

import { motion } from "framer-motion"
import { Search, Radio, XCircle, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const sessions = [
  { id: "1", user: "John Doe", ip: "192.168.1.1", device: "Windows 11 / Chrome", location: "New York, US", status: "active", lastActivity: "Now" },
  { id: "2", user: "Jane Smith", ip: "10.0.0.1", device: "macOS / Safari", location: "London, UK", status: "active", lastActivity: "5 min ago" },
  { id: "3", user: "Bob Johnson", ip: "172.16.0.1", device: "Linux / Firefox", location: "Berlin, DE", status: "active", lastActivity: "15 min ago" },
  { id: "4", user: "Alice Brown", ip: "192.168.1.2", device: "Android / Chrome", location: "Tokyo, JP", status: "idle", lastActivity: "1 hour ago" },
  { id: "5", user: "Charlie Wilson", ip: "45.33.32.156", device: "Windows 10 / Edge", location: "Moscow, RU", status: "suspicious", lastActivity: "3 min ago" },
]

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sessions</h1>
          <p className="text-sm text-muted mt-1">Monitor and manage active sessions</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Radio className="w-4 h-4 text-success" />
          <span>{sessions.filter(s => s.status === "active").length} active sessions</span>
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
                  <th className="text-left p-4 text-xs text-muted font-medium">User</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">IP Address</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Device</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Location</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Last Activity</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, i) => (
                  <motion.tr
                    key={session.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 text-sm text-white font-medium">{session.user}</td>
                    <td className="p-4 text-sm text-muted font-mono">{session.ip}</td>
                    <td className="p-4 text-sm text-muted">{session.device}</td>
                    <td className="p-4 text-sm text-muted">{session.location}</td>
                    <td className="p-4">
                      <Badge variant={session.status === "active" ? "success" : session.status === "idle" ? "warning" : "destructive"}>
                        {session.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">{session.lastActivity}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted hover:text-accent transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-muted hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
