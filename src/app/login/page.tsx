"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Compass
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const {
    isAuthenticated,
    currentUser,
    login,
    signup,
    logout
  } = useAppStore()

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("rahul.sharma@edufinance.pro")
  const [loginPassword, setLoginPassword] = useState("password123")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loginSuccess, setLoginSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Signup form state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupInstitution, setSignupInstitution] = useState("PRSU")
  const [signupLevel, setSignupLevel] = useState("B.Com Semester 1")
  const [signupCollege, setSignupCollege] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [signupError, setSignupError] = useState("")
  const [signupSuccess, setSignupSuccess] = useState("")

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setLoginSuccess("")
    setIsLoading(true)

    setTimeout(() => {
      const res = login(loginEmail, loginPassword)
      setIsLoading(false)
      if (res.success) {
        setLoginSuccess(res.message)
        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
      } else {
        setLoginError(res.message)
      }
    }, 400)
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")
    setSignupSuccess("")

    if (!signupName.trim()) {
      setSignupError("Please enter your full name.")
      return
    }
    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setSignupError("Please enter a valid email address.")
      return
    }
    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters long.")
      return
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match. Please re-enter carefully.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const res = signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        institution: signupInstitution,
        level: signupLevel,
        phone: signupPhone,
        college: signupCollege || `${signupInstitution} Affiliated Institute`
      })
      setIsLoading(false)

      if (res.success) {
        setSignupSuccess(res.message)
        setTimeout(() => {
          router.push("/dashboard")
        }, 600)
      } else {
        setSignupError(res.message)
      }
    }, 500)
  }

  // Quick 1-Click Demo Profiles
  const fillDemoProfile = (type: "rahul" | "priya" | "admin") => {
    setActiveTab("login")
    setLoginError("")
    if (type === "rahul") {
      setLoginEmail("rahul.sharma@edufinance.pro")
      setLoginPassword("password123")
    } else if (type === "priya") {
      setLoginEmail("priya.patel@icai.org")
      setLoginPassword("ca2027")
    } else {
      setLoginEmail("admin@edufinance.pro")
      setLoginPassword("password123")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 text-2xl sm:text-3xl font-black tracking-tight text-white hover:opacity-90 transition-opacity">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span>EduFinance Pro</span>
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Autonomous Commerce, B.Com, CA & Finance Learning Platform.
            Log in or create an account to access structured curriculum, notes & AI tutors.
          </p>
        </div>

        {/* If already authenticated, show user status banner */}
        {isAuthenticated && currentUser && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-white flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 font-bold text-sm flex items-center justify-center shrink-0">
                {currentUser.avatar || "RS"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-emerald-400">Currently Logged In</p>
                <p className="text-sm font-black truncate">{currentUser.name}</p>
                <p className="text-[11px] text-slate-300 truncate">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 btn-tactile cursor-pointer"
              >
                Dashboard <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="rounded-xl text-xs font-semibold border-white/20 hover:bg-white/10 cursor-pointer"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* Main Card */}
        <Card className="glass-panel border-white/10 text-white shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl">
          {/* Tabs Selector */}
          <div className="grid grid-cols-2 p-1.5 bg-black/40 border-b border-white/10">
            <button
              onClick={() => {
                setActiveTab("login")
                setLoginError("")
                setSignupError("")
              }}
              className={`py-3 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <KeyRound className="h-4 w-4" />
              Sign In (Login)
            </button>
            <button
              onClick={() => {
                setActiveTab("signup")
                setLoginError("")
                setSignupError("")
              }}
              className={`py-3 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              Create Account (Sign Up)
            </button>
          </div>

          <CardContent className="p-6 space-y-5">
            {/* 1. LOGIN TAB */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{loginError}</span>
                  </div>
                )}

                {loginSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{loginSuccess} Redirecting to your dashboard...</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-blue-400" /> Email Address
                  </label>
                  <Input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="student@example.com"
                    required
                    className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm focus-visible:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-blue-400" /> Password
                    </label>
                    <span
                      onClick={() => alert("For demo accounts: use 'password123' or 'ca2027'. You can also create a new account via the Sign Up tab.")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your account password"
                      required
                      className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm pr-10 focus-visible:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 btn-tactile cursor-pointer"
                >
                  {isLoading ? "Authenticating..." : "Sign In & Unlock Courses"}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>
            )}

            {/* 2. SIGNUP TAB */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {signupError && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{signupError}</span>
                  </div>
                )}

                {signupSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{signupSuccess} Entering platform...</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-400" /> Full Student Name
                  </label>
                  <Input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Aman Verma"
                    required
                    className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm focus-visible:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-blue-400" /> Email Address
                    </label>
                    <Input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="aman@example.com"
                      required
                      className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-blue-400" /> Mobile / WhatsApp
                    </label>
                    <Input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Institution & Level Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-blue-400" /> Target Board / University
                    </label>
                    <select
                      value={signupInstitution}
                      onChange={(e) => {
                        setSignupInstitution(e.target.value)
                        if (e.target.value === "PRSU") setSignupLevel("B.Com Semester 1")
                        else if (e.target.value === "ICAI") setSignupLevel("CA Foundation")
                        else if (e.target.value === "ICMAI") setSignupLevel("CMA Foundation")
                        else if (e.target.value === "ICSI") setSignupLevel("CS CSEET")
                      }}
                      className="w-full bg-black/30 border border-white/10 text-white rounded-xl h-11 px-3 text-xs sm:text-sm focus-visible:ring-blue-500"
                    >
                      <option value="PRSU" className="bg-slate-900 text-white">Pt. Ravishankar Shukla University (PRSU B.Com)</option>
                      <option value="ICAI" className="bg-slate-900 text-white">ICAI (Chartered Accountancy - CA)</option>
                      <option value="ICMAI" className="bg-slate-900 text-white">ICMAI (Cost & Management Accountancy - CMA)</option>
                      <option value="ICSI" className="bg-slate-900 text-white">ICSI (Company Secretary - CS)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-blue-400" /> Semester / Stage
                    </label>
                    <select
                      value={signupLevel}
                      onChange={(e) => setSignupLevel(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 text-white rounded-xl h-11 px-3 text-xs sm:text-sm focus-visible:ring-blue-500"
                    >
                      {signupInstitution === "PRSU" && (
                        <>
                          <option value="B.Com Semester 1" className="bg-slate-900 text-white">B.Com Semester 1 (Accounting, Law, Econ)</option>
                          <option value="B.Com Semester 2" className="bg-slate-900 text-white">B.Com Semester 2 (Corporate Basics, Maths)</option>
                          <option value="B.Com Semester 3" className="bg-slate-900 text-white">B.Com Semester 3 (Corporate Acc, Stats)</option>
                          <option value="B.Com Semester 4" className="bg-slate-900 text-white">B.Com Semester 4 (Cost Acc, Company Law)</option>
                          <option value="B.Com Semester 5" className="bg-slate-900 text-white">B.Com Semester 5 (Income Tax, Audit)</option>
                          <option value="B.Com Semester 6" className="bg-slate-900 text-white">B.Com Semester 6 (Indirect Tax GST, Mgmt Acc)</option>
                        </>
                      )}
                      {signupInstitution === "ICAI" && (
                        <>
                          <option value="CA Foundation" className="bg-slate-900 text-white">CA Foundation (New Scheme)</option>
                          <option value="CA Intermediate Group 1" className="bg-slate-900 text-white">CA Intermediate (Group 1)</option>
                          <option value="CA Intermediate Group 2" className="bg-slate-900 text-white">CA Intermediate (Group 2)</option>
                          <option value="CA Final" className="bg-slate-900 text-white">CA Final</option>
                        </>
                      )}
                      {signupInstitution === "ICMAI" && (
                        <>
                          <option value="CMA Foundation" className="bg-slate-900 text-white">CMA Foundation</option>
                          <option value="CMA Intermediate" className="bg-slate-900 text-white">CMA Intermediate</option>
                        </>
                      )}
                      {signupInstitution === "ICSI" && (
                        <>
                          <option value="CS CSEET" className="bg-slate-900 text-white">CS CSEET</option>
                          <option value="CS Executive" className="bg-slate-900 text-white">CS Executive</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-blue-400" /> College / Institution Name (Optional)
                  </label>
                  <Input
                    type="text"
                    value={signupCollege}
                    onChange={(e) => setSignupCollege(e.target.value)}
                    placeholder="e.g. Govt. College of Commerce / PRSU Campus"
                    className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm focus-visible:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-blue-400" /> Create Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showSignupPassword ? "text" : "password"}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        required
                        className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm pr-10 focus-visible:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-blue-400" /> Confirm Password
                    </label>
                    <Input
                      type={showSignupPassword ? "text" : "password"}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      required
                      className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl h-11 text-xs sm:text-sm focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 btn-tactile cursor-pointer"
                >
                  {isLoading ? "Creating Account..." : "Create My Student Account"}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>
            )}

            {/* Quick Demo Logins Section */}
            <div className="pt-2 border-t border-white/10 space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Instant 1-Click Fast Access (Pre-Configured Demos)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoProfile("rahul")}
                  className="h-10 text-xs font-bold rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 justify-start gap-2 cursor-pointer active:scale-95"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">
                    RS
                  </span>
                  <div className="text-left overflow-hidden">
                    <p className="truncate leading-tight">Rahul Sharma</p>
                    <p className="text-[10px] text-slate-400 truncate leading-tight">PRSU B.Com Sem 1</p>
                  </div>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoProfile("priya")}
                  className="h-10 text-xs font-bold rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 justify-start gap-2 cursor-pointer active:scale-95"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-black">
                    PP
                  </span>
                  <div className="text-left overflow-hidden">
                    <p className="truncate leading-tight">Priya Patel</p>
                    <p className="text-[10px] text-slate-400 truncate leading-tight">CA Foundation</p>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Support Note */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            256-Bit SSL Secured
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Dual-AI Memory Synced
          </span>
          <span>&bull;</span>
          <Link href="/" className="text-blue-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
