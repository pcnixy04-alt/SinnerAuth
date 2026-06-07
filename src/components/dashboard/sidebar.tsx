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

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: Radio, label: "Sessions", href: "/dashboard/sessions" },
  { icon: Key, label: "Licenses", href: "/dashboard/licenses" },
  { icon: Monitor, label: "Devices", href: "/dashboard/devices" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: KeyRound, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: Settings, label: "Configurations", href: "/dashboard/configurations" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
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
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
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
        {user?.role === "SUPER_ADMIN" && (
          <>
            <div className="border-t border-border my-2" />
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                collapsed && "justify-center px-2",
                pathname.startsWith("/admin")
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted hover:text-accent hover:bg-accent/5"
              )}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Admin Panel</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-border rounded text-xs text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  Admin Panel
                </div>
              )}
            </Link>
          </>
        )}
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
