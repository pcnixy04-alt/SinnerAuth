"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Settings, Plus, MoreHorizontal, Edit, X, Check, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { timeAgo } from "@/lib/utils"

interface Project {
  id: string
  name: string
}

interface Configuration {
  id: string
  key: string
  value: any
  description?: string
  isEncrypted: boolean
  environment: string
  project: Project
  updatedAt: string
  createdAt: string
}

export default function ConfigurationsPage() {
  const [configs, setConfigs] = useState<Configuration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [saving, setSaving] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [adding, setAdding] = useState(false)

  const fetchConfigs = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/configurations")
      if (!res.ok) throw new Error(`Failed to fetch configs (${res.status})`)
      const data = await res.json()
      setConfigs(Array.isArray(data) ? data : data.configs ?? data.data ?? [])
    } catch (err: any) {
      setError(err.message ?? "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfigs()
  }, [])

  const handleEdit = (config: Configuration) => {
    setEditingId(config.id)
    setEditValue(typeof config.value === "string" ? config.value : JSON.stringify(config.value))
  }

  const handleSaveEdit = async (id: string) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/configurations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: editValue }),
      })
      if (!res.ok) throw new Error("Failed to update")
      const updated = await res.json()
      setConfigs((prev) =>
        prev.map((c) => (c.id === id ? { ...c, value: updated.value ?? editValue } : c))
      )
      setEditingId(null)
      setEditValue("")
    } catch (err: any) {
      setError(err.message ?? "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  const displayValue = (config: Configuration): string => {
    if (config.isEncrypted) return "••••••••"
    if (typeof config.value === "string") return config.value
    return JSON.stringify(config.value)
  }

  const filtered = configs.filter((c) =>
    c.key.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurations</h1>
          <p className="text-sm text-muted mt-1">Manage remote configurations for your projects</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Configuration
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search configurations..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
          <button className="ml-2 underline hover:text-red-300" onClick={fetchConfigs}>Retry</button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">Key</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Value</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Environment</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Encrypted</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Updated</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-muted">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                      Loading configurations...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-muted">
                      No configurations found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((config, i) => (
                    <motion.tr
                      key={config.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <span className="text-sm font-mono text-primary">{config.key}</span>
                      </td>
                      <td className="p-4">
                        {editingId === config.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 bg-white/5 border border-border rounded px-2 py-1 text-sm font-mono text-white outline-none focus:border-primary/50"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveEdit(config.id)}
                              disabled={saving}
                              className="p-1 text-green-400 hover:text-green-300 disabled:opacity-50"
                            >
                              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1 text-muted hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-mono text-muted break-all">
                            {displayValue(config)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge variant={config.environment === "production" ? "default" : "secondary"}>
                          {config.environment}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={config.isEncrypted ? "warning" : "success"}>
                          {config.isEncrypted ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted">{timeAgo(config.updatedAt)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {editingId !== config.id && (
                            <button
                              className="p-1.5 text-muted hover:text-white transition-colors"
                              onClick={() => handleEdit(config)}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
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

      {showAddModal && (
        <AddConfigurationModal
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false)
            fetchConfigs()
          }}
          setError={setError}
          adding={adding}
          setAdding={setAdding}
        />
      )}
    </div>
  )
}

function AddConfigurationModal({
  onClose,
  onCreated,
  setError,
  adding,
  setAdding,
}: {
  onClose: () => void
  onCreated: () => void
  setError: (err: string | null) => void
  adding: boolean
  setAdding: (a: boolean) => void
}) {
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const [environment, setEnvironment] = useState("development")
  const [projectId, setProjectId] = useState("")
  const [isEncrypted, setIsEncrypted] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : data.projects ?? data.data ?? []))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key || !projectId) return
    setAdding(true)
    try {
      const res = await fetch("/api/configurations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value, environment, projectId, isEncrypted }),
      })
      if (!res.ok) throw new Error(`Failed to create (${res.status})`)
      onCreated()
    } catch (err: any) {
      setError(err.message ?? "Failed to create configuration")
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Add Configuration</h2>
          <button onClick={onClose} className="text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted">Key</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-white/5 border border-border rounded px-3 py-2 text-sm text-white outline-none focus:border-primary/50"
              placeholder="max_sessions_per_user"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted">Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-white/5 border border-border rounded px-3 py-2 text-sm text-white outline-none focus:border-primary/50"
              placeholder="10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted">Project</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full bg-white/5 border border-border rounded px-3 py-2 text-sm text-white outline-none focus:border-primary/50"
              required
            >
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted">Environment</label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full bg-white/5 border border-border rounded px-3 py-2 text-sm text-white outline-none focus:border-primary/50"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isEncrypted"
              checked={isEncrypted}
              onChange={(e) => setIsEncrypted(e.target.checked)}
              className="accent-primary"
            />
            <label htmlFor="isEncrypted" className="text-sm text-muted">
              Encrypted
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-black hover:bg-primary/90" disabled={adding}>
              {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Create
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
