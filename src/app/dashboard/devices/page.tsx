"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Monitor, Smartphone, Laptop, MoreHorizontal, Ban, Undo2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { timeAgo } from "@/lib/utils"

interface Device {
  id: string
  hwid: string
  name: string
  platform: string
  osVersion: string
  fingerprint: Record<string, unknown>
  isTrusted: boolean
  isBanned: boolean
  lastSeenAt: string
  createdAt: string
  project: { name: string } | null
  license: { key: string } | null
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  async function loadDevices() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/devices")
      if (!res.ok) throw new Error(`Failed to load devices (${res.status})`)
      const data = await res.json()
      setDevices(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDevices()
  }, [])

  async function toggleBan(device: Device) {
    try {
      const res = await fetch(`/api/devices/${device.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBanned: !device.isBanned }),
      })
      if (!res.ok) throw new Error("Failed to update device")
      await loadDevices()
    } catch (e) {
      console.error(e)
    }
  }

  const platformIcon = (platform: string) => {
    if (/windows/i.test(platform)) return <Monitor className="w-4 h-4 text-primary" />
    if (/macOS|mac\s?os/i.test(platform)) return <Laptop className="w-4 h-4 text-secondary" />
    return <Smartphone className="w-4 h-4 text-accent" />
  }

  const statusBadge = (device: Device) => {
    if (device.isBanned) return <Badge variant="destructive">banned</Badge>
    if (device.isTrusted) return <Badge variant="success">trusted</Badge>
    return <Badge variant="warning">pending</Badge>
  }

  const filtered = devices.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.hwid?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Devices</h1>
        <p className="text-sm text-muted mt-1">Manage registered devices and HWID information</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search by HWID or device name..."
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
              <div className="text-sm text-muted">Loading devices...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-sm text-destructive">{error}</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs text-muted font-medium">Device</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">HWID</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Platform</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Project</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                    <th className="text-left p-4 text-xs text-muted font-medium">Last Seen</th>
                    <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((device, i) => (
                    <motion.tr
                      key={device.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {platformIcon(device.platform)}
                          <span className="text-sm text-white font-medium">{device.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-mono text-muted">{device.hwid}</td>
                      <td className="p-4 text-sm text-muted">
                        {device.platform} {device.osVersion}
                      </td>
                      <td className="p-4 text-sm text-muted">{device.project?.name ?? "—"}</td>
                      <td className="p-4">{statusBadge(device)}</td>
                      <td className="p-4 text-sm text-muted">{timeAgo(device.lastSeenAt)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 text-muted hover:text-accent transition-colors"
                            onClick={() => toggleBan(device)}
                            title={device.isBanned ? "Unban" : "Ban"}
                          >
                            {device.isBanned ? <Undo2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                          </button>
                          <button className="p-1.5 text-muted hover:text-white transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-sm text-muted">
                        No devices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
