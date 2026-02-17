import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Typography, theme, Space, Flex } from "antd";
import type { MenuProps } from "antd";
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  Package,
  Users,
  Building2,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const { Sider } = Layout;
const { Text, Title } = Typography;
const { useToken } = theme;

type MenuItem = Required<MenuProps>["items"][number];

const getMenuIcon = (Icon: React.ComponentType<{ style?: React.CSSProperties }>) => (
  <Icon style={{ fontSize: 16 }} />
);

const navItems: MenuItem[] = [
  {
    key: "/dashboard",
    icon: getMenuIcon(LayoutDashboard),
    label: "Dashboard",
  },
  {
    key: "/pos/sales",
    icon: getMenuIcon(ShoppingCart),
    label: "Sales / POS",
  },
  {
    key: "/repairs",
    icon: getMenuIcon(Wrench),
    label: "Repairs",
  },
  {
    key: "inventory",
    icon: getMenuIcon(Package),
    label: "Inventory",
    children: [
      { key: "/inventory", label: "Products & Stock" },
      { key: "/purchases", label: "Purchase Orders" },
    ],
  },
  {
    key: "/customers",
    icon: getMenuIcon(Users),
    label: "Customers",
  },
  {
    key: "wholesale",
    icon: getMenuIcon(Building2),
    label: "Wholesale",
    children: [
      { key: "/wholesale/contracts", label: "Contracts" },
      { key: "/wholesale/orders", label: "Orders" },
    ],
  },
  {
    key: "/investors",
    icon: getMenuIcon(TrendingUp),
    label: "Investors",
  },
  {
    key: "/reports",
    icon: getMenuIcon(FileText),
    label: "Reports",
  },
  {
    key: "/settings",
    icon: getMenuIcon(Settings),
    label: "Settings",
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useToken();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key && !e.keyPath.includes("inventory") && !e.keyPath.includes("wholesale")) {
      navigate(e.key);
    }
  };

  const selectedKeys = [location.pathname];
  const openKeys = [];
  if (location.pathname.startsWith("/inventory") || location.pathname === "/purchases") {
    openKeys.push("inventory");
  }
  if (location.pathname.startsWith("/wholesale")) {
    openKeys.push("wholesale");
  }

  return (
    <Sider
      width={256}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#000000",
        borderRight: `1px solid ${token.colorBorder}`,
      }}
    >
      <Flex vertical style={{ height: "100%" }}>
        {/* Logo */}
        <Flex 
          align="center" 
          gap={token.margin}
          style={{ padding: token.paddingLG }}
        >
          <div style={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: token.borderRadiusLG,
            background: token.colorBgContainer,
            border: `1px solid ${token.colorBorder}`,
            boxShadow: token.boxShadowSecondary,
          }}>
            <img src="/logo.png" alt="logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </div>
          <Space direction="vertical" size={0}>
            <Title level={4} style={{ color: "#f1f5f9", margin: 0 }}>
              Basid Hub
            </Title>
            <Text style={{ color: "rgba(241, 245, 249, 0.7)", fontSize: token.fontSizeSM }}>
              Management Portal
            </Text>
          </Space>
        </Flex>

        {/* Navigation */}
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          items={navItems}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            background: "#000000",
            color: "#ffffff",
            borderRight: 0,
            padding: "8px 0",
          }}
          theme="dark"
        />

        {/* User section */}
        <div
          style={{
            borderTop: `1px solid ${token.colorBorder}`,
            padding: token.padding,
          }}
        >
          <Flex
            align="center"
            gap={token.marginSM}
            style={{
              padding: `${token.paddingXS}px ${token.paddingSM}px`,
              borderRadius: token.borderRadius,
            }}
          >
            <Avatar
              style={{
                backgroundColor: token.colorPrimary,
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              AO
            </Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text
                strong
                style={{ color: "#ffffff", fontSize: token.fontSize, display: "block" }}
                ellipsis
              >
                Taiwo Samson
              </Text>
              <Text style={{ color: "#94a3b8", fontSize: token.fontSizeSM, display: "block" }} ellipsis>
                Admin
              </Text>
            </div>
            <Button
              type="text"
              icon={<LogOut style={{ fontSize: 16 }} />}
              style={{ color: "#b0b0b0" }}
              onClick={() => navigate("/login")}
            />
          </Flex>
        </div>
      </Flex>
    </Sider>
  );
}
