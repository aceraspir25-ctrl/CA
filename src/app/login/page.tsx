"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowRight, ShieldCheck, UserCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("rahul.sharma@edufinance.pro")
  const [password, setPassword] = useState("••••••••")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50/50 via-[hsl(var(--background))] to-transparent dark:from-blue-950/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span>EduFinance Pro</span>
          </Link>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Sign in to access courses, study lab, AI tutor, and digital library
          </p>
        </div>

        <Card className="border-[hsl(var(--border))] shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Student / Faculty Login</CardTitle>
            <CardDescription className="text-xs">
              All courses & levels are 100% unlocked for open access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Password</label>
                  <span className="text-xs text-blue-600 hover:underline cursor-pointer">Forgot password?</span>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2 font-semibold">
                Sign In to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[hsl(var(--border))]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[hsl(var(--card))] px-2 text-[hsl(var(--muted-foreground))]">Or Quick Access</span>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="w-full gap-1.5 text-xs font-semibold rounded-xl"
              >
                <UserCheck className="h-3.5 w-3.5 text-blue-600" /> Explore as Student Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-medium hover:underline">
            Create an Account Free
          </Link>
        </p>
      </div>
    </div>
  )
}
