import {
  ShoppingCart,
  Wrench,
  Package,
  Wallet,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome back, Adebayo. Here's what's happening today."
    >
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        <KPICard
          title="Today's Sales"
          prefix="₦"
          value="1,245,000"
          change={12.5}
          trend="up"
          changeLabel="vs yesterday"
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <KPICard
          title="Repair Revenue"
          prefix="₦"
          value="342,000"
          change={8.2}
          trend="up"
          changeLabel="vs yesterday"
          icon={<Wrench className="h-5 w-5" />}
        />
        <KPICard
          title="Open Repairs"
          value="24"
          suffix="tickets"
          change={-3}
          trend="down"
          changeLabel="vs last week"
          icon={<AlertCircle className="h-5 w-5" />}
        />
        <KPICard
          title="Stock Value"
          prefix="₦"
          value="47.2M"
          change={2.1}
          trend="up"
          changeLabel="this month"
          icon={<Package className="h-5 w-5" />}
        />
        <KPICard
          title="Cash Flow"
          prefix="₦"
          value="+892K"
          change={15.3}
          trend="up"
          changeLabel="today"
          icon={<Wallet className="h-5 w-5" />}
        />
        <KPICard
          title="Investor Capital"
          prefix="₦"
          value="125M"
          change={0}
          trend="neutral"
          changeLabel="this month"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <TopProducts />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LowStockAlert />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
