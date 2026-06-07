"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Shield, MoreHorizontal, Ban } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { timeAgo } from "@/lib/utils"

type User = {
  id: string
  email: string
  username: string
  displayName: string | null
  role: string
  isActive: boolean
  isVerified: boolean
  lastLoginAt: string | null
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users")
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      u.displayName?.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-muted mt-1">Manage your application users</p>
        </div>
        <div className="text-sm text-muted">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-muted mt-1">Manage your application users</p>
        </div>
        <div className="text-sm text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-sm text-muted mt-1">Manage your application users</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search users..."
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
                  <th className="text-left p-4 text-xs text-muted font-medium">User</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Email</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Role</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Last Login</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {(user.displayName || user.username).split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-sm text-white font-medium">{user.displayName || user.username}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted">{user.email}</td>
                    <td className="p-4">
                      <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="text-xs">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.isActive ? "success" : "warning"} className="text-xs">
                        {user.isActive ? "active" : "suspended"}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">
                      {user.lastLoginAt ? timeAgo(user.lastLoginAt) : "Never"}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1.5 text-muted hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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
