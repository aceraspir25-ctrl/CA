"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Flame,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import CommandPalette from "@/components/ui/CommandPalette"
import ThemeCustomizer from "@/components/ui/ThemeCustomizer"

interface NavbarProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

function Breadcrumb({ pathname }: { pathname: string }) {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return <span className="text-sm font-medium">Home</span>

  return (
    <nav className="flex items-center gap-1 text-sm">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1
        const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ")
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />}
            <span
              className={
                isLast
                  ? "font-semibold text-[hsl(var(--foreground))]"
                  : "text-[hsl(var(--muted-foreground))]"
              }
            >
              {label}
            </span>
          </span>
        )
      })}
    </nav>
  )
}

export default function Navbar({ onToggleSidebar, sidebarOpen }: NavbarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  // Listen for Ctrl+K / ⌘K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 sm:gap-4 border-b border-[hsl(var(--border))] glass-nav px-3 sm:px-4">
        {/* Toggle sidebar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="shrink-0 rounded-xl hover:bg-[hsl(var(--muted))] active:scale-95 transition-all"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Breadcrumb */}
        <div className="hidden lg:flex items-center">
          <Breadcrumb pathname={pathname} />
        </div>

        {/* Command Palette Trigger */}
        <div className="flex-1 max-w-md mx-auto md:mx-4">
          <button
            type="button"
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-[hsl(var(--muted)/0.7)] hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] transition-all group cursor-pointer shadow-xs active:scale-[0.99]"
            title="Search courses, chapters, tools (Ctrl+K)"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-primary transition-colors shrink-0" />
              <span className="hidden sm:inline text-xs md:text-sm">Search subjects, B.Com, CA, AI tools...</span>
              <span className="inline sm:hidden text-xs">Search topics & AI...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] shadow-xs shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Autonomous Status Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Leader-00 Active</span>
          </div>

          {/* Study Streak Flame */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all"
            title="7-Day Active Study Streak"
          >
            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>7d Streak</span>
          </Link>

          {/* Live Theme Customizer */}
          <ThemeCustomizer />

          {/* Quick Sun/Moon Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full hover:bg-[hsl(var(--muted))] active:scale-95 transition-all"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full hover:bg-[hsl(var(--muted))] active:scale-95 transition-all"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Badge
              variant="destructive"
              className="absolute 1 top-0.5 right-0.5 h-4 min-w-[16px] px-1 rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse"
            >
              3
            </Badge>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 transition-transform">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary transition-all">
                  <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-xs font-bold">
                    RS
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 p-2 glass-panel border border-[hsl(var(--border))] rounded-2xl shadow-xl">
              <DropdownMenuLabel className="font-semibold text-xs px-2 py-1.5">
                <div className="flex flex-col">
                  <span className="text-[hsl(var(--foreground))] text-sm">Rahul Sharma</span>
                  <span className="text-[hsl(var(--muted-foreground))] font-normal text-xs">rahul.sharma@gmail.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl px-2.5 py-2 text-xs font-medium hover:bg-[hsl(var(--accent))]">
                <Link href="/dashboard">
                  <User className="h-3.5 w-3.5 text-primary" />
                  My Student Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl px-2.5 py-2 text-xs font-medium hover:bg-[hsl(var(--accent))]">
                <Link href="/settings">
                  <Settings className="h-3.5 w-3.5 text-primary" />
                  Account & Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl px-2.5 py-2 text-xs font-medium hover:bg-[hsl(var(--accent))]">
                <Link href="/admin/pipeline">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  Agentic AI Pipeline
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem asChild className="gap-2 cursor-pointer rounded-xl px-2.5 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 focus:text-red-500">
                <Link href="/">
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  )
}
