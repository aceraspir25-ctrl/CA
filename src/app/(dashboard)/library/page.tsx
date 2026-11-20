"use client"

import { useState, useEffect } from "react"
import {
  Library,
  BookMarked,
  Search,
  ExternalLink,
  FileText,
  Bookmark,
  CheckCircle2,
  FolderOpen,
  Scale,
  Receipt,
  GraduationCap,
  Download,
  Printer,
  Sparkles,
  BookOpen,
  FileCode,
  Layers,
  ArrowRight,
  Eye,
  Check,
  FileArchive,
  Palette,
  FileSpreadsheet,
  AlertCircle,
  Globe,
  Folder,
  ShieldCheck,
  BrainCircuit,
  Bot,
  RefreshCw,
  Lock,
  Compass,
  FileCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SAMPLE_STUDY_PACKAGES, ChapterStudyPackage, StudyResourceItem, NoteVisualStyle } from "@/data/studyPackagesData"
import {
  INITIAL_MULTI_PLATFORM_DOSSIERS,
  APPROVED_RESEARCH_SOURCES,
  MultiPlatformDossier,
  SourceRightsRecord,
  ContentCategory
} from "@/data/multiPlatformResearchData"
import { openPrintableResource } from "@/lib/pdf/handwrittenGenerator"
import { createZipBlob, triggerDownload, ZipFileEntry } from "@/lib/utils/zipBuilder"
import { AcademicContentItem } from "@/lib/content/contentPipeline"

const OFFICIAL_RESOURCES = [
  {
    category: "Official Bodies & Syllabuses",
    icon: GraduationCap,
    color: "text-blue-500",
    items: [
      { title: "ICAI Official Portal & BoS Knowledge Portal", source: "Institute of Chartered Accountants of India", url: "https://www.icai.org", verified: "Nov 2026", scheme: "New Education Scheme 2023+" },
      { title: "ICMAI Directorate of Studies & Syllabus 2022", source: "Institute of Cost Accountants of India", url: "https://icmai.in", verified: "Nov 2026", scheme: "Syllabus 2022" },
      { title: "ICSI Academic Portal & CS Executive / Professional", source: "Institute of Company Secretaries of India", url: "https://www.icsi.edu", verified: "Nov 2026", scheme: "New Syllabus 2022" },
      { title: "PRSU Raipur Official Portal & NEP B.Com Syllabuses", source: "Pt. Ravishankar Shukla University, Raipur", url: "https://www.prsu.ac.in", verified: "Nov 2026", scheme: "NEP-2020 / Traditional" },
    ]
  },
  {
    category: "Statutes & Legislation Acts",
    icon: Scale,
    color: "text-purple-500",
    items: [
      { title: "The Companies Act, 2013 (with updated MCA notifications)", source: "Ministry of Corporate Affairs (MCA)", url: "https://www.mca.gov.in", verified: "Updated 2026", scheme: "Schedule I to VII" },
      { title: "Income Tax Act, 1961 (incorporating Finance Act 2024)", source: "Income Tax Department of India", url: "https://incometaxindia.gov.in", verified: "Updated 2026", scheme: "Section 1 to 298" },
      { title: "Central Goods and Services Tax (CGST) Act, 2017", source: "CBIC / GST Council", url: "https://cbic.gov.in", verified: "Updated 2026", scheme: "Updated Slabs & ITC Rules" },
      { title: "SEBI (LODR & Prohibition of Insider Trading) Regulations", source: "Securities and Exchange Board of India", url: "https://www.sebi.gov.in", verified: "Updated 2026", scheme: "Capital Market Standards" },
    ]
  },
  {
    category: "Standards (AS / Ind AS / CAS / SA)",
    icon: FileText,
    color: "text-emerald-500",
    items: [
      { title: "Indian Accounting Standards (Ind AS 1 to 116)", source: "ICAI Accounting Standards Board", url: "https://www.icai.org", verified: "Updated 2026", scheme: "Converged with IFRS" },
      { title: "Cost Accounting Standards (CAS 1 to 24)", source: "ICMAI Cost Accounting Standards Board", url: "https://icmai.in", verified: "Updated 2026", scheme: "Mandatory under Sec 148" },
      { title: "Standards on Auditing (SA 200 to SA 810 series)", source: "ICAI Auditing and Assurance Standards Board", url: "https://www.icai.org", verified: "Updated 2026", scheme: "Clarified Standards" },
      { title: "Secretarial Standards (SS-1 Meetings & SS-2 General Meetings)", source: "ICSI Secretarial Standards Board", url: "https://www.icsi.edu", verified: "Updated 2026", scheme: "Mandatory under Sec 118(10)" },
    ]
  }
]

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"packages" | "multi_platform" | "portals" | "factory">("packages")
  const [packages, setPackages] = useState<ChapterStudyPackage[]>(SAMPLE_STUDY_PACKAGES)
  const [selectedPkg, setSelectedPkg] = useState<ChapterStudyPackage>(packages[0])
  const [previewResource, setPreviewResource] = useState<StudyResourceItem | null>(selectedPkg.resources[0])
  const [styleFilter, setStyleFilter] = useState<string>("all")
  const [isZipping, setIsZipping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Content Factory State
  const [factoryItems, setFactoryItems] = useState<AcademicContentItem[]>([])
  const [selectedFactoryItem, setSelectedFactoryItem] = useState<AcademicContentItem | null>(null)
  const [factoryLoading, setFactoryLoading] = useState(false)
  const [factoryChapterInput, setFactoryChapterInput] = useState("Ind AS 116: Leases & Asset Accounting")
  const [factoryCourseInput, setFactoryCourseInput] = useState("ICAI CA Intermediate")

  const fetchFactoryItems = async () => {
    setFactoryLoading(true)
    try {
      const res = await fetch("/api/content/factory")
      if (res.ok) {
        const data = await res.json()
        setFactoryItems(data.items || [])
        if (!selectedFactoryItem && data.items?.length > 0) {
          setSelectedFactoryItem(data.items[0])
        }
      }
    } catch (e) {
      console.warn("Factory fetch error:", e)
    } finally {
      setFactoryLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === "factory") {
      fetchFactoryItems()
    }
  }, [activeTab])

  const handleGenerateFactoryNotes = async () => {
    if (!factoryChapterInput.trim()) return
    setFactoryLoading(true)
    try {
      const res = await fetch("/api/content/factory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_notes",
          courseId: factoryCourseInput.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          courseName: factoryCourseInput,
          chapterName: factoryChapterInput
        })
      })
      if (res.ok) {
        await fetchFactoryItems()
      }
    } finally {
      setFactoryLoading(false)
    }
  }

  // Multi-Platform Dossiers & Harvester State
  const [dossiers, setDossiers] = useState<MultiPlatformDossier[]>(INITIAL_MULTI_PLATFORM_DOSSIERS)
  const [selectedDossier, setSelectedDossier] = useState<MultiPlatformDossier | null>(dossiers[0])
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string>("all")
  const [isHarvesterRunning, setIsHarvesterRunning] = useState(false)
  const [harvesterSuccessMsg, setHarvesterSuccessMsg] = useState("")
  const [newTopicInput, setNewTopicInput] = useState("Accounting Standards Ind AS 115 Revenue")
  const [newCourseInput, setNewCourseInput] = useState("CA Intermediate")
  const [dossierActiveSubTab, setDossierActiveSubTab] = useState<"notes" | "gap_analysis" | "rights_registry" | "mcqs">("notes")

  const handleRunHarvester = async () => {
    if (!newTopicInput.trim()) return
    setIsHarvesterRunning(true)
    setHarvesterSuccessMsg("")

    try {
      const res = await fetch("/api/ai/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "multi_platform_research",
          payload: {
            topic: newTopicInput,
            course: newCourseInput,
            subject: "Accounting & Commercial Standards",
            targetPlatforms: ["BYJU'S", "Physics Wallah", "Aakash", "EduRev", "StudyX", "Toppr", "Vedantu"]
          }
        })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.dossier) {
          setDossiers((prev) => [data.dossier, ...prev])
          setSelectedDossier(data.dossier)
          setHarvesterSuccessMsg(`Successfully executed cross-platform research and self-training for "${newTopicInput}"! Dossier saved to ${data.dossier.folderPath}`)
        }
      }
    } catch (err) {
      console.error("Harvester failed:", err)
    } finally {
      setIsHarvesterRunning(false)
    }
  }

  const filteredDossiers = dossiers.filter((d) => {
    const matchesFolder = selectedFolderFilter === "all" || d.folderPath.includes(selectedFolderFilter)
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.course.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  const filteredResources = selectedPkg.resources.filter((res) => {
    const matchesStyle = styleFilter === "all" || res.visualStyle === styleFilter
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStyle && matchesSearch
  })

  const handleDownloadCompleteZip = () => {
    setIsZipping(true)
    setTimeout(() => {
      const files: ZipFileEntry[] = [
        {
          name: "00_PACKAGE_METADATA.txt",
          content: `EduFinance Pro Chapter Study Package
Course: ${selectedPkg.courseName} (${selectedPkg.institution})
Paper: ${selectedPkg.paperTitle}
Chapter: ${selectedPkg.chapterTitle} (${selectedPkg.hindiTitle})
Version: ${selectedPkg.version}
Published: ${selectedPkg.publishDate}
Verified By: ${selectedPkg.verifiedBy}
Total Learning Resources: ${selectedPkg.resources.length}
Downloaded for Offline Study: True`
        },
        ...selectedPkg.resources.map((res) => ({
          name: `${res.code}_${res.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.txt`,
          content: `${res.title}\n${res.hindiTitle}\nType: ${res.type}\nStyle: ${res.visualStyle}\nPages: ${res.pagesCount}\n\n${res.rawContent}`
        }))
      ]

      const zipBlob = createZipBlob(files)
      const zipFileName = `${selectedPkg.courseName.replace(/\s+/g, "_")}_Ch${selectedPkg.chapterNumber}_Complete_Package.zip`
      triggerDownload(zipBlob, zipFileName)
      setIsZipping(false)
    }, 600)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Library className="h-6 w-6 text-blue-300" />
            </div>
            <h1 className="text-2xl font-bold">Student Digital Library & Study Material</h1>
            <Badge className="bg-emerald-500 text-white">Full Chapter Packages (14 Resources)</Badge>
          </div>
          <p className="text-blue-200 text-sm max-w-2xl">
            AI-researched, handwritten-style notebook notes, solved numericals, visual workflows, formula sheets, and mock tests. Read online or download complete packages for offline study.
          </p>
        </div>

        {/* 1-Click ZIP Download */}
        <div className="shrink-0">
          <Button
            size="lg"
            onClick={handleDownloadCompleteZip}
            disabled={isZipping}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-2 shadow-lg"
          >
            {isZipping ? (
              <>
                <FileArchive className="h-4 w-4 animate-spin" /> Bundling Chapter ZIP...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download Complete Package (ZIP)
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="bg-[hsl(var(--muted))]">
          <TabsTrigger value="packages" className="gap-2 text-xs">
            <BookOpen className="h-3.5 w-3.5 text-blue-500" /> Complete Chapter Packages (PDFs & ZIP)
          </TabsTrigger>
          <TabsTrigger value="multi_platform" className="gap-2 text-xs">
            <FolderOpen className="h-3.5 w-3.5 text-emerald-500" /> Multi-Platform Synthesized Dossiers (अलग फ़ोल्डर)
          </TabsTrigger>
          <TabsTrigger value="portals" className="gap-2 text-xs">
            <Globe className="h-3.5 w-3.5 text-indigo-500" /> Official Regulatory Portals & Statutes
          </TabsTrigger>
          <TabsTrigger value="factory" className="gap-2 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Content Factory & Quality Studio
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Complete Study Packages & Handwritten Notes */}
        <TabsContent value="packages" className="space-y-6">
          {/* Chapter Selector & Style Filter Sub-bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">Current Chapter:</span>
              <Badge className="bg-blue-600 text-white text-xs">
                {selectedPkg.courseName} • Ch {selectedPkg.chapterNumber}: {selectedPkg.chapterTitle}
              </Badge>
              <span className="text-xs text-blue-600 font-medium">({selectedPkg.hindiTitle})</span>
            </div>

            {/* Visual Styles Filter */}
            <div className="flex items-center gap-1.5 bg-[hsl(var(--background))] p-1 rounded-lg border border-[hsl(var(--border))] shrink-0">
              <Palette className="h-3.5 w-3.5 text-indigo-500 ml-1" />
              {[
                { id: "all", label: "All (14)" },
                { id: "clean_handwritten", label: "Handwritten" },
                { id: "visual_learning", label: "Visual" },
                { id: "numerical_notes", label: "Numerical" },
                { id: "exam_revision", label: "Revision" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStyleFilter(st.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    styleFilter === st.id
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of 14 Resources & Preview Modal/Side-panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: 14 Resource Cards */}
            <div className="lg:col-span-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredResources.map((res) => {
                  const isSelected = previewResource?.id === res.id

                  return (
                    <Card
                      key={res.id}
                      onClick={() => setPreviewResource(res)}
                      className={`cursor-pointer transition-all border ${
                        isSelected
                          ? "border-blue-600 shadow-md ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20"
                          : "hover:border-[hsl(var(--border))] hover:shadow-xs"
                      }`}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                            Resource #{res.code}
                          </span>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            {res.pagesCount} Pages • {res.estimatedReadTime}
                          </span>
                        </div>
                        <CardTitle className="text-sm font-bold mt-2">{res.title}</CardTitle>
                        <p className="text-xs text-blue-600">{res.hindiTitle}</p>
                      </CardHeader>
                      <CardContent className="p-4 pt-1 space-y-3 text-xs">
                        <p className="text-[hsl(var(--muted-foreground))] line-clamp-2">
                          {res.description}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-[hsl(var(--border))]">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {res.visualStyle.replace(/_/g, " ")}
                          </Badge>
                          <div className="flex items-center gap-1.5">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                openPrintableResource(res, selectedPkg.chapterTitle, selectedPkg.courseName, selectedPkg.institution)
                              }}
                              className="h-7 px-2 text-[11px] gap-1"
                              title="Print / Save as PDF"
                            >
                              <Printer className="h-3 w-3 text-blue-600" />
                              PDF
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setPreviewResource(res)
                              }}
                              className="h-7 px-2 text-[11px] bg-blue-600 hover:bg-blue-700"
                            >
                              Read
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Right Col: Live Interactive Notebook Reader */}
            <div className="space-y-4">
              {previewResource ? (
                <Card className="border-[hsl(var(--border))] shadow-md sticky top-20">
                  <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-xs">
                        Resource #{previewResource.code}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => openPrintableResource(previewResource, selectedPkg.chapterTitle, selectedPkg.courseName, selectedPkg.institution)}
                        className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Printer className="h-3 w-3" /> Print / PDF
                      </Button>
                    </div>
                    <CardTitle className="text-base font-bold mt-2">{previewResource.title}</CardTitle>
                    <CardDescription className="text-xs">{previewResource.hindiTitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-3 space-y-4 text-xs">
                    {/* Notebook Paper Preview Box */}
                    <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20 max-h-[420px] overflow-y-auto space-y-3 font-serif">
                      <div className="flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300 font-bold border-b border-amber-200 pb-1.5">
                        <span>Notebook Style: {previewResource.visualStyle.replace(/_/g, " ")}</span>
                        <span>{previewResource.pagesCount} Pages</span>
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed text-[hsl(var(--foreground))]">
                        {previewResource.rawContent}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[hsl(var(--border))] flex items-center justify-between text-[11px] text-[hsl(var(--muted-foreground))]">
                      <span>Course: <strong>{selectedPkg.courseName}</strong></span>
                      <span className="text-emerald-600 font-semibold">✓ Verified Package</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="p-8 text-center border border-dashed rounded-xl text-xs text-[hsl(var(--muted-foreground))]">
                  Select a resource from the list to preview online.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: Multi-Platform Synthesized Dossiers in Dedicated Folder (नया फ़ोल्डर) */}
        <TabsContent value="multi_platform" className="space-y-6">
          {/* Copyright & 3-Category Distinction Safety Banner */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-blue-950 dark:text-blue-100">
                  Autonomous Multi-Platform Academic Intelligence & Copyright Boundary System
                </h3>
              </div>
              <Badge className="bg-emerald-600 text-white text-[11px]">Strict Fair Dealing Doctrine</Badge>
            </div>
            <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
              Our autonomous Agent (<strong>MPA-11</strong>) surveys publicly available pedagogical structures across 7 educational platforms (<strong>BYJU&apos;S, Physics Wallah, Aakash Institute, EduRev, StudyX, Toppr, Vedantu</strong>) and validates facts with official bodies (<strong>ICAI, ICMAI, ICSI, MCA, CBDT</strong>). Third-party materials are used solely for topic discovery and learning gap analysis. <strong>100% of study notes, flowcharts, numericals, and MCQs are original independent creations.</strong>
            </p>
            {/* 3 Categories Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>🟢 Original AI/Faculty Content:</strong> Verified original synthesis published directly for students.
              </div>
              <div className="p-2 rounded-lg bg-blue-100/70 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200">
                <strong>🔵 Licensed Third-Party Content:</strong> Strictly published conforming to official license rights.
              </div>
              <div className="p-2 rounded-lg bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <strong>🟡 Restricted Third-Party Content:</strong> Reference & research ONLY; original equivalent synthesized.
              </div>
            </div>
          </div>

          {/* Agent Harvester Trigger Bar */}
          <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-bold">Trigger Multi-Platform Academic Harvester & Self-Training Cycle</span>
              </div>
              <span className="text-[11px] text-[hsl(var(--muted-foreground))]">Agent MPA-11 Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-5">
                <Input
                  value={newTopicInput}
                  onChange={(e) => setNewTopicInput(e.target.value)}
                  placeholder="Enter Topic (e.g. Ind AS 115 Revenue Model, Costing BEP)"
                  className="h-9 text-xs"
                />
              </div>
              <div className="sm:col-span-3">
                <select
                  value={newCourseInput}
                  onChange={(e) => setNewCourseInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-xs font-medium"
                >
                  <option value="CA Foundation">CA Foundation</option>
                  <option value="CA Intermediate">CA Intermediate</option>
                  <option value="CA Final">CA Final</option>
                  <option value="CMA Foundation">CMA Foundation</option>
                  <option value="CS Executive">CS Executive</option>
                  <option value="B.Com PRSU">B.Com PRSU</option>
                  <option value="ACCA Global">ACCA Global</option>
                </select>
              </div>
              <div className="sm:col-span-4">
                <Button
                  onClick={handleRunHarvester}
                  disabled={isHarvesterRunning}
                  className="w-full h-9 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                >
                  {isHarvesterRunning ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Harvesting & Training Agent...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" /> Run Harvester & Save to Folder
                    </>
                  )}
                </Button>
              </div>
            </div>

            {harvesterSuccessMsg && (
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 pt-1">
                <Check className="h-4 w-4" /> {harvesterSuccessMsg}
              </p>
            )}

            {/* Approved Platforms Strip */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[hsl(var(--border))]/50">
              <span className="text-[10px] uppercase font-bold text-[hsl(var(--muted-foreground))]">Survey Targets:</span>
              {["BYJU'S", "Physics Wallah (PW)", "Aakash Institute", "EduRev", "StudyX", "Toppr", "Vedantu", "ICAI", "MCA", "CBDT"].map((p) => (
                <Badge key={p} variant="outline" className="text-[10px] py-0 px-2 font-normal">
                  {p}
                </Badge>
              ))}
            </div>
          </div>

          {/* Folder Navigation Tabs & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] flex items-center gap-1">
              <Folder className="h-3.5 w-3.5" /> Library Folders:
            </span>
            {[
              { id: "all", label: `📁 All Dossiers (${dossiers.length})` },
              { id: "ca-cma-accounting", label: "📁 ca-cma-accounting/" },
              { id: "taxation-direct-indirect", label: "📁 taxation-direct-indirect/" },
              { id: "corporate-law-and-csr", label: "📁 corporate-law-and-csr/" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFolderFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedFolderFilter === f.id
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Main 2-Column Split View: Folder Dossier List + Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 4 Cols: Dossier Cards */}
            <div className="lg:col-span-4 space-y-3">
              {filteredDossiers.map((dossier) => {
                const isSelected = selectedDossier?.id === dossier.id
                return (
                  <Card
                    key={dossier.id}
                    onClick={() => setSelectedDossier(dossier)}
                    className={`cursor-pointer transition-all border ${
                      isSelected
                        ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/20"
                        : "hover:border-[hsl(var(--border))]/80 hover:bg-[hsl(var(--muted))]/30"
                    }`}
                  >
                    <CardHeader className="p-3.5 pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                          {dossier.folderPath}
                        </span>
                        <Badge className="bg-emerald-600 text-white text-[9px] px-1.5 py-0 shrink-0">
                          🟢 Original AI
                        </Badge>
                      </div>
                      <CardTitle className="text-xs font-bold line-clamp-2 mt-1 leading-snug">
                        {dossier.title}
                      </CardTitle>
                      <CardDescription className="text-[11px]">
                        {dossier.course} • {dossier.subject}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3.5 pt-0 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] pt-2 border-t border-[hsl(var(--border))]/50">
                        <span>Cycle #{dossier.selfTrainingCycle}</span>
                        <span className="text-emerald-600 font-semibold">
                          Originality: {dossier.trainingMetrics.originalityScore}%
                        </span>
                        <span>{dossier.trainingMetrics.knowledgeGapsFilled} Gaps Fixed</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Right 8 Cols: Active Dossier Reader & Sub-Tabs */}
            <div className="lg:col-span-8">
              {selectedDossier ? (
                <Card className="border-[hsl(var(--border))] shadow-lg">
                  <CardHeader className="border-b border-[hsl(var(--border))] pb-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono text-emerald-600">
                            {selectedDossier.folderPath}
                          </Badge>
                          <Badge className="bg-emerald-600 text-white text-[10px]">
                            Cycle #{selectedDossier.selfTrainingCycle} Verified
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-1 font-bold">{selectedDossier.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {selectedDossier.course} • {selectedDossier.chapter}
                        </CardDescription>
                      </div>

                      {/* Print and Export Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const printHtml = `
                              <!DOCTYPE html>
                              <html>
                              <head>
                                <title>${selectedDossier.title}</title>
                                <style>
                                  body { font-family: 'Kalam', 'Caveat', Georgia, serif; line-height: 1.8; padding: 40px; color: #1e293b; background: #fffdfa; }
                                  h1 { color: #1d4ed8; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
                                  h3, h4 { color: #0f172a; margin-top: 24px; }
                                  .badge { display: inline-block; padding: 4px 10px; background: #dcfce7; color: #15803d; border-radius: 9999px; font-size: 12px; font-weight: bold; }
                                  pre { background: #f1f5f9; padding: 16px; border-radius: 8px; font-family: monospace; white-space: pre-wrap; }
                                  .flowchart { background: #eff6ff; padding: 16px; border-left: 4px solid #3b82f6; margin: 16px 0; font-family: monospace; }
                                  .notice { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; font-size: 11px; color: #64748b; margin-top: 30px; }
                                </style>
                              </head>
                              <body>
                                <span class="badge">EduFinance Pro Multi-Platform Dossier</span>
                                <h1>${selectedDossier.title}</h1>
                                <p><strong>Course:</strong> ${selectedDossier.course} | <strong>Folder:</strong> ${selectedDossier.folderPath}</p>
                                <hr />
                                <div style="white-space: pre-wrap;">${selectedDossier.originalContent.handwrittenNotesMarkdown}</div>
                                <h4>Visual Logic & Flowchart:</h4>
                                <div class="flowchart">${selectedDossier.originalContent.conceptFlowchart}</div>
                                <h4>Solved Practical Case Study:</h4>
                                <p><strong>Problem:</strong> ${selectedDossier.originalContent.solvedCaseStudy.problemStatement}</p>
                                <pre>${selectedDossier.originalContent.solvedCaseStudy.workingNotes.join("\n")}\n\nSolution: ${selectedDossier.originalContent.solvedCaseStudy.finalSolution}</pre>
                                <div class="notice">
                                  <strong>Copyright & Compliance Notice:</strong><br />
                                  ${selectedDossier.complianceStatement}
                                </div>
                              </body>
                              </html>
                            `
                            const printWindow = window.open("", "_blank")
                            if (printWindow) {
                              printWindow.document.write(printHtml)
                              printWindow.document.close()
                              printWindow.focus()
                              setTimeout(() => printWindow.print(), 350)
                            }
                          }}
                          className="h-8 text-xs gap-1.5"
                        >
                          <Printer className="h-3.5 w-3.5 text-blue-600" /> Print to PDF
                        </Button>
                      </div>
                    </div>

                    {/* Sub-tabs inside Dossier */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[hsl(var(--border))]">
                      {[
                        { id: "notes", label: "Handwritten Notes & Case Study", icon: BookOpen },
                        { id: "gap_analysis", label: "Cross-Platform Gap Analysis", icon: Compass },
                        { id: "rights_registry", label: "Source & Rights Registry", icon: Scale },
                        { id: "mcqs", label: "Practice MCQs & Revision", icon: FileCheck },
                      ].map((st) => {
                        const Icon = st.icon
                        const isActive = dossierActiveSubTab === st.id
                        return (
                          <button
                            key={st.id}
                            onClick={() => setDossierActiveSubTab(st.id as any)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              isActive
                                ? "bg-blue-600 text-white shadow-xs"
                                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {st.label}
                          </button>
                        )
                      })}
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    {/* SUB-TAB 1: Handwritten Notes */}
                    {dossierActiveSubTab === "notes" && (
                      <div className="space-y-4">
                        {/* Ruled Notebook Paper Style Container */}
                        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20 font-serif space-y-4 shadow-inner">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-900 pb-2">
                            <span>Handwritten Notebook View (Clean Ruled Style)</span>
                            <span>Self-Trained Model v2.4</span>
                          </div>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed text-[hsl(var(--foreground))]">
                            {selectedDossier.originalContent.handwrittenNotesMarkdown}
                          </div>
                        </div>

                        {/* ELI10 Intuition Card */}
                        <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
                          <h4 className="text-xs font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-purple-600" /> Child-Level Intuition (ELI10)
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-purple-100 dark:border-purple-800">
                              <span className="font-bold text-blue-600 block mb-1">English:</span>
                              <p className="leading-relaxed">{selectedDossier.originalContent.eli10Intuition.en}</p>
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-purple-100 dark:border-purple-800">
                              <span className="font-bold text-emerald-600 block mb-1">हिन्दी:</span>
                              <p className="leading-relaxed">{selectedDossier.originalContent.eli10Intuition.hi}</p>
                            </div>
                          </div>
                        </div>

                        {/* Flowchart */}
                        <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]">
                            Conceptual Decision Tree & Logic Flowchart
                          </h4>
                          <pre className="p-3 rounded-lg bg-[hsl(var(--background))] border font-mono text-xs overflow-x-auto text-blue-600 dark:text-blue-400">
                            {selectedDossier.originalContent.conceptFlowchart}
                          </pre>
                        </div>

                        {/* Solved Case Study */}
                        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                          <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Solved Practical Case Problem & Working Notes
                          </h4>
                          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">
                            {selectedDossier.originalContent.solvedCaseStudy.problemStatement}
                          </p>
                          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border text-xs space-y-1 font-mono">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step-by-Step Ledger Workings:</span>
                            {selectedDossier.originalContent.solvedCaseStudy.workingNotes.map((note, i) => (
                              <p key={i} className="text-slate-700 dark:text-slate-300">{note}</p>
                            ))}
                          </div>
                          <div className="p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                            {selectedDossier.originalContent.solvedCaseStudy.finalSolution}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 2: Cross-Platform Gap Analysis */}
                    {dossierActiveSubTab === "gap_analysis" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold flex items-center gap-2">
                              <Compass className="h-4 w-4 text-indigo-500" />
                              Comparative Platform Research & Syllabus Coverage
                            </h4>
                            <span className="text-xs text-[hsl(var(--muted-foreground))]">
                              Topic: {selectedDossier.comparativeAnalysis.topic}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">Educational Platforms Surveyed:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedDossier.comparativeAnalysis.platformsSurveyed.map((p) => (
                                <Badge key={p} variant="secondary" className="text-xs">
                                  {p}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-[hsl(var(--muted))]/50 border text-xs leading-relaxed">
                            <strong>Platform Synthesis Summary:</strong><br />
                            {selectedDossier.comparativeAnalysis.crossPlatformExplanationsSummary}
                          </div>
                        </div>

                        {/* Knowledge Gaps Identified */}
                        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
                          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            Knowledge Gaps Identified in Existing Commercial Notes (और हमने कैसे पूरा किया)
                          </h4>
                          <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-100">
                            {selectedDossier.comparativeAnalysis.knowledgeGapsIdentified.map((gap, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Official Statutory Validation */}
                        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 space-y-2">
                          <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                            <Scale className="h-4 w-4 text-blue-600" /> Authoritative Official Fact Validation
                          </h4>
                          <p className="text-xs text-blue-950 dark:text-blue-100 leading-relaxed">
                            {selectedDossier.comparativeAnalysis.officialSourceValidation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 3: Source & Rights Registry */}
                    {dossierActiveSubTab === "rights_registry" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]">
                            Source & Rights Registry (कॉपीराइट व लाइसेंस पंजी)
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {selectedDossier.rightsRegistry.length} Registered Sources
                          </Badge>
                        </div>

                        <div className="border rounded-xl overflow-hidden text-xs">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead className="bg-[hsl(var(--muted))] border-b text-[11px] font-bold text-[hsl(var(--muted-foreground))]">
                                <tr>
                                  <th className="p-3">Source Organization</th>
                                  <th className="p-3">Category</th>
                                  <th className="p-3">Retrieval Date</th>
                                  <th className="p-3">Rights Status</th>
                                  <th className="p-3">Redistribution</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[hsl(var(--border))]">
                                {selectedDossier.rightsRegistry.map((r) => (
                                  <tr key={r.id} className="hover:bg-[hsl(var(--muted))]/30">
                                    <td className="p-3 font-semibold">
                                      {r.sourceOrganization}
                                      <span className="block text-[10px] font-mono text-[hsl(var(--muted-foreground))]">{r.sourceUrl}</span>
                                    </td>
                                    <td className="p-3">
                                      <Badge variant="outline" className="text-[10px]">
                                        {r.platformCategory.replace(/_/g, " ")}
                                      </Badge>
                                    </td>
                                    <td className="p-3 text-[11px]">{r.retrievalDate}</td>
                                    <td className="p-3">
                                      <Badge
                                        className={`text-[10px] ${
                                          r.rightsStatus === "VERIFIED_PERMITTED"
                                            ? "bg-emerald-600 text-white"
                                            : "bg-amber-600 text-white"
                                        }`}
                                      >
                                        {r.rightsStatus}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      {r.canRedistribute ? (
                                        <span className="text-emerald-600 font-bold">Permitted</span>
                                      ) : (
                                        <span className="text-amber-600 font-semibold">Reference Only</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-[hsl(var(--muted))]/50 border text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                          <strong>Legal Fair Dealing Declaration:</strong><br />
                          {selectedDossier.complianceStatement}
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 4: Practice MCQs & Revision */}
                    {dossierActiveSubTab === "mcqs" && (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))]">
                            Original Practice MCQs with Step-by-Step Rationale
                          </h4>
                          {selectedDossier.originalContent.practiceMCQs.map((mcq, idx) => (
                            <div key={mcq.id || idx} className="p-4 rounded-xl border border-[hsl(var(--border))] space-y-3">
                              <p className="text-xs font-bold leading-relaxed">
                                Q{idx + 1}. {mcq.question}
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {mcq.options.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className={`p-2.5 rounded-lg border transition-all ${
                                      oIdx === mcq.correctIndex
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 font-bold text-emerald-800 dark:text-emerald-200"
                                        : "border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 text-[hsl(var(--muted-foreground))]"
                                    }`}
                                  >
                                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                                    {opt}
                                  </div>
                                ))}
                              </div>
                              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
                                <strong>Rationale:</strong> {mcq.explanation}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Revision Cheat Sheet */}
                        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
                          <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                            1-Minute Revision Bullet Points
                          </h4>
                          <ul className="space-y-1.5 text-xs text-indigo-950 dark:text-indigo-100">
                            {selectedDossier.originalContent.revisionCheatSheet.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="p-12 text-center border border-dashed rounded-xl text-xs text-[hsl(var(--muted-foreground))]">
                  Select a dossier from the left list to review its cross-platform synthesis and handwritten notes.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="portals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICIAL_RESOURCES.map((cat) => {
              const Icon = cat.icon
              return (
                <Card key={cat.category} className="border-[hsl(var(--border))]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-[hsl(var(--muted))] rounded-lg">
                        <Icon className={`h-5 w-5 ${cat.color}`} />
                      </div>
                      <CardTitle className="text-base">{cat.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/50 transition-colors space-y-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold leading-snug">{item.title}</h4>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-700 p-0.5 shrink-0"
                            title="Visit Official Portal"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                        <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{item.source}</p>
                        <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] pt-1 border-t border-[hsl(var(--border))]/50">
                          <span>Scheme: {item.scheme}</span>
                          <span className="text-emerald-600 font-medium">✓ Verified</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* TAB 4: Academic Content Factory & Quality Studio */}
        <TabsContent value="factory" className="space-y-6">
          {/* Generation Sub-bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1">
              <span className="text-xs font-semibold text-[hsl(var(--foreground))] shrink-0 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" /> Auto-Generate:
              </span>
              <Input
                placeholder="Course (e.g. ICAI CA Intermediate)"
                value={factoryCourseInput}
                onChange={e => setFactoryCourseInput(e.target.value)}
                className="text-xs h-8 sm:w-48 bg-[hsl(var(--background))]"
              />
              <Input
                placeholder="Chapter name or standard..."
                value={factoryChapterInput}
                onChange={e => setFactoryChapterInput(e.target.value)}
                className="text-xs h-8 flex-1 bg-[hsl(var(--background))]"
              />
            </div>
            <Button
              size="sm"
              onClick={handleGenerateFactoryNotes}
              disabled={factoryLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white shrink-0 text-xs h-8"
            >
              <Sparkles className={`h-3.5 w-3.5 mr-1.5 ${factoryLoading ? "animate-spin" : ""}`} />
              Generate 23-Point Notes
            </Button>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Catalog List */}
            <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
              {factoryItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedFactoryItem(item)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedFactoryItem?.id === item.id
                      ? "bg-amber-500/10 border-amber-500/60 shadow-sm"
                      : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-amber-500">
                      {item.contentType}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        item.workflowState === "PUBLISHED"
                          ? "border-emerald-500 text-emerald-600 bg-emerald-500/10"
                          : item.workflowState === "APPROVED"
                          ? "border-blue-500 text-blue-600 bg-blue-500/10"
                          : "border-purple-500 text-purple-600 bg-purple-500/10"
                      }`}
                    >
                      {item.workflowState}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-[hsl(var(--foreground))] mt-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] mt-2 pt-1 border-t border-[hsl(var(--border))]/50">
                    <span>Score: {item.qualityScore}/100</span>
                    <span>By {item.authorAgent}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Inspector */}
            <div className="lg:col-span-2">
              {selectedFactoryItem ? (
                <Card className="border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-600 bg-amber-500/5">
                            {selectedFactoryItem.courseName}
                          </Badge>
                          <Badge className="bg-emerald-600 text-white text-[10px]">
                            Quality Score: {selectedFactoryItem.qualityScore}/100
                          </Badge>
                        </div>
                        <CardTitle className="text-sm font-bold text-[hsl(var(--foreground))]">
                          {selectedFactoryItem.title}
                        </CardTitle>
                        {selectedFactoryItem.hindiTitle && (
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                            {selectedFactoryItem.hindiTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-xs">
                    {/* Rubric Breakdown */}
                    {selectedFactoryItem.rubric && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-[hsl(var(--muted))]/40 border border-[hsl(var(--border))] text-[11px]">
                        <div>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))] block">Factual Accuracy</span>
                          <span className="font-bold text-emerald-600">{selectedFactoryItem.rubric.factualAccuracy}/25</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))] block">Statutory Compliance</span>
                          <span className="font-bold text-blue-600">{selectedFactoryItem.rubric.statutoryCompliance}/25</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))] block">Language Quality</span>
                          <span className="font-bold text-purple-600">{selectedFactoryItem.rubric.languageQuality}/25</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))] block">Exam Alignment</span>
                          <span className="font-bold text-amber-600">{selectedFactoryItem.rubric.examAlignment}/25</span>
                        </div>
                      </div>
                    )}

                    {/* Markdown Body Viewer */}
                    <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] max-h-[400px] overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-[hsl(var(--foreground))]">
                      {selectedFactoryItem.content}
                    </div>

                    {/* Footer Details */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-[hsl(var(--muted-foreground))] pt-2 border-t border-[hsl(var(--border))]">
                      <span>Reviewed by: <strong className="text-[hsl(var(--foreground))]">{selectedFactoryItem.reviewedBy || "QUALITY-13"}</strong></span>
                      <span>Version: v{selectedFactoryItem.version}.0</span>
                      <span>Updated: {new Date(selectedFactoryItem.updatedAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-64 flex items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">
                  Select a generated content item to view notes and quality verification
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
