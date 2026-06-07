"use client"

import { motion } from "framer-motion"
import { Search, Monitor, Smartphone, Laptop, MoreHorizontal, Ban } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const devices = [
  { id: "1", name: "John's PC", hwid: "7A3F-B9C2-D4E5-F6G7", platform: "Windows 11", user: "John Doe", status: "trusted", lastSeen: "Now" },
  { id: "2", name: "Jane's MacBook", hwid: "H8I9-J0K1-L2M3-N4O5", platform: "macOS 14", user: "Jane Smith", status: "trusted", lastSeen: "5 min ago" },
  { id: "3", name: "Development Server", hwid: "P6Q7-R8S9-T0U1-V2W3", platform: "Ubuntu 22.04", user: "Bob Johnson", status: "trusted", lastSeen: "1 hour ago" },
  { id: "4", name: "Unknown Device", hwid: "X4Y5-Z6A7-B8C9-D0E1", platform: "Android 14", user: "Alice Brown", status: "pending", lastSeen: "3 hours ago" },
  { id: "5", name: "Suspicious Device", hwid: "F2G3-H4I5-J6K7-L8M9", platform: "Windows 10", user: "Unknown", status: "banned", lastSeen: "1 day ago" },
]

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Devices</h1>
        <p className="text-sm text-muted mt-1">Manage registered devices and HWID information</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search by HWID or device name..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted font-medium">Device</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">HWID</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Platform</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">User</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted font-medium">Last Seen</th>
                  <th className="text-right p-4 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, i) => (
                  <motion.tr
                    key={device.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {device.platform.includes("Windows") ? <Monitor className="w-4 h-4 text-primary" /> :
                         device.platform.includes("macOS") ? <Laptop className="w-4 h-4 text-secondary" /> :
                         <Smartphone className="w-4 h-4 text-accent" />}
                        <span className="text-sm text-white font-medium">{device.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-mono text-muted">{device.hwid}</td>
                    <td className="p-4 text-sm text-muted">{device.platform}</td>
                    <td className="p-4 text-sm text-muted">{device.user}</td>
                    <td className="p-4">
                      <Badge variant={device.status === "trusted" ? "success" : device.status === "pending" ? "warning" : "destructive"}>
                        {device.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted">{device.lastSeen}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted hover:text-accent transition-colors">
                          <Ban className="w-4 h-4" />
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
