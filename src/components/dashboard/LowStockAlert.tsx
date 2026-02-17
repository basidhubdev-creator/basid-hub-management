import { AlertTriangle } from "lucide-react";
import { Card, Typography, Tag, theme, Space, Flex } from "antd";

const { Title, Text } = Typography;
const { useToken } = theme;

const lowStockItems = [
  { name: "iPhone 15 Screen", stock: 2, min: 5, urgent: true },
  { name: "Samsung S24 Battery", stock: 3, min: 5, urgent: true },
  { name: "USB-C Cables (1m)", stock: 8, min: 10, urgent: false },
  { name: "Tempered Glass (Universal)", stock: 12, min: 15, urgent: false },
  { name: "AirPods Pro 2", stock: 4, min: 5, urgent: true },
];

export function LowStockAlert() {
  const { token } = useToken();
  
  return (
    <Card
      style={{ borderRadius: token.borderRadiusLG, border: `1px solid ${token.colorBorder}` }}
      styles={{
        header: { borderBottom: `1px solid ${token.colorBorder}`, padding: `${token.padding}px ${token.paddingLG}px` },
        body: { padding: token.paddingLG },
      }}
      title={
        <Flex justify="space-between" align="center">
          <Title level={5} style={{ margin: 0 }}>Low Stock Alert</Title>
          <Tag
            icon={<AlertTriangle style={{ width: 12, height: 12 }} />}
            color="warning"
          >
            {lowStockItems.length} items
          </Tag>
        </Flex>
      }
    >
      <Space direction="vertical" size={token.marginSM} style={{ width: "100%" }}>
        {lowStockItems.map((item) => (
          <Flex
            key={item.name}
            align="center"
            justify="space-between"
            style={{
              borderRadius: token.borderRadius,
              padding: token.paddingSM,
              background: item.urgent ? "#fff5f5" : token.colorBgLayout,
              transition: "all 0.2s",
            }}
          >
            <Flex align="center" gap={token.marginSM}>
              {item.urgent && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: token.colorError,
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
              )}
              <Text strong style={{ fontSize: token.fontSize }}>{item.name}</Text>
            </Flex>
            <div style={{ textAlign: "right" }}>
              <Text
                strong
                style={{
                  fontSize: token.fontSize,
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  color: item.urgent ? token.colorError : token.colorWarning,
                  display: "block",
                }}
              >
                {item.stock} left
              </Text>
              <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>min: {item.min}</Text>
            </div>
          </Flex>
        ))}
      </Space>
    </Card>
  );
}
