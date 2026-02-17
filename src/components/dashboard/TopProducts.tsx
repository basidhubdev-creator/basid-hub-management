import { Card, Progress, Typography, Badge, theme, Space } from "antd";

const { Title, Text } = Typography;
const { useToken } = theme;

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 45, revenue: 2700000, progress: 100 },
  { name: "Samsung S24 Ultra", sales: 38, revenue: 1900000, progress: 84 },
  { name: "iPhone 14 Pro", sales: 32, revenue: 1280000, progress: 71 },
  { name: "Google Pixel 8 Pro", sales: 24, revenue: 840000, progress: 53 },
  { name: "Samsung A54", sales: 18, revenue: 378000, progress: 40 },
];

export function TopProducts() {
  const { token } = useToken();
  
  return (
    <Card
      style={{ borderRadius: token.borderRadiusLG, border: `1px solid ${token.colorBorder}` }}
      styles={{
        header: { borderBottom: `1px solid ${token.colorBorder}`, padding: `${token.padding}px ${token.paddingLG}px` },
        body: { padding: token.paddingLG },
      }}
      title={<Title level={5} style={{ margin: 0 }}>Top Selling Models</Title>}
    >
      <Space direction="vertical" size={token.padding} style={{ width: "100%" }}>
        {topProducts.map((product, index) => (
          <div key={product.name}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token.marginXS }}>
              <div style={{ display: "flex", alignItems: "center", gap: token.marginSM }}>
                <Badge
                  count={index + 1}
                  style={{
                    backgroundColor: token.colorBgLayout,
                    color: token.colorTextSecondary,
                    minWidth: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    fontSize: token.fontSizeSM,
                    fontWeight: 600,
                  }}
                />
                <Text strong style={{ fontSize: token.fontSize }}>{product.name}</Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Text
                  strong
                  style={{
                    fontSize: token.fontSize,
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    display: "block",
                  }}
                >
                  ₦{(product.revenue / 1000).toFixed(0)}k
                </Text>
                <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>{product.sales} units</Text>
              </div>
            </div>
            <Progress
              percent={product.progress}
              showInfo={false}
              strokeColor={token.colorPrimary}
              size="small"
            />
          </div>
        ))}
      </Space>
    </Card>
  );
}
