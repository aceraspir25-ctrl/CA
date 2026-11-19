"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  ClipboardList,
  Bot,
  Library,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  title: string
  color: string
  items: NavItem[]
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/courses", icon: BookOpen },
  { label: "Study Lab", href: "/lab", icon: FlaskConical },
  { label: "Tests & Exams", href: "/tests", icon: ClipboardList },
  { label: "PYQ & Exam Simulator", href: "/exams", icon: ClipboardList },
  { label: "AI Tutor", href: "/ai-tutor", icon: Bot },
  { label: "AI Academic Agents", href: "/admin/agents", icon: Bot },
  { label: "Library", href: "/library", icon: Library },
  { label: "My Progress", href: "/progress", icon: BarChart2 },
  { label: "Admin & Faculty", href: "/admin", icon: Settings },
  { label: "Settings", href: "/settings", icon: Settings },
]

const courseGroups: NavGroup[] = [
  {
    title: "CA – Chartered Accountancy",
    color: "text-blue-500",
    items: [
      { label: "CA Foundation", href: "/courses?inst=icai&level=ca-foundation", icon: BookOpen },
      { label: "CA Intermediate", href: "/courses?inst=icai&level=ca-intermediate", icon: BookOpen },
      { label: "CA Final", href: "/courses?inst=icai&level=ca-final", icon: BookOpen },
    ],
  },
  {
    title: "CMA – Cost Accountancy",
    color: "text-green-500",
    items: [
      { label: "CMA Foundation", href: "/courses?inst=icmai&level=cma-foundation", icon: BookOpen },
      { label: "CMA Intermediate", href: "/courses?inst=icmai&level=cma-intermediate", icon: BookOpen },
      { label: "CMA Final", href: "/courses?inst=icmai&level=cma-final", icon: BookOpen },
    ],
  },
  {
    title: "CS – Company Secretary",
    color: "text-purple-500",
    items: [
      { label: "CS CSEET", href: "/courses?inst=icsi&level=cs-cseet", icon: BookOpen },
      { label: "CS Executive", href: "/courses?inst=icsi&level=cs-executive", icon: BookOpen },
      { label: "CS Professional", href: "/courses?inst=icsi&level=cs-professional", icon: BookOpen },
    ],
  },
  {
    title: "ACCA – Global Qualification",
    color: "text-red-500",
    items: [
      { label: "Applied Knowledge", href: "/courses?inst=acca&level=acca-knowledge", icon: BookOpen },
      { label: "Applied Skills", href: "/courses?inst=acca&level=acca-skills", icon: BookOpen },
      { label: "Strategic Professional", href: "/courses?inst=acca&level=acca-professional", icon: BookOpen },
    ],
  },
  {
    title: "B.Com – University",
    color: "text-orange-500",
    items: [
      { label: "PRSU B.Com", href: "/courses?inst=prsu&level=prsu-bcom-sem1", icon: BookOpen },
    ],
  },
  {
    title: "BBA – Management",
    color: "text-indigo-500",
    items: [
      { label: "BBA Semester 1", href: "/courses?inst=bba&level=bba-sem1", icon: BookOpen },
      { label: "BBA Semester 3", href: "/courses?inst=bba&level=bba-sem3", icon: BookOpen },
      { label: "BBA Semester 5", href: "/courses?inst=bba&level=bba-sem5", icon: BookOpen },
    ],
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const instParam = searchParams.get("inst")
  const levelParam = searchParams.get("level")

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] transition-all duration-300 ease-in-out shrink-0",
        isCollapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <GraduationCap className="shrink-0 h-7 w-7 text-blue-400" />
            <span className="font-bold text-base whitespace-nowrap text-white">
              EduFinance Pro
            </span>
          </div>
        )}
        {isCollapsed && <GraduationCap className="mx-auto h-7 w-7 text-blue-400" />}
        <button
          onClick={onToggle}
          className={cn(
            "p-1 rounded-md hover:bg-white/10 transition-colors text-white/70 hover:text-white shrink-0",
            isCollapsed && "mx-auto"
          )}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Main Nav */}
        {!isCollapsed && (
          <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
            Main Menu
          </p>
        )}
        <nav className="space-y-0.5 px-2">
          {mainNav.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-blue-600 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Course Groups */}
        {courseGroups.map((group) => (
          <div key={group.title} className="mt-4">
            {!isCollapsed && (
              <p className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-wider", group.color)}>
                {group.title}
              </p>
            )}
            {isCollapsed && <div className="my-2 mx-2 h-px bg-white/10" />}
            <nav className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const Icon = item.icon
                // For query-param routes like /courses?inst=icai&level=ca-foundation
                // match by checking both pathname and the query params
                const itemUrl = new URL(item.href, "http://x")
                const itemInst = itemUrl.searchParams.get("inst")
                const itemLevel = itemUrl.searchParams.get("level")
                const active =
                  pathname === itemUrl.pathname &&
                  (!itemInst || itemInst === instParam) &&
                  (!itemLevel || itemLevel === levelParam)
                return (
                  <Link
                    key={`${group.title}-${item.label}`}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-blue-600 text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", group.color)} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                RS
              </AvatarFallback>
            </Avatar>
            <Link
              href="/"
              className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Logout to Home"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                  RS
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-medium text-white truncate">Rahul Sharma</p>
                <p className="text-xs text-white/50">Student</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="w-full justify-start gap-2 text-white/60 hover:text-white hover:bg-white/10"
            >
              <Link href="/">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
