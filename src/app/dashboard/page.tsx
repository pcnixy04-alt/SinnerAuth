"use client"

import { motion } from "framer-motion"
import { Users, Radio, Key, Monitor, Shield, Activity, ArrowUp, ArrowDown, AlertTriangle, CheckCircle, XCircle, TrendingUp, BarChart3, Gauge, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Active Users", value: "12,847", change: "+12.5%", icon: Users, trend: "up", color: "from-primary to-cyan" },
  { label: "Live Sessions", value: "8,342", change: "+8.3%", icon: Radio, trend: "up", color: "from-secondary to-purple-500" },
  { label: "Licenses Active", value: "11,203", change: "+15.2%", icon: Key, trend: "up", color: "from-primary to-secondary" },
  { label: "Devices Online", value: "24,591", change: "+22.1%", icon: Monitor, trend: "up", color: "from-cyan to-primary" },
  { label: "Threats Blocked", value: "1,847", change: "-23.4%", icon: Shield, trend: "down", color: "from-accent to-red-500" },
  { label: "API Calls Today", value: "892K", change: "+18.7%", icon: Zap, trend: "up", color: "from-primary to-cyan" },
]

const recentActivity = [
  { action: "User authenticated successfully", user: "john.doe", time: "2 min ago", status: "success" },
  { action: "License activated for Acme Corp", user: "Acme Corp", time: "15 min ago", status: "success" },
  { action: "Suspicious login attempt blocked", user: "unknown", time: "1 hour ago", status: "warning" },
  { action: "New device registered by jane.smith", user: "jane.smith", time: "2 hours ago", status: "success" },
  { action: "Rate limit exceeded for API key", user: "api-key-3f8a", time: "3 hours ago", status: "error" },
  { action: "Session terminated by admin", user: "admin", time: "4 hours ago", status: "warning" },
]

const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 65, 50, 88, 72, 95, 68, 82, 78, 92, 85, 70, 88, 76, 94, 80, 65, 90, 85]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-xs font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-muted mt-1">Real-time monitoring of your authentication platform</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-sm text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          All Systems Operational
        </div>
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
              <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} p-2`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-bold ${stat.trend === "up" ? "text-success" : "text-accent"}`}>
                      {stat.change}
                      {stat.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <p className="text-xs text-muted mt-0.5 font-medium">{stat.label}</p>
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
              <TrendingUp className="w-4 h-4 text-primary" />
              API Requests — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {chartData.map((h, i) => (
                <div key={i} className="flex-1 relative group cursor-pointer">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t bg-gradient-to-t from-primary/60 to-primary/20 hover:from-primary/80 transition-all duration-200"
                    style={{ height: `${h}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    {h.toLocaleString()} requests
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-muted">
              <span>Oct 8</span>
              <span>Oct 23</span>
              <span>Nov 7</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                  {item.status === "success" && <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />}
                  {item.status === "warning" && <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />}
                  {item.status === "error" && <XCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.action}</p>
                    <p className="text-xs text-muted/70 mt-0.5">
                      {item.user} · {item.time}
                    </p>
                  </div>
                  <Badge variant={item.status === "success" ? "success" : item.status === "warning" ? "warning" : "destructive"} className="shrink-0">
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
            <CardTitle className="text-sm flex items-center gap-2">
              <Gauge className="w-4 h-4 text-primary" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-bold text-white">42</span>
              <span className="text-lg text-muted mb-1">ms</span>
            </div>
            <p className="text-xs text-success flex items-center gap-1 mb-4">
              <ArrowDown className="w-3 h-3" /> 8ms improvement from last week
            </p>
            <div className="h-16 flex items-end gap-1.5">
              {[60, 45, 80, 55, 40, 65, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/10 rounded-t relative">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all duration-300 hover:from-primary/80"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Uptime Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-bold text-success">99.99</span>
              <span className="text-lg text-muted mb-1">%</span>
            </div>
            <p className="text-xs text-muted mb-4">Last 30 days · All regions</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${Math.random() > 0.02 ? "bg-success/80" : "bg-accent/80"}`}
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "AES-256 Encryption", status: "Active", variant: "success" as const },
                { label: "Rate Limiting", status: "Active", variant: "success" as const },
                { label: "DDoS Protection", status: "Active", variant: "success" as const },
                { label: "Threat Monitoring", status: "Active", variant: "success" as const },
                { label: "Audit Logging", status: "Active", variant: "success" as const },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-success font-medium">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
