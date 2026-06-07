"use client"

import { motion } from "framer-motion"
import { Search, Key, Plus, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const licenses = [
  { id: "1", key: "A1B2-C3D4-E5F6-G7H8", project: "Project Phoenix", type: "Premium", status: "active", expires: "Dec 31, 2026", devices: 3 },
  { id: "2", key: "I9J0-K1L2-M3N4-O5P6", project: "Atlas Framework", type: "Standard", status: "active", expires: "Mar 15, 2027", devices: 1 },
  { id: "3", key: "Q7R8-S9T0-U1V2-W3X4", project: "Nexus API", type: "Premium", status: "active", expires: "Jun 30, 2026", devices: 5 },
  { id: "4", key: "Y5Z6-A7B8-C9D0-E1F2", project: "Project Phoenix", type: "Basic", status: "expired", expires: "Jan 1, 2024", devices: 0 },
  { id: "5", key: "G3H4-I5J6-K7L8-M9N0", project: "Legacy System", type: "Standard", status: "suspended", expires: "Aug 20, 2026", devices: 2 },
]

export default function LicensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Licenses</h1>
          <p className="text-sm text-muted mt-1">Manage authentication licenses</p>
        </div>
        <Button className="bg-primary text-black hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Generate License
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search by license key..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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
                {licenses.map((license, i) => (
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
                    <td className="p-4 text-sm text-muted">{license.project}</td>
                    <td className="p-4 text-sm text-muted">{license.type}</td>
                    <td className="p-4">
                      <Badge variant={license.status === "active" ? "success" : license.status === "expired" ? "warning" : "destructive"}>
                        {license.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">{license.expires}</td>
                    <td className="p-4 text-sm text-muted">{license.devices}</td>
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
