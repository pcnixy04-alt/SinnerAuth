"use client"

import { motion } from "framer-motion"
import { Users, Radio, Key, Monitor, Shield, Activity, ArrowUp, ArrowDown, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Total Users", value: "12,847", change: "+12.5%", icon: Users, trend: "up" },
  { label: "Active Sessions", value: "8,342", change: "+8.3%", icon: Radio, trend: "up" },
  { label: "Active Licenses", value: "11,203", change: "+15.2%", icon: Key, trend: "up" },
  { label: "Registered Devices", value: "24,591", change: "+22.1%", icon: Monitor, trend: "up" },
  { label: "Threats Blocked", value: "1,847", change: "-23.4%", icon: Shield, trend: "down" },
  { label: "API Calls Today", value: "892,451", change: "+18.7%", icon: Activity, trend: "up" },
]

const recentActivity = [
  { action: "User authenticated", user: "john.doe", time: "2 min ago", status: "success" },
  { action: "License activated", user: "Acme Corp", time: "15 min ago", status: "success" },
  { action: "Suspicious login detected", user: "unknown", time: "1 hour ago", status: "warning" },
  { action: "New device registered", user: "jane.smith", time: "2 hours ago", status: "success" },
  { action: "Rate limit exceeded", user: "api-key-3f8a", time: "3 hours ago", status: "error" },
  { action: "Session terminated", user: "admin", time: "4 hours ago", status: "warning" },
]

const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 65, 50, 88, 72, 95, 68, 82, 78, 92, 85, 70, 88, 76, 94, 80, 65, 90, 85]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-muted mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-muted" />
                    <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.trend === "up" ? "text-success" : "text-accent"}`}>
                      {stat.change}
                      {stat.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              API Requests (Last 30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {chartData.map((h, i) => (
                <div key={i} className="flex-1 relative group cursor-pointer">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t bg-gradient-to-t from-primary/50 to-primary/30 hover:from-primary/70 transition-all duration-200"
                    style={{ height: `${h}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h.toLocaleString()} requests
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted">
              <span>Oct 8</span>
              <span>Oct 23</span>
              <span>Nov 7</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  {item.status === "success" && <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />}
                  {item.status === "warning" && <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />}
                  {item.status === "error" && <XCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.action}</p>
                    <p className="text-xs text-muted">
                      {item.user} &middot; {item.time}
                    </p>
                  </div>
                  <Badge variant={item.status === "success" ? "success" : item.status === "warning" ? "warning" : "destructive"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">42ms</div>
            <p className="text-xs text-success mt-1">-8ms from last week</p>
            <div className="mt-4 h-16 flex items-end gap-1">
              {[60, 45, 80, 55, 40, 65, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t">
                  <div className="bg-primary rounded-t h-full" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">99.99%</div>
            <p className="text-xs text-muted mt-1">Last 30 days</p>
            <div className="mt-4 flex gap-1 flex-wrap">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${Math.random() > 0.02 ? "bg-success/80" : "bg-accent/80"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Encryption", status: "Active", variant: "success" as const },
                { label: "Rate Limiting", status: "Active", variant: "success" as const },
                { label: "DDoS Protection", status: "Active", variant: "success" as const },
                { label: "Threat Monitoring", status: "Active", variant: "success" as const },
                { label: "Audit Logging", status: "Active", variant: "success" as const },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted">{item.label}</span>
                  <Badge variant={item.variant}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
