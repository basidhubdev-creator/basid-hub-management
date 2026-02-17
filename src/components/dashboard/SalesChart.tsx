import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, Typography, theme, Flex } from "antd";

const { Title } = Typography;
const { useToken } = theme;

const data = [
  { day: "Mon", sales: 245000, repairs: 82000 },
  { day: "Tue", sales: 312000, repairs: 95000 },
  { day: "Wed", sales: 289000, repairs: 78000 },
  { day: "Thu", sales: 378000, repairs: 112000 },
  { day: "Fri", sales: 425000, repairs: 134000 },
  { day: "Sat", sales: 512000, repairs: 156000 },
  { day: "Sun", sales: 198000, repairs: 45000 },
];

export function SalesChart() {
  const { token } = useToken();
  
  return (
    <Card
      style={{ borderRadius: token.borderRadiusLG, border: `1px solid ${token.colorBorder}` }}
      styles={{
        header: { borderBottom: `1px solid ${token.colorBorder}`, padding: `${token.padding}px ${token.paddingLG}px` },
        body: { padding: token.paddingLG },
      }}
      title={<Title level={5} style={{ margin: 0 }}>Sales & Repair Revenue</Title>}
    >
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#000000" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="repairsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={token.colorPrimary} stopOpacity={0.3} />
                <stop offset="100%" stopColor={token.colorPrimary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorder} vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: token.colorTextSecondary, fontSize: token.fontSizeSM }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: token.colorTextSecondary, fontSize: token.fontSizeSM }}
              tickFormatter={(value: number) => `₦${(value / 1000).toFixed(0)}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: token.colorBgContainer,
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadius,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.07)",
              }}
              labelStyle={{ color: token.colorText, fontWeight: 600 }}
              formatter={(value: number | undefined, name: string | undefined) => {
                if (value === undefined || name === undefined) return ["", ""];
                return [
                  `₦${value.toLocaleString()}`,
                  name === "sales" ? "Sales" : "Repairs",
                ];
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#000000"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
            <Area
              type="monotone"
              dataKey="repairs"
              stroke={token.colorPrimary}
              strokeWidth={2}
              fill="url(#repairsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Flex align="center" justify="center" gap={token.paddingLG} style={{ marginTop: token.padding }}>
        <Flex align="center" gap={token.marginXS}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#000000" }} />
          <span style={{ fontSize: token.fontSize, color: token.colorTextSecondary }}>Sales</span>
        </Flex>
        <Flex align="center" gap={token.marginXS}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: token.colorPrimary }} />
          <span style={{ fontSize: token.fontSize, color: token.colorTextSecondary }}>Repairs</span>
        </Flex>
      </Flex>
    </Card>
  );
}
