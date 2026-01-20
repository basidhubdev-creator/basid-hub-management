import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  ShoppingBag,
  Wrench,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Button,
  Input,
  Badge,
  Select,
  Card,
  Typography,
  Space,
  Row,
  Col,
  Avatar,
  Dropdown,
  Tag,
} from "antd";
import type { MenuProps } from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: "retail" | "wholesale";
  totalSpent: number;
  purchaseCount: number;
  repairCount: number;
  lastVisit: string;
  tags: string[];
  isVIP: boolean;
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Chinedu Okafor",
    phone: "08123456789",
    email: "chinedu.okafor@email.com",
    type: "retail",
    totalSpent: 2850000,
    purchaseCount: 8,
    repairCount: 3,
    lastVisit: "2024-01-16",
    tags: ["iPhone user", "Premium"],
    isVIP: true,
  },
  {
    id: "2",
    name: "TechMart Nigeria Ltd",
    phone: "08098765432",
    email: "orders@techmart.ng",
    type: "wholesale",
    totalSpent: 45000000,
    purchaseCount: 125,
    repairCount: 0,
    lastVisit: "2024-01-15",
    tags: ["Wholesale", "Credit account"],
    isVIP: true,
  },
  {
    id: "3",
    name: "Amaka Eze",
    phone: "07034567890",
    email: "amaka.eze@gmail.com",
    type: "retail",
    totalSpent: 520000,
    purchaseCount: 2,
    repairCount: 1,
    lastVisit: "2024-01-14",
    tags: ["Samsung user"],
    isVIP: false,
  },
  {
    id: "4",
    name: "Gadget Palace",
    phone: "09087654321",
    email: "info@gadgetpalace.ng",
    type: "wholesale",
    totalSpent: 28500000,
    purchaseCount: 87,
    repairCount: 0,
    lastVisit: "2024-01-13",
    tags: ["Wholesale", "Accessories focus"],
    isVIP: true,
  },
  {
    id: "5",
    name: "Blessing Adeyemi",
    phone: "08145678901",
    type: "retail",
    totalSpent: 125000,
    purchaseCount: 1,
    repairCount: 2,
    lastVisit: "2024-01-12",
    tags: [],
    isVIP: false,
  },
  {
    id: "6",
    name: "Yusuf Ibrahim",
    phone: "07056789012",
    email: "yusuf.i@outlook.com",
    type: "retail",
    totalSpent: 1450000,
    purchaseCount: 4,
    repairCount: 0,
    lastVisit: "2024-01-10",
    tags: ["Google user", "Tech-savvy"],
    isVIP: false,
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      (customer.email &&
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType =
      typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalCustomers = customers.length;
  const wholesaleCount = customers.filter((c) => c.type === "wholesale").length;
  const vipCount = customers.filter((c) => c.isVIP).length;

  const menuItems: MenuProps["items"] = [
    { key: "view", label: "View Profile" },
    { key: "sale", label: "Create Sale" },
    { key: "repair", label: "Create Repair" },
    { key: "edit", label: "Edit Customer" },
  ];

  return (
    <DashboardLayout
      title="Customers"
      description="Manage customer profiles and track purchase history"
    >
      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card style={{ borderRadius: 12, border: "1px solid #e5e7eb" }} bodyStyle={{ padding: 16 }}>
            <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
              Total Customers
            </Text>
            <Title level={3} style={{ margin: 0, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
              {totalCustomers}
            </Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: 12, border: "1px solid #e5e7eb" }} bodyStyle={{ padding: 16 }}>
            <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
              Retail
            </Text>
            <Title level={3} style={{ margin: 0, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
              {totalCustomers - wholesaleCount}
            </Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: 12, border: "1px solid #e5e7eb" }} bodyStyle={{ padding: 16 }}>
            <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
              Wholesale
            </Text>
            <Title level={3} style={{ margin: 0, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
              {wholesaleCount}
            </Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: 12, border: "1px solid #e5e7eb" }} bodyStyle={{ padding: 16 }}>
            <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
              VIP Customers
            </Text>
            <Title level={3} style={{ margin: 0, fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#1976d2" }}>
              {vipCount}
            </Title>
          </Card>
        </Col>
      </Row>

      {/* Actions Bar */}
      <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
        <Space>
          <Input
            placeholder="Search by name, phone, or email..."
            prefix={<Search style={{ color: "#8c8c8c" }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 320 }}
          />
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 140 }}
            suffixIcon={<Filter style={{ color: "#8c8c8c" }} />}
          >
            <Option value="all">All Types</Option>
            <Option value="retail">Retail</Option>
            <Option value="wholesale">Wholesale</Option>
          </Select>
        </Space>
        <Button type="primary" icon={<Plus />}>
          Add Customer
        </Button>
      </Space>

      {/* Customers Grid */}
      <Row gutter={[16, 16]}>
        {filteredCustomers.map((customer) => (
          <Col xs={24} sm={12} lg={8} key={customer.id}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                cursor: "pointer",
              }}
              bodyStyle={{ padding: 20 }}
              actions={[
                <Dropdown
                  key="menu"
                  menu={{ items: menuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreHorizontal />} />
                </Dropdown>,
              ]}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <Space>
                  <Avatar
                    size={48}
                    style={{
                      background: customer.isVIP
                        ? "#1976d2"
                        : "#f5f5f5",
                      color: customer.isVIP ? "#ffffff" : "#8c8c8c",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </Avatar>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Text strong style={{ fontSize: 16 }}>
                        {customer.name}
                      </Text>
                      {customer.isVIP && (
                        <Star style={{ color: "#1976d2", fill: "#1976d2", fontSize: 16 }} />
                      )}
                    </div>
                    <Badge
                      count={customer.type}
                      style={{
                        backgroundColor: customer.type === "wholesale" ? "#1890ff15" : undefined,
                        color: customer.type === "wholesale" ? "#1890ff" : undefined,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </Space>
              </div>

              <Space direction="vertical" size="small" style={{ width: "100%", marginBottom: 16 }}>
                <Space size="small">
                  <Phone style={{ color: "#8c8c8c", fontSize: 14 }} />
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    {customer.phone}
                  </Text>
                </Space>
                {customer.email && (
                  <Space size="small">
                    <Mail style={{ color: "#8c8c8c", fontSize: 14 }} />
                    <Text type="secondary" style={{ fontSize: 14 }} ellipsis>
                      {customer.email}
                    </Text>
                  </Space>
                )}
              </Space>

              <Row gutter={8} style={{ paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
                <Col span={8} style={{ textAlign: "center" }}>
                  <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", display: "block" }}>
                    ₦{(customer.totalSpent / 1000000).toFixed(1)}M
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Total Spent
                  </Text>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <Space size="small" style={{ justifyContent: "center" }}>
                    <ShoppingBag style={{ color: "#8c8c8c", fontSize: 14 }} />
                    <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                      {customer.purchaseCount}
                    </Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                    Purchases
                  </Text>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <Space size="small" style={{ justifyContent: "center" }}>
                    <Wrench style={{ color: "#8c8c8c", fontSize: 14 }} />
                    <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                      {customer.repairCount}
                    </Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                    Repairs
                  </Text>
                </Col>
              </Row>

              {customer.tags.length > 0 && (
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {customer.tags.map((tag) => (
                    <Tag key={tag} style={{ margin: 0 }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </DashboardLayout>
  );
};

export default Customers;