"use client"

import { useState, Suspense } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import MobileBottomNav from "./MobileBottomNav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileMenuOpen((prev) => !prev)
    } else {
      setSidebarCollapsed((prev) => !prev)
    }
  }

  const closeMobile = () => setMobileMenuOpen(false)

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
        <Navbar
          onToggleSidebar={toggleSidebar}
          sidebarOpen={mobileMenuOpen || !sidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Quick Access Mobile Bottom Bar */}
      <MobileBottomNav />
    </div>
  )
}
