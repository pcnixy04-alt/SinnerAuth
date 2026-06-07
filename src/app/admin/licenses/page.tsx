"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Key, MoreHorizontal, Loader2, AlertCircle, Shield, User, Radio } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatDate, timeAgo } from "@/lib/utils"

type License = {
  id: string
  key: string
  status: string
  type: string
  maxUsers: number
  maxDevices: number
  expiresAt: string | null
  createdAt: string
  user: { username: string; email: string }
  project: { name: string }
  _count: { devices: number }
}

export default function AdminLicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchLicenses() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/licenses")
      if (!res.ok) throw new Error("Failed to fetch licenses")
      const data = await res.json()
      setLicenses(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLicenses()
  }, [])

  async function handlePatchStatus(id: string, status: string) {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/licenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update license")
      setOpenMenuId(null)
      await fetchLicenses()
    } catch {
      // swallow
    } finally {
      setActionLoading(null)
    }
  }

  const statusActions = [
    { label: "Activate", status: "ACTIVE" },
    { label: "Suspend", status: "SUSPENDED" },
    { label: "Revoke", status: "REVOKED" },
  ]

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE": return "success"
      case "SUSPENDED": return "warning"
      case "REVOKED":
      case "EXPIRED": return "destructive"
      default: return "default"
    }
  }

  const filtered = licenses.filter((l) =>
    l.key.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">License Management</h1>
        <p className="text-sm text-muted mt-1">Manage all platform licenses</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search by license key..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-muted animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
              <p className="text-sm text-red-400 mb-2">{error}</p>
              <button
                onClick={fetchLicenses}
                className="text-xs text-muted hover:text-white underline underline-offset-4 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Key className="w-8 h-8 text-muted mb-3" />
              <p className="text-sm text-muted">No licenses found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs text-muted font-medium">License Key</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">User</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Project</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Type</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Devices</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Expires</th>
                    <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((license, i) => (
                    <motion.tr
                      key={license.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <span className="text-sm font-mono text-primary font-medium">{license.key}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-muted" />
                          </div>
                          <div>
                            <p className="text-sm text-white leading-tight">{license.user.username}</p>
                            <p className="text-xs text-muted leading-tight">{license.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted">{license.project.name}</td>
                      <td className="p-4 text-sm text-muted">{license.type}</td>
                      <td className="p-4">
                        <Badge variant={statusBadgeVariant(license.status)}>
                          {license.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted">{license._count.devices}</td>
                      <td className="p-4 text-sm text-muted whitespace-nowrap">
                        {license.expiresAt ? (
                          <span title={formatDate(license.expiresAt)}>
                            {timeAgo(license.expiresAt)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-4 text-right relative">
                        <button
                          className="p-1.5 text-muted hover:text-white transition-colors"
                          onClick={() => setOpenMenuId(openMenuId === license.id ? null : license.id)}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                          {openMenuId === license.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-4 top-12 z-50 w-36 rounded-lg border border-border bg-card shadow-lg"
                            >
                              <div className="py-1">
                                {statusActions.map((action) => (
                                  <button
                                    key={action.status}
                                    disabled={action.status === license.status || actionLoading === license.id}
                                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                                      action.status === license.status
                                        ? "text-muted cursor-not-allowed"
                                        : "text-white hover:bg-white/10"
                                    }`}
                                    onClick={() => handlePatchStatus(license.id, action.status)}
                                  >
                                    {actionLoading === license.id ? (
                                      <span className="flex items-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        {action.label}
                                      </span>
                                    ) : (
                                      action.label
                                    )}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
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
