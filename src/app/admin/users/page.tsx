"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Loader2, MoreHorizontal, Shield, UserX, UserCheck, Trash2, Crown, Zap, Handshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { timeAgo } from "@/lib/utils"

type UserCounts = {
  sessions: number
  devices: number
  licenses: number
}

type User = {
  id: string
  email: string
  username: string
  displayName: string | null
  role: "USER" | "ADMIN" | "SUPER_ADMIN"
  plan: string
  planExpiresAt: string | null
  isActive: boolean
  isVerified: boolean
  lastLoginAt: string | null
  createdAt: string
  _count: UserCounts
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [adding, setAdding] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    displayName: "",
    role: "USER" as "USER" | "ADMIN" | "SUPER_ADMIN",
  })

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        toast.error("Failed to fetch users")
      }
    } catch {
      toast.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.username) {
      toast.error("Email, password, and username are required")
      return
    }
    setAdding(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success("User created")
        setShowAddModal(false)
        setForm({ email: "", password: "", username: "", displayName: "", role: "USER" })
        fetchUsers()
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to create user")
      }
    } catch {
      toast.error("Failed to create user")
    } finally {
      setAdding(false)
    }
  }

  const patchUser = async (id: string, body: Record<string, unknown>, successMsg: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        toast.success(successMsg)
        setOpenDropdown(null)
        fetchUsers()
      } else {
        const err = await res.json()
        toast.error(err.error || "Action failed")
      }
    } catch {
      toast.error("Action failed")
    }
  }

  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("User deleted")
        setOpenDropdown(null)
        fetchUsers()
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to delete user")
      }
    } catch {
      toast.error("Failed to delete user")
    }
  }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      u.displayName?.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  const roleBadgeVariant = (role: string) => {
    if (role === "ADMIN") return "default"
    if (role === "SUPER_ADMIN") return "destructive"
    return "secondary"
  }

  const planBadgeVariant = (plan: string) => {
    if (plan === "PROFESSIONAL") return "warning"
    if (plan === "PARTNER") return "default"
    return "secondary"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-muted mt-1">Manage all platform users</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <Input
          placeholder="Search users by name or email..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">User</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Role</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Plan</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-center p-4 text-xs text-muted font-medium">Sessions</th>
                  <th className="text-center p-4 text-xs text-muted font-medium">Devices</th>
                  <th className="text-center p-4 text-xs text-muted font-medium">Licenses</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted" />
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted text-sm">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-white">
                              {(user.displayName || user.username).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-white font-medium truncate">
                              {user.displayName || user.username}
                            </p>
                            <p className="text-xs text-muted truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={roleBadgeVariant(user.role)} className="text-xs">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={planBadgeVariant(user.plan)} className="text-xs gap-1">
                          {user.plan === "PROFESSIONAL" ? <Crown className="w-3 h-3" /> :
                           user.plan === "PARTNER" ? <Handshake className="w-3 h-3" /> :
                           <Zap className="w-3 h-3" />}
                          {user.plan === "PROFESSIONAL" ? "Pro" :
                           user.plan === "PARTNER" ? "Partner" :
                           "Free"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.isActive ? "success" : "warning"} className="text-xs">
                          {user.isActive ? "active" : "suspended"}
                        </Badge>
                      </td>
                      <td className="p-4 text-center text-sm text-muted">{user._count.sessions}</td>
                      <td className="p-4 text-center text-sm text-muted">{user._count.devices}</td>
                      <td className="p-4 text-center text-sm text-muted">{user._count.licenses}</td>
                      <td className="p-4 text-right relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                          className="p-1.5 text-muted hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {openDropdown === user.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-4 top-12 z-50 w-52 bg-[#0a0a0a] border border-border rounded-lg shadow-xl py-1"
                          >
                            {user.role !== "ADMIN" && (
                              <button
                                onClick={() => patchUser(user.id, { role: "ADMIN" }, "User promoted to Admin")}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-white/5 transition-colors text-left"
                              >
                                <Shield className="w-4 h-4 text-primary" />
                                Promote to Admin
                              </button>
                            )}
                            {user.role !== "USER" && user.role !== "SUPER_ADMIN" && (
                              <button
                                onClick={() => patchUser(user.id, { role: "USER" }, "User demoted to User")}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-white/5 transition-colors text-left"
                              >
                                <UserCheck className="w-4 h-4 text-secondary" />
                                Demote to User
                              </button>
                            )}
                            <button
                              onClick={() =>
                                patchUser(
                                  user.id,
                                  { isActive: !user.isActive },
                                  user.isActive ? "User suspended" : "User activated"
                                )
                              }
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-white/5 transition-colors text-left"
                            >
                              <UserX className="w-4 h-4 text-warning" />
                              {user.isActive ? "Ban User" : "Unban User"}
                            </button>
                            <div className="border-t border-border my-1" />
                            <p className="px-3 py-1 text-xs text-muted font-medium">Set Plan</p>
                            {["PROFESSIONAL", "PARTNER", "FREE"].filter((p) => p !== user.plan).map((plan) => (
                              <button
                                key={plan}
                                onClick={() =>
                                  patchUser(
                                    user.id,
                                    {
                                      plan,
                                      planExpiresAt:
                                        plan === "PROFESSIONAL"
                                          ? new Date(Date.now() + 30 * 86400000).toISOString()
                                          : null,
                                      planReminded: false,
                                    },
                                    `Plan set to ${plan}`
                                  )
                                }
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-white/5 transition-colors text-left"
                              >
                                {plan === "PROFESSIONAL" ? <Crown className="w-4 h-4 text-warning" /> :
                                 plan === "PARTNER" ? <Handshake className="w-4 h-4 text-secondary" /> :
                                 <Zap className="w-4 h-4 text-muted" />}
                                {plan === "PROFESSIONAL" ? "Professional (30d)" :
                                 plan === "PARTNER" ? "Partner" : "Free"}
                              </button>
                            ))}
                            <div className="border-t border-border my-1" />
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-accent hover:bg-white/5 transition-colors text-left"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete User
                            </button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl w-full max-w-md p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Add New User</h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">Email *</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Password *</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Username *</label>
                <Input
                  placeholder="johndoe"
                  value={form.username}
                  onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Display Name</label>
                <Input
                  placeholder="John Doe"
                  value={form.displayName}
                  onChange={(e) => setForm((prev) => ({ ...prev, displayName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Role</label>
                <select
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as "USER" | "ADMIN" | "SUPER_ADMIN" }))}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-black hover:bg-primary/90"
                  disabled={adding}
                >
                  {adding ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Create User
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
