import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  History,
  FileText,
  PieChart,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const capitalData = [
  { month: "Jul", capital: 85000000, payouts: 5000000 },
  { month: "Aug", capital: 92000000, payouts: 4500000 },
  { month: "Sep", capital: 98000000, payouts: 6000000 },
  { month: "Oct", capital: 105000000, payouts: 5500000 },
  { month: "Nov", capital: 115000000, payouts: 7000000 },
  { month: "Dec", capital: 125000000, payouts: 8000000 },
];

const investors = [
  { id: "1", name: "Chief Okafor Emeka", contributed: 45000000, balance: 48500000, roi: 7.8, lastActivity: "2024-01-15" },
  { id: "2", name: "Alhaji Bello Ibrahim", contributed: 35000000, balance: 37100000, roi: 6.0, lastActivity: "2024-01-10" },
  { id: "3", name: "Mrs. Adaobi Nwankwo", contributed: 25000000, balance: 26750000, roi: 7.0, lastActivity: "2024-01-12" },
  { id: "4", name: "Engr. Tunde Adeleke", contributed: 20000000, balance: 21200000, roi: 6.0, lastActivity: "2024-01-08" },
];

const Investors = () => {
  const totalCapital = investors.reduce((sum, inv) => sum + inv.balance, 0);
  const totalContributed = investors.reduce((sum, inv) => sum + inv.contributed, 0);
  const avgROI = (investors.reduce((sum, inv) => sum + inv.roi, 0) / investors.length).toFixed(1);

  return (
    <DashboardLayout
      title="Investors"
      description="Manage investor accounts, contributions, and payouts"
    >
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Capital</p>
                <p className="text-2xl font-bold font-mono">
                  ₦{(totalCapital / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Contributed</p>
                <p className="text-2xl font-bold font-mono">
                  ₦{(totalContributed / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. ROI</p>
                <p className="text-2xl font-bold font-mono text-success">
                  {avgROI}%
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <PieChart className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Investors</p>
                <p className="text-2xl font-bold font-mono">{investors.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Capital Chart */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Capital & Payouts Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={capitalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => `₦${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                    formatter={(value: number, name: string) => [`₦${value.toLocaleString()}`, name === "capital" ? "Capital" : "Payouts"]}
                  />
                  <Area type="monotone" dataKey="capital" stroke="hsl(222, 47%, 20%)" strokeWidth={2} fill="url(#capitalGrad)" />
                  <Bar dataKey="payouts" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} barSize={20} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Record Contribution
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Process Payout
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" />
              View All Transactions
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Generate Statements
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Investors List */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Investor Accounts</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Investor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {investors.map((investor) => {
              const growth = investor.balance - investor.contributed;
              const isPositive = growth >= 0;

              return (
                <div
                  key={investor.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center text-lg font-semibold text-primary">
                      {investor.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <p className="font-medium">{investor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last activity: {investor.lastActivity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Contributed</p>
                      <p className="font-mono font-medium">
                        ₦{(investor.contributed / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="font-mono font-semibold">
                        ₦{(investor.balance / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="text-right w-24">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <div className={`flex items-center justify-end gap-1 font-mono font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        {investor.roi}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Investors;
