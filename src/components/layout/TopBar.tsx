import { Bell, Search, Calendar } from "lucide-react";
import { Layout, Input, Select, Button, Badge, Typography, theme, Space, Flex } from "antd";

const { Header } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { useToken } = theme;

interface TopBarProps {
  title: string;
  description?: string;
}

export function TopBar({ title, description }: TopBarProps) {
  const { token } = useToken();
  
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${token.colorBorder}`,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        padding: `0 ${token.paddingLG}px`,
        height: 64,
      }}
    >
      <Space direction="vertical" size={0}>
        <Title level={5} style={{ margin: 2, fontSize: token.fontSizeHeading5 }}>
          {title}
        </Title>
       {description && (
          <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
            {description}
          </Text>
        )}
      </Space>

      <Flex align="center" gap={token.marginSM}>
        {/* Date Range Selector */}
        <Select
          defaultValue="today"
          style={{ width: 140 }}
          suffixIcon={<Calendar style={{ fontSize: 14 }} />}
        >
          <Option value="today">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
          <Option value="quarter">This Quarter</Option>
          <Option value="year">This Year</Option>
        </Select>

        {/* Search */}
        <Input
          placeholder="Search..."
          prefix={<Search className="h-4 w-4" />}
          style={{ width: 256 }}
          allowClear
        />

        {/* Notifications */}
        <Badge dot color={token.colorPrimary}>
          <Button
            type="text"
            icon={<Bell style={{ fontSize: 16 }} />}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          />
        </Badge>
      </Flex>
    </Header>
  );
}
