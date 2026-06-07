"use client"

import { motion } from "framer-motion"
import { Search, Mail, Shield, MoreHorizontal, Ban } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastLogin: "2 min ago" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", lastLogin: "15 min ago" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "active", lastLogin: "1 hour ago" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "User", status: "suspended", lastLogin: "1 day ago" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "active", lastLogin: "3 hours ago" },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-sm text-muted mt-1">Manage your application users</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search users..." className="pl-10" />
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
                {users.map((user, i) => (
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
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-sm text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted">{user.email}</td>
                    <td className="p-4">
                      <Badge variant={user.role === "Admin" ? "default" : "secondary"} className="text-xs">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.status === "active" ? "success" : "warning"} className="text-xs">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">{user.lastLogin}</td>
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
