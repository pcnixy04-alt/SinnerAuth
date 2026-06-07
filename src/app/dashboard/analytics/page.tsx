"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, Radio, Key, Monitor, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const weeklyData = [1200, 1900, 1500, 2100, 1800, 2400, 2100]
const monthlyData = [45000, 52000, 49000, 58000, 63000, 59000, 72000, 68000, 75000, 82000, 78000, 95000]

const metrics = [
  { label: "Total Authentications", value: "2,847,392", change: "+18.3%", icon: Activity },
  { label: "New Users", value: "12,847", change: "+12.5%", icon: Users },
  { label: "Avg. Session Duration", value: "24m 18s", change: "+5.2%", icon: Radio },
  { label: "License Activations", value: "8,451", change: "+22.7%", icon: Key },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-muted mt-1">Detailed insights about your authentication platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-muted" />
                    <span className="text-xs text-success">{metric.change}</span>
                  </div>
                  <span className="text-xl font-bold text-white">{metric.value}</span>
                  <p className="text-xs text-muted mt-0.5">{metric.label}</p>
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
                  <div className="w-full bg-primary/20 rounded-t relative group cursor-pointer" style={{ height: `${(h / 2400) * 100}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all group-hover:from-primary/80" style={{ height: "100%" }} />
                  </div>
                  <span className="text-xs text-muted">{"Mon Tue Wed Thu Fri Sat Sun".split(" ")[i]}</span>
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary to-secondary/50 rounded-t transition-all group-hover:from-secondary/80" style={{ height: `${(h / 95000) * 100}%` }} />
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
