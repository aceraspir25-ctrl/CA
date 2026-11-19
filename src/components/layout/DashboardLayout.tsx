"use client"

import { useState, Suspense } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev)

  return (
    <div className="flex h-screen overflow-hidden bg-[hsl(var(--background))]">
      <Suspense fallback={
        <aside className="flex flex-col h-screen w-[240px] bg-[hsl(var(--sidebar-bg))] shrink-0" />
      }>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </Suspense>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={!sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
