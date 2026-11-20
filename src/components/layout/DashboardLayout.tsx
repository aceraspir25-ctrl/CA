"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import MobileBottomNav from "./MobileBottomNav"
import FloatingAIAssistant from "@/components/ui/FloatingAIAssistant"
import { useAppStore } from "@/lib/store"
import { Lock, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const { isAuthenticated } = useAppStore()
  const [mounted, setMounted] = useState(false)

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, router])

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileMenuOpen((prev) => !prev)
    } else {
      setSidebarCollapsed((prev) => !prev)
    }
  }

  const closeMobile = () => setMobileMenuOpen(false)

  // Guard: If not mounted yet or not authenticated, render strict lock screen
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center space-y-4">
        <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <Lock className="h-10 w-10 animate-pulse" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h2 className="text-xl font-black">Restricted Access (Login Required)</h2>
          <p className="text-xs text-slate-400">
            You must be logged in with a valid student or faculty account to access courses, study notes, and tools.
          </p>
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 btn-tactile cursor-pointer"
        >
          Go to Login / Sign Up <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[hsl(var(--background))]">
      <Suspense fallback={
        <aside className="hidden md:flex flex-col h-screen w-[240px] bg-[hsl(var(--sidebar-bg))] shrink-0" />
      }>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          isMobileOpen={mobileMenuOpen}
          onCloseMobile={closeMobile}
        />
      </Suspense>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Suspense fallback={<header className="h-14 border-b border-[hsl(var(--border))] glass-nav px-4 shrink-0" />}>
          <Navbar
            onToggleSidebar={toggleSidebar}
            sidebarOpen={mobileMenuOpen || !sidebarCollapsed}
          />
        </Suspense>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Quick Access Mobile Bottom Bar */}
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>

      {/* Floating AI Doubt Solver */}
      <FloatingAIAssistant />
    </div>
  )
}
