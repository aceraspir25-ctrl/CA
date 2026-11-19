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
  GraduationCap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Library className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Central Statutory & Reference Library</h1>
            <Badge className="bg-blue-500 text-white">Authoritative Sources</Badge>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl">
            Verified official acts, Accounting Standards (Ind AS), Auditing Standards (SA), Cost Standards (CAS), and direct institutional links for ICAI, ICMAI, ICSI, and PRSU.
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search standards, acts, rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-slate-400 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {OFFICIAL_RESOURCES.map((section) => {
          const Icon = section.icon
          const filteredItems = section.items.filter(
            (i) =>
              i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              i.scheme.toLowerCase().includes(searchQuery.toLowerCase()) ||
              i.source.toLowerCase().includes(searchQuery.toLowerCase())
          )

          if (filteredItems.length === 0) return null

          return (
            <div key={section.category} className="space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Icon className={`h-5 w-5 ${section.color}`} />
                {section.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item, idx) => (
                  <Card key={idx} className="border-[hsl(var(--border))] hover:border-blue-400 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="font-medium text-[10px]">
                          {item.scheme}
                        </Badge>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Verified: {item.verified}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-bold mt-1.5">{item.title}</CardTitle>
                      <CardDescription className="text-xs">{item.source}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Access Official Study Material <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
