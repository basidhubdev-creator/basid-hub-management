import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Statistic,
} from "antd";
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
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;

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
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                  Total Capital
                </Text>
                <Statistic
                  value={(totalCapital / 1000000).toFixed(1)}
                  suffix="M"
                  prefix="₦"
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                />
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#00000015",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DollarSign style={{ fontSize: 20, color: "#000000" }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                  Total Contributed
                </Text>
                <Statistic
                  value={(totalContributed / 1000000).toFixed(1)}
                  suffix="M"
                  prefix="₦"
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                />
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#1890ff15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingUp style={{ fontSize: 20, color: "#1890ff" }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                  Avg. ROI
                </Text>
                <Statistic
                  value={avgROI}
                  suffix="%"
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#52c41a",
                  }}
                />
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#52c41a15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PieChart style={{ fontSize: 20, color: "#52c41a" }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            bodyStyle={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                  Active Investors
                </Text>
                <Statistic
                  value={investors.length}
                  valueStyle={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                />
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#1976d215",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users style={{ fontSize: 20, color: "#1976d2" }} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 24 }}>
        {/* Capital Chart */}
        <Col xs={24} lg={16}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            styles={{
              header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
              body: { padding: 24 },
            }}
            title={<Title level={5} style={{ margin: 0 }}>Capital & Payouts Over Time</Title>}
          >
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={capitalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000000" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#000000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8c8c8c", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8c8c8c", fontSize: 12 }}
                    tickFormatter={(v: number) => `₦${(v / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number | undefined, name: string | undefined) => {
                      if (value === undefined || name === undefined) return ["", ""];
                      return [`₦${value.toLocaleString()}`, name === "capital" ? "Capital" : "Payouts"];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="capital"
                    stroke="#000000"
                    strokeWidth={2}
                    fill="url(#capitalGrad)"
                  />
                  <Bar dataKey="payouts" fill="#1976d2" radius={[4, 4, 0, 0]} barSize={20} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col xs={24} lg={8}>
          <Card
            style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
            styles={{
              header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
              body: { padding: 24 },
            }}
            title={<Title level={5} style={{ margin: 0 }}>Quick Actions</Title>}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Button block icon={<Plus />} style={{ justifyContent: "flex-start" }}>
                Record Contribution
              </Button>
              <Button block icon={<ArrowUpRight />} style={{ justifyContent: "flex-start" }}>
                Process Payout
              </Button>
              <Button block icon={<History />} style={{ justifyContent: "flex-start" }}>
                View All Transactions
              </Button>
              <Button block icon={<FileText />} style={{ justifyContent: "flex-start" }}>
                Generate Statements
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Investors List */}
      <Card
        style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
        styles={{
          header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
          body: { padding: 24 },
        }}
        title={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Title level={5} style={{ margin: 0 }}>Investor Accounts</Title>
            <Button type="primary" icon={<Plus />} size="small">
              Add Investor
            </Button>
          </div>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          {investors.map((investor) => {
            const growth = investor.balance - investor.contributed;
            const isPositive = growth >= 0;

            return (
              <Card
                key={investor.id}
                hoverable
                style={{
                  borderRadius: 8,
                  background: "#fafafa",
                  border: "1px solid #e5e7eb",
                }}
                bodyStyle={{ padding: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Space size="middle">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "#1976d2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      {investor.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16, display: "block" }}>
                        {investor.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Last activity: {investor.lastActivity}
                      </Text>
                    </div>
                  </Space>
                  <Space size="large">
                    <div style={{ textAlign: "right" }}>
                      <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                        Contributed
                      </Text>
                      <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                        ₦{(investor.contributed / 1000000).toFixed(1)}M
                      </Text>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                        Current Balance
                      </Text>
                      <Text
                        strong
                        style={{
                          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                          fontSize: 16,
                        }}
                      >
                        ₦{(investor.balance / 1000000).toFixed(1)}M
                      </Text>
                    </div>
                    <div style={{ textAlign: "right", minWidth: 96 }}>
                      <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                        ROI
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 4,
                        }}
                      >
                        {isPositive ? (
                          <ArrowUpRight style={{ fontSize: 16, color: "#52c41a" }} />
                        ) : (
                          <ArrowDownRight style={{ fontSize: 16, color: "#ff4d4f" }} />
                        )}
                        <Text
                          strong
                          style={{
                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                            color: isPositive ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {investor.roi}%
                        </Text>
                      </div>
                    </div>
                  </Space>
                </div>
              </Card>
            );
          })}
        </Space>
      </Card>
    </DashboardLayout>
  );
};

export default Investors;