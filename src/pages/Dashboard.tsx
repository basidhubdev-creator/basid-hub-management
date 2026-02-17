import {
  ShoppingCart,
  Wrench,
  Package,
  Wallet,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Row, Col } from "antd";
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
      description="Welcome back, Samson - here's an overview of your store's performance and recent activity."
    >
      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <KPICard
            title="Today's Sales"
            prefix="₦"
            value="1,245,000"
            change={12.5}
            trend="up"
            changeLabel="vs yesterday"
            icon={<ShoppingCart style={{ fontSize: 20 }} />}
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <KPICard
            title="Repair Revenue"
            prefix="₦"
            value="342,000"
            change={8.2}
            trend="up"
            changeLabel="vs yesterday"
            icon={<Wrench style={{ fontSize: 20 }} />}
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <KPICard
            title="Open Repairs"
            value="24"
            suffix="tickets"
            change={-3}
            trend="down"
            changeLabel="vs last week"
            icon={<AlertCircle style={{ fontSize: 20 }} />}
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <KPICard
            title="Stock Value"
            prefix="₦"
            value="47.2M"
            change={2.1}
            trend="up"
            changeLabel="this month"
            icon={<Package style={{ fontSize: 20 }} />}
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <KPICard
            title="Cash Flow"
            prefix="₦"
            value="+892K"
            change={15.3}
            trend="up"
            changeLabel="today"
            icon={<Wallet style={{ fontSize: 20 }} />}
          />
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <KPICard
            title="Investor Capital"
            prefix="₦"
            value="125M"
            change={0}
            trend="neutral"
            changeLabel="this month"
            icon={<TrendingUp style={{ fontSize: 20 }} />}
          />
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <SalesChart />
        </Col>
        <Col xs={24} lg={8}>
          <TopProducts />
        </Col>
      </Row>

      {/* Bottom Row */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <LowStockAlert />
        </Col>
        <Col xs={24} lg={12}>
          <RecentActivity />
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default Dashboard;
