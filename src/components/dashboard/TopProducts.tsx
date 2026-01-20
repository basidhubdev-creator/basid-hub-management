import { Card, Progress, Typography, Badge } from "antd";

const { Title, Text } = Typography;

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 45, revenue: 2700000, progress: 100 },
  { name: "Samsung S24 Ultra", sales: 38, revenue: 1900000, progress: 84 },
  { name: "iPhone 14 Pro", sales: 32, revenue: 1280000, progress: 71 },
  { name: "Google Pixel 8 Pro", sales: 24, revenue: 840000, progress: 53 },
  { name: "Samsung A54", sales: 18, revenue: 378000, progress: 40 },
];

export function TopProducts() {
  return (
    <Card
      style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
      styles={{
        header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
        body: { padding: 24 },
      }}
      title={<Title level={5} style={{ margin: 0 }}>Top Selling Models</Title>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {topProducts.map((product, index) => (
          <div key={product.name}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Badge
                  count={index + 1}
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "#8c8c8c",
                    minWidth: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />
                <Text strong style={{ fontSize: 14 }}>{product.name}</Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Text
                  strong
                  style={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    display: "block",
                  }}
                >
                  ₦{(product.revenue / 1000).toFixed(0)}k
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{product.sales} units</Text>
              </div>
            </div>
            <Progress
              percent={product.progress}
              showInfo={false}
              strokeColor="#1976d2"
              size="small"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
