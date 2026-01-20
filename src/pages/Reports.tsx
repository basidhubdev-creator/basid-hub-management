import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, Button, Typography, Row, Col, Space, Statistic } from "antd";
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
} from "lucide-react";

const { Text } = Typography;

const reportCategories = [
  {
    title: "Sales Reports",
    icon: ShoppingCart,
    color: "#000000",
    bgColor: "#00000015",
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
    color: "#1890ff",
    bgColor: "#1890ff15",
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
    color: "#faad14",
    bgColor: "#faad1415",
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
    color: "#52c41a",
    bgColor: "#52c41a15",
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
    color: "#1976d2",
    bgColor: "#1976d215",
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
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <Space>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#1890ff15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BarChart3 style={{ fontSize: 20, color: "#1890ff" }} />
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                  Reports Generated
                </Text>
                <Statistic
                  value={156}
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <Space>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#13c2c215",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Download style={{ fontSize: 20, color: "#13c2c2" }} />
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                  Downloads
                </Text>
                <Statistic
                  value={89}
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <Space>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#52c41a15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Calendar style={{ fontSize: 20, color: "#52c41a" }} />
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                  Scheduled
                </Text>
                <Statistic
                  value={5}
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <Space>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#1976d215",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText style={{ fontSize: 20, color: "#1976d2" }} />
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                  Custom Reports
                </Text>
                <Statistic
                  value={3}
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Report Categories */}
      <Row gutter={[24, 24]}>
        {reportCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Col key={category.title} xs={24} md={12} lg={8}>
              <Card
                style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                styles={{
                  header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
                  body: { padding: 24 },
                }}
                title={
                  <Space>
                    <div
                      style={{
                        padding: 8,
                        borderRadius: 8,
                        background: category.bgColor,
                        color: category.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CategoryIcon style={{ fontSize: 16 }} />
                    </div>
                    <Text strong>{category.title}</Text>
                  </Space>
                }
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  {category.reports.map((report) => (
                    <Button
                      key={report.name}
                      type="text"
                      block
                      style={{ textAlign: "left", height: "auto", padding: 12 }}
                    >
                      <div>
                        <Text strong style={{ fontSize: 14, display: "block" }}>
                          {report.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {report.description}
                        </Text>
                      </div>
                    </Button>
                  ))}
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
    </DashboardLayout>
  );
};

export default Reports;