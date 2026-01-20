import { AlertTriangle } from "lucide-react";
import { Card, Typography, Tag } from "antd";

const { Title, Text } = Typography;

const lowStockItems = [
  { name: "iPhone 15 Screen", stock: 2, min: 5, urgent: true },
  { name: "Samsung S24 Battery", stock: 3, min: 5, urgent: true },
  { name: "USB-C Cables (1m)", stock: 8, min: 10, urgent: false },
  { name: "Tempered Glass (Universal)", stock: 12, min: 15, urgent: false },
  { name: "AirPods Pro 2", stock: 4, min: 5, urgent: true },
];

export function LowStockAlert() {
  return (
    <Card
      style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
      styles={{
        header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
        body: { padding: 24 },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Title level={5} style={{ margin: 0 }}>Low Stock Alert</Title>
          <Tag
            icon={<AlertTriangle style={{ width: 12, height: 12 }} />}
            color="warning"
          >
            {lowStockItems.length} items
          </Tag>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lowStockItems.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 8,
              padding: 12,
              background: item.urgent ? "#fff5f5" : "#f5f5f5",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {item.urgent && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ff4d4f",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
              )}
              <Text strong style={{ fontSize: 14 }}>{item.name}</Text>
            </div>
            <div style={{ textAlign: "right" }}>
              <Text
                strong
                style={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  color: item.urgent ? "#ff4d4f" : "#faad14",
                  display: "block",
                }}
              >
                {item.stock} left
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>min: {item.min}</Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
