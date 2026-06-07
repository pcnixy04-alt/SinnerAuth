"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, FolderKanban, MoreHorizontal, ExternalLink, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  { id: "1", name: "Project Phoenix", slug: "project-phoenix", description: "Main game authentication system", licenses: 542, sessions: 1284, devices: 892, status: "active" },
  { id: "2", name: "Atlas Framework", slug: "atlas-framework", description: "Enterprise software suite", licenses: 231, sessions: 567, devices: 423, status: "active" },
  { id: "3", name: "Nexus API", slug: "nexus-api", description: "Public REST API service", licenses: 89, sessions: 2341, devices: 156, status: "active" },
  { id: "4", name: "Legacy System", slug: "legacy-system", description: "Legacy application migration", licenses: 12, sessions: 45, devices: 23, status: "inactive" },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-muted mt-1">Manage your authentication projects</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

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
                        <span className="text-xs text-muted">{project.licenses} licenses</span>
                        <span className="text-xs text-muted">{project.sessions} sessions</span>
                        <span className="text-xs text-muted">{project.devices} devices</span>
                        <Badge variant={project.status === "active" ? "success" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted hover:text-accent transition-colors">
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
