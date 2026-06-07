"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, LayoutDashboard, Users, Radio, Key, FileText, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/sessions", label: "Sessions", icon: Radio },
  { href: "/admin/licenses", label: "Licenses", icon: Key },
  { href: "/admin/audit", label: "Audit Log", icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#070707] border-r border-border z-50">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" />
            <span className="text-lg font-bold text-white">
              Sinner<span className="text-accent">Admin</span>
            </span>
          </Link>
          <p className="text-xs text-muted mt-1">Control Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-all mb-2">
              <Shield className="w-4 h-4 text-primary" />
              User Dashboard
            </button>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted hover:text-accent hover:bg-accent/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  )
}
