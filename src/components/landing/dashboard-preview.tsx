"use client"

import { motion } from "framer-motion"
import { Users, Activity, Shield, Key, BarChart3, Settings, AlertTriangle, CheckCircle } from "lucide-react"

const metrics = [
  { label: "Active Users", value: "12,847", change: "+12%", icon: Users, color: "from-[#00E5FF] to-[#6E56CF]" },
  { label: "Active Sessions", value: "8,342", change: "+8%", icon: Activity, color: "from-[#6E56CF] to-[#FF2D55]" },
  { label: "Licenses Active", value: "11,203", change: "+15%", icon: Key, color: "from-[#FF2D55] to-[#F59E0B]" },
  { label: "Threats Blocked", value: "1,847", change: "-23%", icon: Shield, color: "from-[#10B981] to-[#00E5FF]" },
]

const recentAlerts = [
  { type: "warning", message: "Suspicious login attempt detected from IP 45.33.32.156", time: "2 min ago" },
  { type: "success", message: "New device registered: Windows 11 - HWID: 7A3F...B9C2", time: "15 min ago" },
  { type: "error", message: "Rate limit exceeded for API key: sa_8f3d...a1b2", time: "1 hour ago" },
  { type: "info", message: "License auto-renewed for project: Project Phoenix", time: "2 hours ago" },
]

export function DashboardPreview() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-4">
            Powerful Dashboard
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Real-time insights and complete control over your authentication infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent rounded-2xl blur-3xl opacity-50" />
          <div className="relative rounded-2xl border border-border bg-surface/80 backdrop-blur-2xl overflow-hidden shadow-premium">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm text-muted ml-2">Dashboard Overview</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Last 30 days</span>
                  <div className="w-24 h-6 rounded bg-border/50" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div key={metric.label} className="p-4 rounded-xl border border-border bg-gradient-glass">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} p-2`}>
                          <Icon className="w-full h-full text-white" />
                        </div>
                        <span className={`text-xs font-medium ${metric.change.startsWith("+") ? "text-success" : "text-accent"}`}>
                          {metric.change}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-white">{metric.value}</span>
                      <p className="text-xs text-muted mt-1">{metric.label}</p>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-border bg-gradient-glass">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    API Usage
                  </h3>
                  <div className="h-32 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 65, 50].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t relative group cursor-pointer">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all duration-300 group-hover:from-primary/80"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-gradient-glass">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    Recent Security Alerts
                  </h3>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />}
                        {alert.type === "success" && <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />}
                        {alert.type === "error" && <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />}
                        {alert.type === "info" && <Activity className="w-4 h-4 text-primary mt-0.5 shrink-0" />}
                        <div>
                          <p className="text-sm text-muted">{alert.message}</p>
                          <span className="text-xs text-muted/50">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
