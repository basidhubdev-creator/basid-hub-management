import { ShoppingCart, Wrench, TrendingUp, CreditCard, Package } from "lucide-react";
import { Card, Typography, Avatar, theme, Space } from "antd";

const { Title, Text } = Typography;
const { useToken } = theme;

const activities = [
  {
    id: 1,
    type: "sale",
    title: "New sale completed",
    description: "iPhone 15 Pro Max - N850,000",
    time: "2 mins ago",
    icon: ShoppingCart,
    color: "#52c41a",
  },
  {
    id: 2,
    type: "repair",
    title: "Repair ticket #2847 completed",
    description: "Screen replacement - Samsung S23",
    time: "15 mins ago",
    icon: Wrench,
    color: "#1890ff",
  },
  {
    id: 3,
    type: "investment",
    title: "New investor contribution",
    description: "Chief Okafor - ₦5,000,000",
    time: "1 hour ago",
    icon: TrendingUp,
    color: "#1976d2",
  },
  {
    id: 4,
    type: "payment",
    title: "Large payment received",
    description: "Wholesale order - TechMart Ltd",
    time: "2 hours ago",
    icon: CreditCard,
    color: "#000000",
  },
  {
    id: 5,
    type: "stock",
    title: "Stock received",
    description: "PO #1245 - 50 units",
    time: "3 hours ago",
    icon: Package,
    color: "#8c8c8c",
  },
];

export function RecentActivity() {
  const { token } = useToken();
  
  return (
    <Card
      style={{ borderRadius: token.borderRadiusLG, border: `1px solid ${token.colorBorder}` }}
      styles={{
        header: { borderBottom: `1px solid ${token.colorBorder}`, padding: `${token.padding}px ${token.paddingLG}px` },
        body: { padding: token.paddingLG },
      }}
      title={<Title level={5} style={{ margin: 0 }}>Recent Activity</Title>}
    >
      <Space direction="vertical" size={token.padding} style={{ width: "100%" }}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: token.padding,
            }}
          >
            <Avatar
              size={36}
              style={{
                backgroundColor: `${activity.color}15`,
                color: activity.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: token.borderRadius,
              }}
              icon={<activity.icon style={{ width: 16, height: 16 }} />}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text strong style={{ fontSize: token.fontSize, display: "block" }}>
                {activity.title}
              </Text>
              <Text
                type="secondary"
                style={{ fontSize: token.fontSize, display: "block" }}
                ellipsis
              >
                {activity.description}
              </Text>
            </div>
            <Text type="secondary" style={{ fontSize: token.fontSizeSM, whiteSpace: "nowrap" }}>
              {activity.time}
            </Text>
          </div>
        ))}
      </Space>
    </Card>
  );
}
