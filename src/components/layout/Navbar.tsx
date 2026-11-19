"use client"

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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4">
      {/* Toggle sidebar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="shrink-0"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Breadcrumb */}
      <div className="hidden md:flex items-center">
        <Breadcrumb pathname={pathname} />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-auto md:mx-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <Input
            type="search"
            placeholder="Search topics, subjects..."
            className="pl-9 h-8 bg-[hsl(var(--muted))] border-transparent focus-visible:border-[hsl(var(--border))]"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
          >
            3
          </Badge>
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                  RS
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Rahul Sharma</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2 cursor-pointer">
              <Link href="/dashboard">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="gap-2 cursor-pointer">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2 cursor-pointer text-red-500 focus:text-red-500">
              <Link href="/">
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
