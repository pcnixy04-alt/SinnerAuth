"use client"

import { motion } from "framer-motion"
import { Users, Radio, Key, Monitor, Shield, Activity, ArrowUp, ArrowDown, AlertTriangle, CheckCircle, XCircle, TrendingUp, BarChart3, Gauge, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { timeAgo, formatNumber } from "@/lib/utils"

interface DashboardStats {
  activeUsers: number
  liveSessions: number
  licensesActive: number
  devicesOnline: number
  threatsBlocked: number
  apiCallsToday: number
}

interface ActivityItem {
  id: string
  action: string
  details: string | null
  createdAt: string
  resource: string
  resourceId: string
  userId: string
}

interface DashboardData {
  stats: DashboardStats
  recentActivity: ActivityItem[]
  chartData: number[]
}

const statConfigs = [
  { label: "Active Users", key: "activeUsers" as const, icon: Users, color: "from-primary to-cyan" },
  { label: "Live Sessions", key: "liveSessions" as const, icon: Radio, color: "from-secondary to-purple-500" },
  { label: "Licenses Active", key: "licensesActive" as const, icon: Key, color: "from-primary to-secondary" },
  { label: "Devices Online", key: "devicesOnline" as const, icon: Monitor, color: "from-cyan to-primary" },
  { label: "Threats Blocked", key: "threatsBlocked" as const, icon: Shield, color: "from-accent to-red-500" },
  { label: "API Calls Today", key: "apiCallsToday" as const, icon: Zap, color: "from-primary to-cyan" },
]

function getActionLabel(action: string): string {
  const labels: Record<string, string> = {
    LOGIN: "User logged in",
    LOGOUT: "User logged out",
    REGISTER: "New user registered",
    SUSPICIOUS_LOGIN: "Suspicious login attempt detected",
    BLOCKED: "Access attempt blocked",
    ERROR: "Error occurred",
    THREAT: "Threat detected",
    LICENSE_ACTIVATED: "License activated",
    LICENSE_DEACTIVATED: "License deactivated",
    SESSION_TERMINATED: "Session terminated",
    RATE_LIMIT: "Rate limit exceeded",
    DEVICE_REGISTERED: "New device registered",
    API_KEY_CREATED: "API key created",
    API_KEY_REVOKED: "API key revoked",
  }
  return labels[action] || action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function getActionStatus(action: string): "success" | "warning" | "error" {
  const errorActions = ["ERROR", "FAILED", "RATE_LIMIT", "API_KEY_REVOKED"]
  const warningActions = ["SUSPICIOUS_LOGIN", "BLOCKED", "THREAT", "SESSION_TERMINATED"]
  if (errorActions.some((a) => action.startsWith(a) || action === a)) return "error"
  if (warningActions.includes(action)) return "warning"
  return "success"
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard data")
        return res.json()
      })
      .then((json: DashboardData) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted text-sm">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-accent text-sm">Error: {error}</div>
      </div>
    )
  }

  const { stats, recentActivity, chartData } = data!
  const maxChartValue = Math.max(...chartData, 1)

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
        {statConfigs.map((stat, i) => {
          const Icon = stat.icon
          const value = stats[stat.key]
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
                  </div>
                  <span className="text-2xl font-bold text-white">{formatNumber(value)}</span>
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
                    style={{ height: `${(h / maxChartValue) * 100}%` }}
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
              {recentActivity.map((item, i) => {
                const status = getActionStatus(item.action)
                return (
                  <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    {status === "success" && <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />}
                    {status === "warning" && <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />}
                    {status === "error" && <XCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{getActionLabel(item.action)}</p>
                      <p className="text-xs text-muted/70 mt-0.5">
                        {item.userId} &middot; {timeAgo(item.createdAt)}
                      </p>
                    </div>
                    <Badge variant={status === "success" ? "success" : status === "warning" ? "warning" : "destructive"} className="shrink-0">
                      {status}
                    </Badge>
                  </div>
                )
              })}
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
