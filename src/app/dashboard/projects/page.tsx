"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, FolderKanban, MoreHorizontal, ExternalLink, Trash2, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { timeAgo } from "@/lib/utils"

interface Project {
  id: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
  createdAt: string
  _count: {
    licenses: number
    sessions: number
    devices: number
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchProjects = () => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects")
        return res.json()
      })
      .then((json: Project[]) => {
        setProjects(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, slug: formSlug, description: formDescription }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create project")
      }
      setFormName("")
      setFormSlug("")
      setFormDescription("")
      setShowForm(false)
      fetchProjects()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create project"
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete project")
      fetchProjects()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete project"
      setError(msg)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted text-sm">Loading projects...</div>
      </div>
    )
  }

  if (error && projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-accent text-sm">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-muted mt-1">Manage your authentication projects</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-sm">Create New Project</CardTitle>
              <button className="p-1 text-muted hover:text-white transition-colors" onClick={() => setShowForm(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm text-muted block mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50"
                  placeholder="My Project"
                />
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50"
                  placeholder="my-project"
                />
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Description</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/50 resize-none"
                  rows={3}
                  placeholder="Optional description..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary text-black hover:bg-primary/90" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="text-sm text-accent bg-accent/10 border border-accent/20 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:border-primary/20 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FolderKanban className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted mt-0.5">{project.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-muted">{project._count.licenses} licenses</span>
                        <span className="text-xs text-muted">{project._count.sessions} sessions</span>
                        <span className="text-xs text-muted">{project._count.devices} devices</span>
                        <Badge variant={project.isActive ? "success" : "secondary"}>
                          {project.isActive ? "active" : "inactive"}
                        </Badge>
                        <span className="text-xs text-muted">{timeAgo(project.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-muted hover:text-accent transition-colors"
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
