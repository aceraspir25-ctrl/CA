"use client"

import { useState } from "react"
import { KNOWLEDGE_GRAPH_NODES, GraphNode } from "@/data/knowledgeGraphData"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Network, ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function KnowledgeGraph() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeNode, setActiveNode] = useState<GraphNode>(KNOWLEDGE_GRAPH_NODES[0])

  const filteredNodes = selectedCategory === "all"
    ? KNOWLEDGE_GRAPH_NODES
    : KNOWLEDGE_GRAPH_NODES.filter(n => n.category === selectedCategory)

  const relatedNodes = activeNode.relatedNodeIds
    .map(id => KNOWLEDGE_GRAPH_NODES.find(n => n.id === id))
    .filter(Boolean) as GraphNode[]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-500" />
            Interactive Commerce Knowledge Graph
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Visualize how concepts across Accounting, Taxation, Corporate Law, Costing and Finance interconnect. Click any node to explore.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Subjects" },
            { id: "accounting", label: "Accounting", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" },
            { id: "taxation", label: "Taxation", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
            { id: "law", label: "Corporate Law", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300" },
            { id: "costing", label: "Costing", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
            { id: "finance", label: "Financial Mgmt", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Canvas / Node Matrix */}
        <Card className="lg:col-span-2 border-[hsl(var(--border))] bg-gradient-to-br from-slate-50 via-slate-100/50 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900/40 dark:to-indigo-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))]">
              <span>Showing {filteredNodes.length} Core Concept Nodes</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Active: <strong className="text-[hsl(var(--foreground))]">{activeNode.label}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredNodes.map((node) => {
                const isActive = activeNode.id === node.id
                const isRelated = activeNode.relatedNodeIds.includes(node.id)

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`text-left p-3.5 rounded-xl border transition-all relative ${
                      isActive
                        ? "border-indigo-600 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-900 shadow-md scale-[1.02]"
                        : isRelated
                        ? "border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20"
                        : "border-[hsl(var(--border))] bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-semibold capitalize"
                        style={{ borderColor: node.color, color: node.color }}
                      >
                        {node.category}
                      </Badge>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[hsl(var(--muted))]">
                        Lvl {node.level}
                      </span>
                    </div>

                    <h4 className="font-semibold text-xs text-[hsl(var(--foreground))] line-clamp-1">{node.label}</h4>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2 mt-1 leading-snug">
                      {node.summary}
                    </p>

                    {isRelated && !isActive && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-bold shadow">
                        Linked
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Node Deep Inspector */}
        <Card className="border-[hsl(var(--border))] flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-1">
              <Badge
                className="text-white text-xs"
                style={{ backgroundColor: activeNode.color }}
              >
                {activeNode.category.toUpperCase()}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Mastery Level: {activeNode.level} / 100
              </Badge>
            </div>
            <CardTitle className="text-lg">{activeNode.label}</CardTitle>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              {activeNode.hindiSummary}
            </p>
          </CardHeader>

          <CardContent className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-[hsl(var(--muted))] space-y-1">
              <p className="font-semibold text-[hsl(var(--foreground))]">Core Definition:</p>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                {activeNode.summary}
              </p>
            </div>

            {/* Related Concept Links */}
            <div className="space-y-2">
              <p className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-1">
                <Network className="h-3.5 w-3.5 text-indigo-500" />
                Interconnected Concepts:
              </p>
              <div className="space-y-1.5">
                {relatedNodes.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => setActiveNode(rel)}
                    className="w-full text-left p-2 rounded-lg border border-[hsl(var(--border))] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{rel.label}</span>
                    <ArrowRight className="h-3 w-3 text-indigo-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button asChild className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-xs">
                <Link href={`/ai-tutor`}>
                  <Sparkles className="h-3.5 w-3.5" /> Study with AI Tutor
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full gap-2 text-xs">
                <Link href={`/tests`}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> Test My Knowledge on this
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

