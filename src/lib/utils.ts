import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateLicenseKey(): string {
  const segments = []
  for (let i = 0; i < 4; i++) {
    let segment = ""
    for (let j = 0; j < 4; j++) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      segment += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    segments.push(segment)
  }
  return segments.join("-")
}

export function generateApiKey(): { key: string; prefix: string; lastChars: string } {
  const prefix = "sa_" + Math.random().toString(36).substring(2, 8)
  const crypto = typeof window === "undefined" ? require("crypto") : null
  const randomPart = crypto ? crypto.randomBytes(32).toString("hex") : Array.from({ length: 64 }, () => Math.random().toString(36)[2]).join("")
  const key = prefix + "_" + randomPart
  const lastChars = key.slice(-4)
  return { key, prefix, lastChars }
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
  if (num >= 1000) return (num / 1000).toFixed(1) + "K"
  return num.toString()
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export function timeAgo(date: Date | string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ]
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`
    }
  }
  return "just now"
}

export function maskString(str: string, visibleChars: number = 4): string {
  if (str.length <= visibleChars) return str
  const masked = "*".repeat(str.length - visibleChars)
  return masked + str.slice(-visibleChars)
}
