"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Key, Plus, MoreHorizontal, X, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
  project: { name: string }
  _count: { devices: number }
}

type Project = {
  id: string
  name: string
  slug: string
}

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [search, setSearch] = useState("")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const [form, setForm] = useState({
    projectId: "",
    type: "STANDARD",
    maxUsers: 1,
    maxDevices: 1,
    expiresInDays: 30,
  })
  const [submitting, setSubmitting] = useState(false)

  async function fetchLicenses() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/licenses")
      if (!res.ok) throw new Error("Failed to fetch licenses")
      const data = await res.json()
      setLicenses(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects")
      if (!res.ok) throw new Error("Failed to fetch projects")
      const data = await res.json()
      setProjects(data)
    } catch {
      // swallow
    }
  }

  useEffect(() => {
    fetchLicenses()
    fetchProjects()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to create license")
      setShowModal(false)
      setForm({ projectId: "", type: "STANDARD", maxUsers: 1, maxDevices: 1, expiresInDays: 30 })
      await fetchLicenses()
    } catch {
      // swallow
    } finally {
      setSubmitting(false)
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      const res = await fetch(`/api/licenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      setOpenMenuId(null)
      await fetchLicenses()
    } catch {
      // swallow
    }
  }

  async function handleRevoke(id: string) {
    try {
      const res = await fetch(`/api/licenses/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to revoke license")
      setOpenMenuId(null)
      await fetchLicenses()
    } catch {
      // swallow
    }
  }

  const filtered = licenses.filter((l) =>
    l.key.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Licenses</h1>
          <p className="text-sm text-muted mt-1">Manage authentication licenses</p>
        </div>
        <Button
          className="bg-primary text-black hover:bg-primary/90"
          onClick={() => {
            if (projects.length === 0) fetchProjects()
            setShowModal(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate License
        </Button>
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
              <Button variant="outline" size="sm" onClick={fetchLicenses}>
                Retry
              </Button>
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
                    <th className="text-left p-4 text-xs text-muted font-medium">Project</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Type</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Expires</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Devices</th>
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
                      <td className="p-4 text-sm text-muted">{license.project.name}</td>
                      <td className="p-4 text-sm text-muted">{license.type}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            license.status === "ACTIVE"
                              ? "success"
                              : license.status === "EXPIRED"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {license.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted">
                        {license.expiresAt ? formatDate(license.expiresAt) : "—"}
                      </td>
                      <td className="p-4 text-sm text-muted">{license._count.devices}</td>
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
                              className="absolute right-4 top-12 z-50 w-44 rounded-lg border border-border bg-card shadow-lg"
                            >
                              <div className="py-1">
                                {["ACTIVE", "EXPIRED", "SUSPENDED", "REVOKED"].map((s) => (
                                  <button
                                    key={s}
                                    disabled={s === license.status}
                                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                                      s === license.status
                                        ? "text-muted cursor-not-allowed"
                                        : "text-white hover:bg-white/10"
                                    }`}
                                    onClick={() => handleStatusChange(license.id, s)}
                                  >
                                    Set {s}
                                  </button>
                                ))}
                                <div className="border-t border-border my-1" />
                                <button
                                  className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-white/10 transition-colors"
                                  onClick={() => handleRevoke(license.id)}
                                >
                                  Revoke
                                </button>
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

      {/* Generate License Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Generate License</h2>
                <button
                  className="p-1 text-muted hover:text-white transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs text-muted mb-1.5">Project</label>
                  <select
                    required
                    value={form.projectId}
                    onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white outline-none focus:border-primary transition-colors"
                  >
                    <option value="" disabled>
                      Select a project
                    </option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white outline-none focus:border-primary transition-colors"
                  >
                    <option value="BASIC">Basic</option>
                    <option value="STANDARD">Standard</option>
                    <option value="PREMIUM">Premium</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Max Users</label>
                    <Input
                      type="number"
                      min={1}
                      value={form.maxUsers}
                      onChange={(e) => setForm({ ...form, maxUsers: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Max Devices</label>
                    <Input
                      type="number"
                      min={1}
                      value={form.maxDevices}
                      onChange={(e) => setForm({ ...form, maxDevices: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1.5">Expires In (days)</label>
                  <Input
                    type="number"
                    min={1}
                    value={form.expiresInDays}
                    onChange={(e) => setForm({ ...form, expiresInDays: Number(e.target.value) })}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-black hover:bg-primary/90"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Create License
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
