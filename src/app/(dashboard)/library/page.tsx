"use client"

import { useState } from "react"
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
  Globe
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SAMPLE_STUDY_PACKAGES, ChapterStudyPackage, StudyResourceItem, NoteVisualStyle } from "@/data/studyPackagesData"
import { openPrintableResource } from "@/lib/pdf/handwrittenGenerator"
import { createZipBlob, triggerDownload, ZipFileEntry } from "@/lib/utils/zipBuilder"

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
  const [activeTab, setActiveTab] = useState<"packages" | "portals">("packages")
  const [packages, setPackages] = useState<ChapterStudyPackage[]>(SAMPLE_STUDY_PACKAGES)
  const [selectedPkg, setSelectedPkg] = useState<ChapterStudyPackage>(packages[0])
  const [previewResource, setPreviewResource] = useState<StudyResourceItem | null>(selectedPkg.resources[0])
  const [styleFilter, setStyleFilter] = useState<string>("all")
  const [isZipping, setIsZipping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
          <TabsTrigger value="portals" className="gap-2 text-xs">
            <Globe className="h-3.5 w-3.5 text-indigo-500" /> Official Regulatory Portals & Statutes
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

        {/* TAB 2: Official Regulatory Portals (Preserved) */}
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
      </Tabs>
    </div>
  )
}
