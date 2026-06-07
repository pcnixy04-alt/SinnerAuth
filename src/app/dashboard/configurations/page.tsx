"use client"

import { motion } from "framer-motion"
import { Search, Settings, Plus, MoreHorizontal, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const configs = [
  { id: "1", key: "max_sessions_per_user", value: "10", env: "production", encrypted: false, updated: "2 hours ago" },
  { id: "2", key: "session_timeout_minutes", value: "60", env: "production", encrypted: false, updated: "1 day ago" },
  { id: "3", key: "jwt_secret", value: "••••••••••••••••", env: "production", encrypted: true, updated: "1 week ago" },
  { id: "4", key: "rate_limit_per_minute", value: "1000", env: "staging", encrypted: false, updated: "3 days ago" },
  { id: "5", key: "hwid_verification_strict", value: "true", env: "production", encrypted: false, updated: "5 hours ago" },
]

export default function ConfigurationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurations</h1>
          <p className="text-sm text-muted mt-1">Manage remote configurations for your projects</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Configuration
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search configurations..." className="pl-10" />
        </div>
      </div>

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
                {configs.map((config, i) => (
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
                    <td className="p-4 text-sm font-mono text-muted">{config.value}</td>
                    <td className="p-4">
                      <Badge variant={config.env === "production" ? "default" : "secondary"}>
                        {config.env}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={config.encrypted ? "warning" : "success"}>
                        {config.encrypted ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">{config.updated}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
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
