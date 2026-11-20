"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Bot,
  Library,
  ClipboardList,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "AI Tutor", href: "/ai-tutor", icon: Bot },
  { label: "Tests", href: "/tests", icon: ClipboardList },
  { label: "Profile", href: "/profile", icon: User },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-md px-2 safe-area-inset-bottom shadow-lg"
    >
      {bottomNavItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition-colors rounded-lg touch-manipulation",
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            <div
              className={cn(
                "p-1 rounded-full transition-transform",
                isActive ? "bg-blue-500/10 scale-110" : ""
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="mt-0.5 leading-none">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
