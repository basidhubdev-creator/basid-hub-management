import type { ReactNode } from "react";
import { Card, Statistic, Typography } from "antd";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const { Text } = Typography;

interface KPICardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function KPICard({
  title,
  value,
  prefix,
  suffix,
  change,
  changeLabel = "vs last period",
  icon,
  trend,
  className,
}: KPICardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  
  const trendColor =
    trend === "up"
      ? "#52c41a"
      : trend === "down"
      ? "#ff4d4f"
      : "#8c8c8c";

  const displayValue = prefix ? `${prefix}${value}` : suffix ? `${value} ${suffix}` : value;

  return (
    <Card
      className={className}
      style={{
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        transition: "all 0.2s",
      }}
      bodyStyle={{ padding: 20 }}
      hoverable
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 12 }}>
            {title}
          </Text>
          <Statistic
            value={displayValue}
            valueStyle={{
              fontSize: 24,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              color: "#000000",
            }}
          />
        </div>
        {icon && (
          <div
            style={{
              borderRadius: 8,
              background: "#f5f5f5",
              padding: 10,
              color: "#000000",
              transition: "all 0.2s",
            }}
          >
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: trendColor }}>
            <TrendIcon style={{ width: 14, height: 14 }} />
            <Text strong style={{ fontSize: 14, color: trendColor }}>
              {Math.abs(change)}%
            </Text>
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {changeLabel}
          </Text>
        </div>
      )}
    </Card>
  );
}
