"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Radio,
  Key,
  Monitor,
  BarChart3,
  KeyRound,
  Settings,
  Shield,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const userNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  { icon: Radio, label: "Sessions", href: "/dashboard/sessions" },
  { icon: Key, label: "Licenses", href: "/dashboard/licenses" },
  { icon: Monitor, label: "Devices", href: "/dashboard/devices" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: KeyRound, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: Settings, label: "Configurations", href: "/dashboard/configurations" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

const adminNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Radio, label: "Sessions", href: "/admin/sessions" },
  { icon: Key, label: "Licenses", href: "/admin/licenses" },
  { icon: ShieldCheck, label: "Audit Log", href: "/admin/audit" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-surface/80 backdrop-blur-2xl border-r border-border z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/dashboard" className={cn("flex items-center gap-2", collapsed && "justify-center w-full")}>
          <Shield className="w-6 h-6 text-primary shrink-0" />
          {!collapsed && (
            <span className="text-sm font-bold text-white">
              Sinner<span className="text-primary">Auth</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-muted hover:text-white transition-colors", collapsed && "hidden")}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="text-muted hover:text-white transition-colors absolute -right-3 top-4 bg-surface border border-border rounded-full p-0.5"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
        {(user?.role === "SUPER_ADMIN" ? adminNavItems : userNavItems).map((item) => {
          const Icon = item.icon
          const isActive = item.href === "/admin"
            ? pathname.startsWith("/admin")
            : pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                collapsed && "justify-center px-2",
                isActive
                  ? item.href.startsWith("/admin")
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-border rounded text-xs text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-2 border-t border-border">
        <button
          onClick={signOut}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-accent hover:bg-accent/5 transition-all duration-200 w-full",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
