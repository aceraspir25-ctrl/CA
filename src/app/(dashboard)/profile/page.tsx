"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
  Trophy,
  Flame,
  Award,
  CheckCircle2,
  Clock,
  Edit3,
  Save,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  RotateCcw
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const {
    currentUser,
    updateProfile,
    studentLevel,
    studyStreakDays,
    studiedTopics,
    weakConcepts,
    certificates,
    virtualCash,
    portfolio
  } = useAppStore()

  const [isEditing, setIsEditing] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Local editable form fields
  const [name, setName] = useState(currentUser?.name || "Rahul Sharma")
  const [email, setEmail] = useState(currentUser?.email || "rahul.sharma@edufinance.pro")
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 43210")
  const [bio, setBio] = useState(currentUser?.bio || "Commerce and Finance aspirant aiming for excellence in undergraduate and professional examinations.")
  const [institution, setInstitution] = useState(currentUser?.institution || "PRSU")
  const [level, setLevel] = useState(currentUser?.level || "B.Com Semester 1")
  const [targetExam, setTargetExam] = useState(currentUser?.targetExam || "PRSU B.Com Semester 1 (2026-27)")
  const [targetExamDate, setTargetExamDate] = useState(currentUser?.targetExamDate || "May 2027")
  const [college, setCollege] = useState(currentUser?.college || "Pt. Ravishankar Shukla University College of Commerce")
  const [city, setCity] = useState(currentUser?.city || "Raipur, Chhattisgarh")

  // Portfolio total value
  const holdingsValue = portfolio.reduce((acc, h) => acc + h.shares * h.currentPrice, 0)
  const totalNetWorth = virtualCash + holdingsValue

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      name,
      email,
      phone,
      bio,
      institution,
      level,
      targetExam,
      targetExamDate,
      college,
      city,
      avatar: name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() || "RS"
    })
    setIsEditing(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fade-in">
      {/* 1. TOP HERO PROFILE CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Avatar Pill */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-2xl sm:text-3xl font-black flex items-center justify-center shadow-xl ring-4 ring-white/10 shrink-0">
                {currentUser?.avatar || "RS"}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-emerald-500 text-white shadow-md">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{currentUser?.name || name}</h1>
                <Badge className="bg-primary text-primary-foreground font-black text-xs">
                  Active Student
                </Badge>
                <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs font-semibold">
                  {currentUser?.institution || institution} &bull; {currentUser?.level || level}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {currentUser?.bio || bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-blue-400" /> {currentUser?.email || email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-400" /> {currentUser?.city || city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" /> Member since {currentUser?.createdAt || "2026"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            {savedSuccess && (
              <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 gap-1 px-3 py-1.5 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Saved!
              </Badge>
            )}

            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              variant={isEditing ? "destructive" : "outline"}
              className="rounded-2xl text-xs font-bold gap-1.5 border-white/20 hover:bg-white/10 cursor-pointer active:scale-95"
            >
              <Edit3 className="h-4 w-4" />
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-[hsl(var(--border))] space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[hsl(var(--muted-foreground))]">
            <span className="text-xs font-bold uppercase tracking-wider">Level Mastery</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-[hsl(var(--foreground))]">Lvl {studentLevel}/100</p>
          <Progress value={studentLevel} className="h-1.5 mt-2" />
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[hsl(var(--border))] space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[hsl(var(--muted-foreground))]">
            <span className="text-xs font-bold uppercase tracking-wider">Daily Streak</span>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-2xl font-black text-[hsl(var(--foreground))]">{studyStreakDays} Days</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Consistent Learner</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[hsl(var(--border))] space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[hsl(var(--muted-foreground))]">
            <span className="text-xs font-bold uppercase tracking-wider">Topics Studied</span>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-[hsl(var(--foreground))]">{studiedTopics.length} Chapters</p>
          <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Curriculum Covered</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-[hsl(var(--border))] space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[hsl(var(--muted-foreground))]">
            <span className="text-xs font-bold uppercase tracking-wider">Virtual Capital</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 truncate">
            ₹{totalNetWorth.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Practical Stock Lab</p>
        </div>
      </div>

      {/* 3. EDIT PROFILE FORM / VIEW MODE */}
      {isEditing ? (
        <Card className="glass-panel border-2 border-primary/40 shadow-xl rounded-3xl animate-in fade-in zoom-in-95 duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" /> Edit Real Student Profile
            </CardTitle>
            <CardDescription className="text-xs">
              Update your personal credentials, target exam date, and academic affiliations. All updates persist immediately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">Mobile / WhatsApp Number</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">City & State</label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">Target University / Board</label>
                  <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl h-10 px-3 text-xs sm:text-sm font-semibold"
                  >
                    <option value="PRSU">Pt. Ravishankar Shukla University (PRSU B.Com)</option>
                    <option value="ICAI">ICAI (Chartered Accountancy - CA)</option>
                    <option value="ICMAI">ICMAI (Cost & Management Accountancy - CMA)</option>
                    <option value="ICSI">ICSI (Company Secretary - CS)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">Current Semester / Stage</label>
                  <Input
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="e.g. B.Com Semester 1"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">College / Institute Name</label>
                  <Input
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[hsl(var(--foreground))]">Target Examination & Date</label>
                  <Input
                    value={targetExamDate}
                    onChange={(e) => setTargetExamDate(e.target.value)}
                    placeholder="e.g. May 2027"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[hsl(var(--foreground))]">Student Bio / Goal</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-3 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl text-xs font-bold gap-1.5 bg-primary btn-tactile cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Profile Details
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {/* 4. ACADEMIC DETAILS & ENROLLMENT OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-500" /> Academic Affiliation
            </CardTitle>
            <CardDescription className="text-xs">Your enrolled university, examination timeline, and target credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
              <span className="text-[hsl(var(--muted-foreground))] font-semibold">Board / University:</span>
              <span className="font-extrabold text-[hsl(var(--foreground))]">{currentUser?.institution || institution}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
              <span className="text-[hsl(var(--muted-foreground))] font-semibold">Active Stage:</span>
              <span className="font-extrabold text-primary">{currentUser?.level || level}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
              <span className="text-[hsl(var(--muted-foreground))] font-semibold">Target Examination:</span>
              <span className="font-bold text-[hsl(var(--foreground))]">{currentUser?.targetExam || targetExam}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
              <span className="text-[hsl(var(--muted-foreground))] font-semibold">Target Exam Date:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentUser?.targetExamDate || targetExamDate}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[hsl(var(--muted-foreground))] font-semibold">College / Campus:</span>
              <span className="font-bold text-[hsl(var(--foreground))] text-right max-w-xs truncate">{currentUser?.college || college}</span>
            </div>
          </CardContent>
        </Card>

        {/* 5. CERTIFICATES & RECENT STUDY ACTIVITY */}
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" /> Certificates & Verifications
            </CardTitle>
            <CardDescription className="text-xs">Official examination badges earned on EduFinance Pro.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {certificates.length === 0 ? (
              <div className="text-center py-6 text-xs text-[hsl(var(--muted-foreground))] space-y-2">
                <Award className="h-8 w-8 mx-auto text-slate-400 opacity-60" />
                <p>Complete course modules and score &ge; 70% in tests to generate verified certificates.</p>
              </div>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="text-xs font-black text-[hsl(var(--foreground))] truncate">{cert.courseName}</p>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      {cert.institution} &bull; Score: <strong className="text-emerald-500">{cert.scorePercentage}%</strong>
                    </p>
                    <p className="text-[10px] font-mono text-primary">{cert.verificationCode}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold border-amber-500/30 text-amber-500 shrink-0">
                    Verified
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* 6. RECENT ACTIVITY CHAPTERS */}
      <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" /> Recent Study History
          </CardTitle>
          <CardDescription className="text-xs">Chapters and topics marked as completed during your recent study sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[hsl(var(--border))]">
            {studiedTopics.map((topic) => (
              <div key={topic.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm font-bold text-[hsl(var(--foreground))] truncate">{topic.title}</p>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{topic.course} &bull; Level {topic.levelAchieved}</p>
                  </div>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0 font-medium">{topic.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
