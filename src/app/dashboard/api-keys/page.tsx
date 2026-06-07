"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, KeyRound, Plus, Copy, Eye, EyeOff, MoreHorizontal, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const apiKeys = [
  { id: "1", name: "Production API Key", prefix: "sa_prod", lastChars: "a1b2", permissions: ["read", "write"], status: "active", created: "Oct 15, 2025", lastUsed: "2 min ago" },
  { id: "2", name: "Development Key", prefix: "sa_dev", lastChars: "c3d4", permissions: ["read"], status: "active", created: "Nov 1, 2025", lastUsed: "1 hour ago" },
  { id: "3", name: "Staging Environment", prefix: "sa_stage", lastChars: "e5f6", permissions: ["read", "write", "admin"], status: "active", created: "Dec 1, 2025", lastUsed: "1 day ago" },
  { id: "4", name: "CI/CD Pipeline", prefix: "sa_ci", lastChars: "g7h8", permissions: ["read"], status: "revoked", created: "Sep 20, 2025", lastUsed: "2 months ago" },
]

export default function ApiKeysPage() {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})

  const copyKey = (prefix: string, lastChars: string) => {
    navigator.clipboard.writeText(`${prefix}_${'*'.repeat(32)}${lastChars}`)
    toast.success("API key copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-sm text-muted mt-1">Manage API access keys for your projects</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search API keys..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">Name</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">API Key</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Permissions</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Created</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Last Used</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key, i) => (
                  <motion.tr
                    key={key.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 text-sm text-white font-medium">{key.name}</td>
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
                      <div className="flex gap-1">
                        {key.permissions.map(p => (
                          <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={key.status === "active" ? "success" : "destructive"}>
                        {key.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">{key.created}</td>
                    <td className="p-4 text-sm text-muted">{key.lastUsed}</td>
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
