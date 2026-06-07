"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, Key, Monitor, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

interface AnalyticsMetrics {
  totalUsers: number
  totalSessions: number
  totalLicenses: number
  totalDevices: number
}

interface AnalyticsData {
  metrics: AnalyticsMetrics
  weeklyData: number[]
  monthlyData: number[]
}

const metricConfigs = [
  { label: "Total Users", key: "totalUsers" as const, icon: Users },
  { label: "Total Sessions", key: "totalSessions" as const, icon: Activity },
  { label: "Total Licenses", key: "totalLicenses" as const, icon: Key },
  { label: "Total Devices", key: "totalDevices" as const, icon: Monitor },
]

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load analytics")
        return res.json()
      })
      .then((json: AnalyticsData) => {
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
        <div className="text-muted text-sm">Loading analytics...</div>
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

  const { metrics, weeklyData, monthlyData } = data!
  const maxWeekly = Math.max(...weeklyData, 1)
  const maxMonthly = Math.max(...monthlyData, 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-muted mt-1">Detailed insights about your authentication platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricConfigs.map((config, i) => {
          const Icon = config.icon
          const value = metrics[config.key]
          return (
            <motion.div
              key={config.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-muted" />
                  </div>
                  <span className="text-xl font-bold text-white">{formatNumber(value)}</span>
                  <p className="text-xs text-muted mt-0.5">{config.label}</p>
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
              Weekly Authentications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-2">
              {weeklyData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary/20 rounded-t relative group cursor-pointer" style={{ height: `${(h / maxWeekly) * 100}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all group-hover:from-primary/80" style={{ height: "100%" }} />
                  </div>
                  <span className="text-xs text-muted">{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-secondary" />
              Monthly Authentications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-2">
              {monthlyData.map((h, i) => (
                <div key={i} className="flex-1 bg-secondary/20 rounded-t relative group cursor-pointer">
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary to-secondary/50 rounded-t transition-all group-hover:from-secondary/80" style={{ height: `${(h / maxMonthly) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Monitor className="w-4 h-4 text-primary" />
            Device Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Windows", percentage: 45, color: "from-primary to-cyan-400" },
              { label: "macOS", percentage: 25, color: "from-secondary to-purple-400" },
              { label: "Linux", percentage: 15, color: "from-accent to-orange-400" },
              { label: "Android", percentage: 10, color: "from-success to-green-400" },
              { label: "iOS", percentage: 5, color: "from-warning to-yellow-400" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{item.label}</span>
                  <span className="text-white font-medium">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
