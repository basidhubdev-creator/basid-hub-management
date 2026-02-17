import type { ReactNode } from "react";
import { Card, Statistic, Typography, theme, Flex } from "antd";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const { Text } = Typography;
const { useToken } = theme;

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
  const { token } = useToken();
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  
  const trendColor =
    trend === "up"
      ? token.colorSuccess
      : trend === "down"
      ? token.colorError
      : token.colorTextSecondary;

  const displayValue = prefix ? `${prefix}${value}` : suffix ? `${value} ${suffix}` : value;

  return (
    <Card
      className={className}
      style={{
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        transition: "all 0.2s",
      }}
      bodyStyle={{ padding: token.paddingLG }}
      hoverable
    >
      <Flex justify="space-between" align="flex-start">
        <div style={{ flex: 1 }}>
          <Text type="secondary" style={{ fontSize: token.fontSize, display: "block", marginBottom: token.marginSM }}>
            {title}
          </Text>
          <Statistic
            value={displayValue}
            valueStyle={{
              fontSize: token.fontSizeHeading2,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              color: token.colorText,
            }}
          />
        </div>
        {icon && (
          <div
            style={{
              borderRadius: token.borderRadius,
              background: token.colorBgLayout,
              padding: token.paddingXS,
              color: token.colorText,
              transition: "all 0.2s",
            }}
          >
            {icon}
          </div>
        )}
      </Flex>
      
      {change !== undefined && (
        <Flex align="center" gap={token.marginXS} style={{ marginTop: token.padding }}>
          <Flex align="center" gap={4} style={{ color: trendColor }}>
            <TrendIcon style={{ width: 14, height: 14 }} />
            <Text strong style={{ fontSize: token.fontSize, color: trendColor }}>
              {Math.abs(change)}%
            </Text>
          </Flex>
          <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
            {changeLabel}
          </Text>
        </Flex>
      )}
    </Card>
  );
}
