"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("Rahul Sharma")
  const [email, setEmail] = useState("rahul.sharma@edufinance.pro")
  const [selectedGoal, setSelectedGoal] = useState("ca")

  const handleSignup = (e: React.FormEvent) => {
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
            Join thousands of commerce students learning with AI & interactive labs
          </p>
        </div>

        <Card className="border-[hsl(var(--border))] shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Create Free Account</CardTitle>
            <CardDescription className="text-xs">
              Instant access to all CA, CMA, CS, ACCA & B.Com curriculum.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Full Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Primary Professional Goal</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: "ca", label: "CA (ICAI)" },
                    { id: "cma", label: "CMA (ICMAI)" },
                    { id: "cs", label: "CS (ICSI)" },
                    { id: "bcom", label: "B.Com" },
                    { id: "acca", label: "ACCA" },
                    { id: "bba", label: "BBA" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(g.id)}
                      className={`p-2 rounded-lg border font-medium transition-all ${
                        selectedGoal === g.id
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                          : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full gap-2 font-semibold">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>All 100 levels unlocked. Zero subscription paywalls.</span>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
          Already registered?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  )
}
