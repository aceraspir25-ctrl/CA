"use client"

import { useState } from "react"
import {
  FlaskConical,
  Calculator,
  TrendingUp,
  Receipt,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  PlusCircle,
  Trash2,
  DollarSign,
  Scale
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- STOCKS FOR TRADING LAB ---
const MOCK_STOCKS = [
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", price: 3950, change: "+1.2%", pe: 29.4, roe: "48%" },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2940, change: "+0.8%", pe: 26.1, roe: "12.5%" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1680, change: "-0.4%", pe: 18.2, roe: "16.8%" },
  { symbol: "INFY", name: "Infosys Ltd", price: 1720, change: "+2.1%", pe: 25.8, roe: "31.2%" },
  { symbol: "ITC", name: "ITC Ltd", price: 460, change: "+0.3%", pe: 27.5, roe: "29.1%" },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", price: 155, change: "-1.1%", pe: 38.0, roe: "8.2%" },
]

export default function LabPage() {
  const { virtualCash, portfolio, transactions, executeTrade } = useAppStore()

  // 1. Accounting Lab State
  const [entries, setEntries] = useState([
    { id: "e1", debitAccount: "Cash / Bank A/c", creditAccount: "Capital A/c", amount: 500000, narration: "Capital introduced by owner" },
    { id: "e2", debitAccount: "Furniture A/c", creditAccount: "Bank A/c", amount: 50000, narration: "Office furniture purchased" },
    { id: "e3", debitAccount: "Purchases A/c", creditAccount: "Creditors A/c", amount: 120000, narration: "Goods bought on credit" },
  ])
  const [debitAcc, setDebitAcc] = useState("")
  const [creditAcc, setCreditAcc] = useState("")
  const [entryAmt, setEntryAmt] = useState("")
  const [entryNarration, setEntryNarration] = useState("")

  const handleAddEntry = () => {
    if (!debitAcc || !creditAcc || !entryAmt) return
    setEntries([
      ...entries,
      {
        id: `e-${Date.now()}`,
        debitAccount: debitAcc,
        creditAccount: creditAcc,
        amount: Number(entryAmt),
        narration: entryNarration || "Transaction recorded",
      },
    ])
    setDebitAcc("")
    setCreditAcc("")
    setEntryAmt("")
    setEntryNarration("")
  }

  const totalJournalAmount = entries.reduce((sum, e) => sum + e.amount, 0)

  // 2. Taxation Lab State
  const [grossSalary, setGrossSalary] = useState<number>(1200000)
  const [sec80C, setSec80C] = useState<number>(150000)
  const [sec80D, setSec80D] = useState<number>(25000)
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(50000)

  // Calculate Tax under Old vs New Regime
  const oldStdDeduction = 50000
  const oldDeductions = Math.min(sec80C, 150000) + Math.min(sec80D, 50000) + Math.min(homeLoanInterest, 200000)
  const oldNetTaxable = Math.max(0, grossSalary - oldStdDeduction - oldDeductions)

  // Old Regime Tax Calculation
  let oldTax = 0
  if (oldNetTaxable > 1000000) {
    oldTax = 112500 + (oldNetTaxable - 1000000) * 0.30
  } else if (oldNetTaxable > 500000) {
    oldTax = 12500 + (oldNetTaxable - 500000) * 0.20
  } else if (oldNetTaxable > 250000) {
    oldTax = (oldNetTaxable - 250000) * 0.05
  }
  // 87A Rebate for Old Regime (up to 5L)
  if (oldNetTaxable <= 500000) oldTax = 0
  const oldTaxTotal = Math.round(oldTax * 1.04) // with 4% cess

  // New Regime Calculation (Section 115BAC - Budget 2024 update)
  const newStdDeduction = 75000
  const newNetTaxable = Math.max(0, grossSalary - newStdDeduction)

  let newTax = 0
  if (newNetTaxable > 1500000) {
    newTax = 140000 + (newNetTaxable - 1500000) * 0.30
  } else if (newNetTaxable > 1200000) {
    newTax = 80000 + (newNetTaxable - 1200000) * 0.20
  } else if (newNetTaxable > 1000000) {
    newTax = 50000 + (newNetTaxable - 1000000) * 0.15
  } else if (newNetTaxable > 700000) {
    newTax = 20000 + (newNetTaxable - 700000) * 0.10
  } else if (newNetTaxable > 300000) {
    newTax = (newNetTaxable - 300000) * 0.05
  }
  // 87A Rebate for New Regime (up to 7L)
  if (newNetTaxable <= 700000) newTax = 0
  const newTaxTotal = Math.round(newTax * 1.04)

  const taxDifference = Math.abs(oldTaxTotal - newTaxTotal)
  const betterRegime = newTaxTotal <= oldTaxTotal ? "New Tax Regime (Section 115BAC)" : "Old Tax Regime"

  // 3. Stock Market Lab State
  const [selectedStock, setSelectedStock] = useState(MOCK_STOCKS[0])
  const [tradeShares, setTradeShares] = useState(10)
  const [tradeStatus, setTradeStatus] = useState<string | null>(null)

  const handleStockTrade = (type: "BUY" | "SELL") => {
    const res = executeTrade(selectedStock.symbol, selectedStock.name, type, Number(tradeShares), selectedStock.price)
    setTradeStatus(res.message)
    setTimeout(() => setTradeStatus(null), 5000)
  }

  // Calculate portfolio totals
  const totalStockValue = portfolio.reduce((sum, h) => sum + h.shares * h.currentPrice, 0)
  const totalInvested = portfolio.reduce((sum, h) => sum + h.shares * h.avgPrice, 0)
  const totalProfitLoss = totalStockValue - totalInvested
  const totalProfitLossPct = totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(2) : "0.00"

  // 4. Costing & BEP Lab State
  const [fixedCost, setFixedCost] = useState(250000)
  const [sellingPrice, setSellingPrice] = useState(100)
  const [variableCost, setVariableCost] = useState(60)

  const contributionPerUnit = sellingPrice - variableCost
  const pvRatio = sellingPrice > 0 ? ((contributionPerUnit / sellingPrice) * 100).toFixed(1) : "0"
  const bepUnits = contributionPerUnit > 0 ? Math.round(fixedCost / contributionPerUnit) : 0
  const bepSalesValue = pvRatio !== "0" ? Math.round(fixedCost / (Number(pvRatio) / 100)) : 0

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <FlaskConical className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Practical Learning Labs</h1>
            <Badge className="bg-white/20 text-white border-white/30">Hands-on Simulations</Badge>
          </div>
          <p className="text-orange-100 text-sm max-w-2xl">
            Simulate real-world accounting entries, calculate Income Tax under Section 115BAC, trade with ₹10,00,000 virtual capital, and compute Break-Even points.
          </p>
        </div>
      </div>

      {/* Lab Tabs */}
      <Tabs defaultValue="accounting" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-[hsl(var(--muted))] p-1">
          <TabsTrigger value="accounting" className="gap-2">
            <BookOpen className="h-4 w-4 text-blue-500" /> Accounting Lab
          </TabsTrigger>
          <TabsTrigger value="taxation" className="gap-2">
            <Receipt className="h-4 w-4 text-emerald-500" /> Taxation Lab
          </TabsTrigger>
          <TabsTrigger value="stock" className="gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-500" /> Stock Market Lab
          </TabsTrigger>
          <TabsTrigger value="costing" className="gap-2">
            <Calculator className="h-4 w-4 text-amber-500" /> Costing & BEP Lab
          </TabsTrigger>
        </TabsList>

        {/* 1. ACCOUNTING LAB */}
        <TabsContent value="accounting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Interactive Journal Entry Form */}
            <Card className="border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Scale className="h-4 w-4 text-blue-500" /> Post Journal Entry
                </CardTitle>
                <CardDescription>
                  Apply the 3 Golden Rules: Debit what comes in, Credit what goes out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Debit Account (Dr.)</label>
                  <Input
                    placeholder="e.g. Bank A/c, Machinery A/c, Rent A/c"
                    value={debitAcc}
                    onChange={(e) => setDebitAcc(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Credit Account (Cr.)</label>
                  <Input
                    placeholder="e.g. Cash A/c, Sales A/c, Capital A/c"
                    value={creditAcc}
                    onChange={(e) => setCreditAcc(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    value={entryAmt}
                    onChange={(e) => setEntryAmt(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Narration</label>
                  <Input
                    placeholder="(Being goods purchased for cash...)"
                    value={entryNarration}
                    onChange={(e) => setEntryNarration(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddEntry} className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="h-4 w-4" /> Record in Journal
                </Button>
              </CardContent>
            </Card>

            {/* Right: Live Journal Book & Trial Balance Balance Check */}
            <Card className="lg:col-span-2 border-[hsl(var(--border))]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base">Journal Book & Trial Balance Equality</CardTitle>
                  <CardDescription>Total Debits must always equal Total Credits in Double-Entry.</CardDescription>
                </div>
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Balanced: ₹{totalJournalAmount.toLocaleString("en-IN")}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] uppercase font-semibold">
                      <tr>
                        <th className="p-3">Particulars (Double Entry)</th>
                        <th className="p-3 text-right">Debit (₹)</th>
                        <th className="p-3 text-right">Credit (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(var(--border))]">
                      {entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-[hsl(var(--muted))]/50">
                          <td className="p-3 space-y-1">
                            <p className="font-semibold">{entry.debitAccount} <span className="text-blue-600 font-bold">Dr.</span></p>
                            <p className="pl-4 text-[hsl(var(--muted-foreground))]">To {entry.creditAccount}</p>
                            <p className="text-[11px] italic text-[hsl(var(--muted-foreground))]">({entry.narration})</p>
                          </td>
                          <td className="p-3 text-right font-mono font-medium">{entry.amount.toLocaleString("en-IN")}</td>
                          <td className="p-3 text-right font-mono font-medium">{entry.amount.toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[hsl(var(--muted))] font-bold text-xs border-t border-[hsl(var(--border))]">
                      <tr>
                        <td className="p-3">TOTAL (TRIAL BALANCE SUM)</td>
                        <td className="p-3 text-right font-mono text-blue-600">₹{totalJournalAmount.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-blue-600">₹{totalJournalAmount.toLocaleString("en-IN")}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. TAXATION LAB */}
        <TabsContent value="taxation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Controls */}
            <Card className="border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-emerald-500" /> Income & Deduction Inputs
                </CardTitle>
                <CardDescription>Section 115BAC vs Old Tax Regime Calculator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold">Gross Annual Salary (₹)</label>
                  <Input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Section 80C Deductions (Max ₹1.5L)</label>
                  <Input
                    type="number"
                    value={sec80C}
                    onChange={(e) => setSec80C(Number(e.target.value))}
                  />
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">PPF, EPF, ELSS, Life Insurance</p>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Section 80D Health Insurance (₹)</label>
                  <Input
                    type="number"
                    value={sec80D}
                    onChange={(e) => setSec80D(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Home Loan Interest (Sec 24b)</label>
                  <Input
                    type="number"
                    value={homeLoanInterest}
                    onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Comparison Cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Old Regime Card */}
                <Card className={`border-2 ${betterRegime.includes("Old") ? "border-emerald-500" : "border-[hsl(var(--border))]"}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Old Tax Regime</CardTitle>
                      {betterRegime.includes("Old") && <Badge variant="success">Recommended</Badge>}
                    </div>
                    <CardDescription>Allows all Chapter VI-A deductions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-[hsl(var(--border))]">
                      <span>Standard Deduction:</span>
                      <span className="font-mono">₹50,000</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[hsl(var(--border))]">
                      <span>Total Chapter VI-A Deductions:</span>
                      <span className="font-mono">₹{oldDeductions.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[hsl(var(--border))]">
                      <span>Net Taxable Income:</span>
                      <span className="font-mono font-semibold">₹{oldNetTaxable.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-[hsl(var(--muted))] px-3 rounded-lg font-bold text-sm">
                      <span>Total Tax (inc 4% Cess):</span>
                      <span className="font-mono text-rose-600 dark:text-rose-400">₹{oldTaxTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* New Regime Card */}
                <Card className={`border-2 ${betterRegime.includes("New") ? "border-emerald-500" : "border-[hsl(var(--border))]"}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">New Regime (Sec 115BAC)</CardTitle>
                      {betterRegime.includes("New") && <Badge variant="success">Recommended (Save ₹{taxDifference.toLocaleString("en-IN")})</Badge>}
                    </div>
                    <CardDescription>Concessional tax slabs + ₹75,000 Standard Deduction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-[hsl(var(--border))]">
                      <span>Standard Deduction (Budget 2024):</span>
                      <span className="font-mono">₹75,000</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[hsl(var(--border))]">
                      <span>Exemptions & Deductions:</span>
                      <span className="font-mono text-[hsl(var(--muted-foreground))]">Nil (Not Allowed)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[hsl(var(--border))]">
                      <span>Net Taxable Income:</span>
                      <span className="font-mono font-semibold">₹{newNetTaxable.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-[hsl(var(--muted))] px-3 rounded-lg font-bold text-sm">
                      <span>Total Tax (inc 4% Cess):</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">₹{newTaxTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendation Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    Optimal Choice: {betterRegime}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    You save <strong>₹{taxDifference.toLocaleString("en-IN")}</strong> by selecting this regime for your gross salary of ₹{grossSalary.toLocaleString("en-IN")}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 3. STOCK MARKET LAB */}
        <TabsContent value="stock" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-[hsl(var(--border))]">
              <CardContent className="p-4">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Virtual Available Cash</p>
                <p className="text-xl font-bold font-mono text-emerald-600">₹{virtualCash.toLocaleString("en-IN")}</p>
              </CardContent>
            </Card>
            <Card className="border-[hsl(var(--border))]">
              <CardContent className="p-4">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Portfolio Stock Value</p>
                <p className="text-xl font-bold font-mono text-blue-600">₹{totalStockValue.toLocaleString("en-IN")}</p>
              </CardContent>
            </Card>
            <Card className="border-[hsl(var(--border))]">
              <CardContent className="p-4">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Unrealized P&L</p>
                <p className={`text-xl font-bold font-mono ${totalProfitLoss >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {totalProfitLoss >= 0 ? "+" : ""}₹{totalProfitLoss.toLocaleString("en-IN")} ({totalProfitLossPct}%)
                </p>
              </CardContent>
            </Card>
            <Card className="border-[hsl(var(--border))]">
              <CardContent className="p-4">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Account Value</p>
                <p className="text-xl font-bold font-mono text-indigo-600">₹{(virtualCash + totalStockValue).toLocaleString("en-IN")}</p>
              </CardContent>
            </Card>
          </div>

          {tradeStatus && (
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200 border border-indigo-200 text-xs font-medium">
              {tradeStatus}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Quotes Board */}
            <Card className="lg:col-span-2 border-[hsl(var(--border))]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">NIFTY Blue Chips Live Market (Simulated)</CardTitle>
                <CardDescription>Click any stock to buy or sell using your simulated ₹10,00,000 capital.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] uppercase font-semibold">
                      <tr>
                        <th className="p-3">Symbol / Company</th>
                        <th className="p-3 text-right">Price (₹)</th>
                        <th className="p-3 text-right">Change</th>
                        <th className="p-3 text-right">P/E Ratio</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(var(--border))]">
                      {MOCK_STOCKS.map((stock) => (
                        <tr
                          key={stock.symbol}
                          onClick={() => setSelectedStock(stock)}
                          className={`cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 ${selectedStock.symbol === stock.symbol ? "bg-indigo-50 dark:bg-indigo-950/40 font-semibold" : ""}`}
                        >
                          <td className="p-3">
                            <p className="font-bold text-[hsl(var(--foreground))]">{stock.symbol}</p>
                            <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{stock.name}</p>
                          </td>
                          <td className="p-3 text-right font-mono font-semibold">₹{stock.price.toLocaleString("en-IN")}</td>
                          <td className={`p-3 text-right font-mono ${stock.change.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                            {stock.change}
                          </td>
                          <td className="p-3 text-right font-mono">{stock.pe}</td>
                          <td className="p-3 text-right">
                            <Button size="sm" variant="outline" className="text-[10px] h-7">Trade</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Trade Execution Panel */}
            <Card className="border-[hsl(var(--border))]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Order Execution: {selectedStock.symbol}</CardTitle>
                <CardDescription>Current Price: ₹{selectedStock.price.toLocaleString("en-IN")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold">Number of Shares</label>
                  <Input
                    type="number"
                    min="1"
                    value={tradeShares}
                    onChange={(e) => setTradeShares(Math.max(1, Number(e.target.value)))}
                  />
                </div>
                <div className="p-3 rounded-lg bg-[hsl(var(--muted))] space-y-1">
                  <div className="flex justify-between">
                    <span>Order Value:</span>
                    <span className="font-mono font-bold">₹{(tradeShares * selectedStock.price).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[hsl(var(--muted-foreground))]">
                    <span>Available Cash:</span>
                    <span>₹{virtualCash.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button onClick={() => handleStockTrade("BUY")} className="bg-emerald-600 hover:bg-emerald-700">
                    BUY ({selectedStock.symbol})
                  </Button>
                  <Button onClick={() => handleStockTrade("SELL")} variant="destructive">
                    SELL ({selectedStock.symbol})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 4. COSTING & BREAK-EVEN LAB */}
        <TabsContent value="costing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-amber-500" /> Cost & Revenue Variables
                </CardTitle>
                <CardDescription>Marginal Costing & Break-Even Analysis Engine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold">Total Fixed Costs (₹)</label>
                  <Input
                    type="number"
                    value={fixedCost}
                    onChange={(e) => setFixedCost(Number(e.target.value))}
                  />
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Rent, Salaries, Insurance</p>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Selling Price per Unit (₹)</label>
                  <Input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Variable Cost per Unit (₹)</label>
                  <Input
                    type="number"
                    value={variableCost}
                    onChange={(e) => setVariableCost(Number(e.target.value))}
                  />
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Raw material, direct wages</p>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-[hsl(var(--border))] bg-amber-50/50 dark:bg-amber-950/20 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-base text-amber-900 dark:text-amber-200">Contribution & P/V Ratio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-amber-200/50">
                    <span>Contribution per unit (SP - VC):</span>
                    <span className="font-mono font-bold text-sm">₹{contributionPerUnit}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-200/50">
                    <span>Profit-Volume (P/V) Ratio:</span>
                    <span className="font-mono font-bold text-sm text-amber-700 dark:text-amber-300">{pvRatio}%</span>
                  </div>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                    Every unit sold contributes ₹{contributionPerUnit} towards recovering fixed overheads.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[hsl(var(--border))] bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-base text-indigo-900 dark:text-indigo-200">Break-Even Point (BEP)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-indigo-200/50">
                    <span>BEP in Quantity:</span>
                    <span className="font-mono font-bold text-base text-indigo-700 dark:text-indigo-300">{bepUnits.toLocaleString("en-IN")} Units</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-indigo-200/50">
                    <span>BEP in Turnover (Sales Value):</span>
                    <span className="font-mono font-bold text-base text-indigo-700 dark:text-indigo-300">₹{bepSalesValue.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                    At {bepUnits} units, total revenue equals total cost (Zero profit, Zero loss).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
