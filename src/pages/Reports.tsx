import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Wrench,
  Package,
  Wallet,
  TrendingUp,
  Download,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const reportCategories = [
  {
    title: "Sales Reports",
    icon: ShoppingCart,
    color: "bg-primary/10 text-primary",
    reports: [
      { name: "Daily Sales Summary", description: "Today's transactions and revenue" },
      { name: "Sales by Product", description: "Product performance breakdown" },
      { name: "Sales by Staff", description: "Staff sales performance" },
      { name: "Payment Methods", description: "Cash, transfer, POS breakdown" },
    ],
  },
  {
    title: "Repair Reports",
    icon: Wrench,
    color: "bg-info/10 text-info",
    reports: [
      { name: "Repair Summary", description: "Tickets and revenue overview" },
      { name: "Technician Performance", description: "Jobs completed per technician" },
      { name: "Average Repair Time", description: "Turnaround time analysis" },
      { name: "Parts Usage", description: "Most used repair parts" },
    ],
  },
  {
    title: "Inventory Reports",
    icon: Package,
    color: "bg-warning/10 text-warning",
    reports: [
      { name: "Stock Levels", description: "Current inventory snapshot" },
      { name: "Low Stock Alert", description: "Items below minimum level" },
      { name: "Stock Movement", description: "In/out movements by date" },
      { name: "Valuation Report", description: "Total inventory value" },
    ],
  },
  {
    title: "Financial Reports",
    icon: Wallet,
    color: "bg-success/10 text-success",
    reports: [
      { name: "Profit & Loss", description: "Revenue vs expenses summary" },
      { name: "Cash Flow", description: "Money in and out analysis" },
      { name: "Expense Breakdown", description: "Expenses by category" },
      { name: "Outstanding Balances", description: "Unpaid invoices and repairs" },
    ],
  },
  {
    title: "Investor Reports",
    icon: TrendingUp,
    color: "bg-accent/10 text-accent",
    reports: [
      { name: "Portfolio Summary", description: "All investor accounts overview" },
      { name: "Individual Statements", description: "Per-investor transaction history" },
      { name: "ROI Analysis", description: "Return on investment breakdown" },
      { name: "Payout History", description: "All payouts by date" },
    ],
  },
];

const Reports = () => {
  return (
    <DashboardLayout
      title="Reports"
      description="Generate and export business reports"
    >
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
                <p className="text-xl font-bold font-mono">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Download className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-xl font-bold font-mono">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-xl font-bold font-mono">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Custom Reports</p>
                <p className="text-xl font-bold font-mono">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportCategories.map((category) => (
          <Card key={category.title} className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className={cn("p-2 rounded-lg", category.color)}>
                  <category.icon className="h-4 w-4" />
                </div>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.reports.map((report) => (
                  <button
                    key={report.name}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">
                      {report.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {report.description}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
