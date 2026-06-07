"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Copy, X, Loader2, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { timeAgo } from "@/lib/utils"

type ApiKeyWithProject = {
  id: string
  name: string
  prefix: string
  lastChars: string
  permissions: string[]
  isActive: boolean
  expiresAt: string | null
  lastUsedAt: string | null
  createdAt: string
  project: { name: string } | null
}

type Project = {
  id: string
  name: string
}

const PERMISSIONS = ["read", "write", "admin"]

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeyWithProject[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showFullKeyModal, setShowFullKeyModal] = useState(false)
  const [fullKey, setFullKey] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    name: "",
    projectId: "",
    permissions: [] as string[],
    expiresInDays: "",
  })

  const fetchApiKeys = async () => {
    try {
      const res = await fetch("/api/api-keys")
      if (res.ok) {
        const data = await res.json()
        setApiKeys(data)
      }
    } catch {
      toast.error("Failed to fetch API keys")
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      if (res.ok) {
        const data = await res.json()
        setProjects(data.map((p: { id: string; name: string }) => ({ id: p.id, name: p.name })))
      }
    } catch {
      toast.error("Failed to fetch projects")
    }
  }

  useEffect(() => {
    fetchApiKeys()
    fetchProjects()
  }, [])

  const copyKey = (prefix: string, lastChars: string) => {
    navigator.clipboard.writeText(`${prefix}_...${lastChars}`)
    toast.success("API key copied to clipboard")
  }

  const togglePermission = (perm: string) => {
    setForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm],
    }))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.projectId) {
      toast.error("Name and project are required")
      return
    }
    setCreating(true)
    try {
      const res = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          projectId: form.projectId,
          permissions: form.permissions,
          expiresInDays: form.expiresInDays ? parseInt(form.expiresInDays) : undefined,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setFullKey(data.fullKey)
        setShowCreateModal(false)
        setShowFullKeyModal(true)
        setForm({ name: "", projectId: "", permissions: [], expiresInDays: "" })
        fetchApiKeys()
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to create API key")
      }
    } catch {
      toast.error("Failed to create API key")
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) return
    try {
      const res = await fetch(`/api/api-keys/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("API key revoked")
        fetchApiKeys()
      } else {
        toast.error("Failed to revoke API key")
      }
    } catch {
      toast.error("Failed to revoke API key")
    }
  }

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.prefix.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-sm text-muted mt-1">Manage API access keys for your projects</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search API keys..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">Name</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Project</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">API Key</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Permissions</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Created</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Last Used</th>
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
                ) : filteredKeys.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted text-sm">
                      No API keys found
                    </td>
                  </tr>
                ) : (
                  filteredKeys.map((key, i) => (
                    <motion.tr
                      key={key.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-sm text-white font-medium">{key.name}</td>
                      <td className="p-4 text-sm text-muted">{key.project?.name ?? "-"}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-primary">
                            {key.prefix}_...{key.lastChars}
                          </span>
                          <button onClick={() => copyKey(key.prefix, key.lastChars)} className="text-muted hover:text-white">
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {key.permissions.map(p => (
                            <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={key.isActive ? "success" : "destructive"}>
                          {key.isActive ? "active" : "revoked"}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted">{timeAgo(key.createdAt)}</td>
                      <td className="p-4 text-sm text-muted">
                        {key.lastUsedAt ? timeAgo(key.lastUsedAt) : "-"}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(key.id)}
                          className="p-1.5 text-muted hover:text-red-400 transition-colors"
                          title="Revoke key"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg w-full max-w-md p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Create API Key</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">Name *</label>
                <Input
                  placeholder="e.g. Production Key"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Project *</label>
                <select
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={form.projectId}
                  onChange={e => setForm(prev => ({ ...prev, projectId: e.target.value }))}
                  required
                >
                  <option value="" disabled>Select a project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">Permissions</label>
                <div className="flex gap-3">
                  {PERMISSIONS.map(perm => (
                    <label key={perm} className="flex items-center gap-2 text-sm text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="rounded"
                      />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Expires In (days)</label>
                <Input
                  type="number"
                  min="1"
                  placeholder="Leave empty for no expiration"
                  value={form.expiresInDays}
                  onChange={e => setForm(prev => ({ ...prev, expiresInDays: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-primary text-black hover:bg-primary/90" disabled={creating}>
                  {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  Create
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showFullKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg w-full max-w-lg p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">API Key Created</h2>
              <button onClick={() => setShowFullKeyModal(false)} className="text-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted mb-4">
              Copy this key now. You won&apos;t be able to see it again.
            </p>
            <div className="flex items-center gap-2 bg-background rounded-md p-3 border border-border mb-4">
              <code className="flex-1 text-sm font-mono text-primary break-all">{fullKey}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fullKey)
                  toast.success("Full API key copied to clipboard")
                }}
                className="p-1.5 text-muted hover:text-white shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <Button
              className="w-full bg-primary text-black hover:bg-primary/90"
              onClick={() => setShowFullKeyModal(false)}
            >
              Done
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
