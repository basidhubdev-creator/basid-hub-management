import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Phone,
  User,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Button,
  Input,
  Badge,
  Select,
  Table,
  Typography,
  Space,
  Row,
  Col,
  Card,
  Dropdown,
  Avatar,
} from "antd";
import type { ColumnsType } from "antd/es/table";

const { Option } = Select;
const { Text } = Typography;

interface RepairTicket {
  id: string;
  customer: string;
  phone: string;
  device: string;
  imei: string;
  issue: string;
  status: "new" | "diagnosing" | "waiting_parts" | "in_progress" | "ready" | "completed" | "cancelled";
  technician: string;
  dueDate: string;
  total: number;
  paid: number;
  createdAt: string;
}

const tickets: RepairTicket[] = [
  {
    id: "REP-2847",
    customer: "Chinedu Okafor",
    phone: "08123456789",
    device: "iPhone 14 Pro Max",
    imei: "356789012345678",
    issue: "Screen replacement - cracked display",
    status: "in_progress",
    technician: "Emeka A.",
    dueDate: "2024-01-17",
    total: 85000,
    paid: 40000,
    createdAt: "2024-01-15",
  },
  {
    id: "REP-2846",
    customer: "Amaka Eze",
    phone: "08098765432",
    device: "Samsung S23 Ultra",
    imei: "359876543210987",
    issue: "Battery replacement - not holding charge",
    status: "waiting_parts",
    technician: "Tunde B.",
    dueDate: "2024-01-18",
    total: 45000,
    paid: 20000,
    createdAt: "2024-01-14",
  },
  {
    id: "REP-2845",
    customer: "Blessing Adeyemi",
    phone: "07034567890",
    device: "iPhone 13",
    imei: "353456789012345",
    issue: "Water damage - not turning on",
    status: "diagnosing",
    technician: "Emeka A.",
    dueDate: "2024-01-16",
    total: 0,
    paid: 5000,
    createdAt: "2024-01-15",
  },
  {
    id: "REP-2844",
    customer: "Yusuf Ibrahim",
    phone: "08145678901",
    device: "Google Pixel 7 Pro",
    imei: "357654321098765",
    issue: "Charging port repair",
    status: "ready",
    technician: "Tunde B.",
    dueDate: "2024-01-16",
    total: 25000,
    paid: 25000,
    createdAt: "2024-01-13",
  },
  {
    id: "REP-2843",
    customer: "Ngozi Umeh",
    phone: "09087654321",
    device: "iPhone 15 Pro",
    imei: "352345678901234",
    issue: "Back glass replacement",
    status: "new",
    technician: "",
    dueDate: "2024-01-19",
    total: 55000,
    paid: 0,
    createdAt: "2024-01-16",
  },
  {
    id: "REP-2842",
    customer: "David Oluwole",
    phone: "08167890123",
    device: "Samsung A54",
    imei: "354567890123456",
    issue: "Software issue - boot loop",
    status: "completed",
    technician: "Emeka A.",
    dueDate: "2024-01-14",
    total: 15000,
    paid: 15000,
    createdAt: "2024-01-12",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  new: { label: "New", color: "#1890ff", icon: AlertCircle },
  diagnosing: { label: "Diagnosing", color: "#faad14", icon: Wrench },
  waiting_parts: { label: "Waiting Parts", color: "#ff4d4f", icon: Clock },
  in_progress: { label: "In Progress", color: "#1976d2", icon: Wrench },
  ready: { label: "Ready", color: "#52c41a", icon: CheckCircle2 },
  completed: { label: "Completed", color: "#8c8c8c", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "#8c8c8c", icon: AlertCircle },
};

const Repairs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.imei.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: tickets.length,
    new: tickets.filter((t) => t.status === "new").length,
    in_progress: tickets.filter((t) => ["diagnosing", "in_progress", "waiting_parts"].includes(t.status)).length,
    ready: tickets.filter((t) => t.status === "ready").length,
    completed: tickets.filter((t) => t.status === "completed").length,
  };

  const columns: ColumnsType<RepairTicket> = [
    {
      title: "Ticket ID",
      dataIndex: "id",
      width: 120,
      render: (id: string) => (
        <Link
          to={`/repairs/${id}`}
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontWeight: 500,
            color: "#1976d2",
          }}
        >
          {id}
        </Link>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (_: string, record: RepairTicket) => (
        <Space>
          <Avatar size="small" icon={<User />} style={{ backgroundColor: "#f5f5f5", color: "#8c8c8c" }} />
          <div>
            <Text strong style={{ fontSize: 14 }}>
              {record.customer}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.phone}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Device",
      dataIndex: "device",
      render: (device: string) => (
        <Space>
          <Phone style={{ color: "#8c8c8c", fontSize: 14 }} />
          <Text style={{ fontSize: 14 }}>{device}</Text>
        </Space>
      ),
    },
    {
      title: "Issue",
      dataIndex: "issue",
      ellipsis: { showTitle: false },
      render: (issue: string) => (
        <Text style={{ fontSize: 14 }} ellipsis={{ tooltip: issue }}>
          {issue}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const config = statusConfig[status];
        const StatusIcon = config.icon;
        return (
          <Badge
            color={config.color}
            text={
              <Space size="small">
                <StatusIcon className="h-4 w-4" />
                {config.label}
              </Space>
            }
          />
        );
      },
    },
    {
      title: "Technician",
      dataIndex: "technician",
      render: (technician: string) => (
        <Text style={{ fontSize: 14 }}>
          {technician || <Text type="secondary" italic>Unassigned</Text>}
        </Text>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (date: string) => (
        <Space size="small">
          <Calendar style={{ color: "#8c8c8c", fontSize: 12 }} />
          <Text style={{ fontSize: 14 }}>{date}</Text>
        </Space>
      ),
    },
    {
      title: "Balance",
      align: "right",
      render: (_: string, record: RepairTicket) => {
        const balance = record.total - record.paid;
        return balance > 0 ? (
          <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#ff4d4f" }}>
            ₦{balance.toLocaleString()}
          </Text>
        ) : (
          <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#52c41a" }}>
            Paid
          </Text>
        );
      },
    },
    {
      title: "",
      width: 50,
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "view", label: "View Details" },
              { key: "update", label: "Update Status" },
              { key: "payment", label: "Add Payment" },
              { key: "print", label: "Print Ticket" },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreHorizontal />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <DashboardLayout title="Repairs" description="Manage repair tickets and track progress">
      {/* Status Overview Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {[
          { key: "all", label: "All Tickets", color: "#e5e7eb" },
          { key: "new", label: "New", color: "#1890ff" },
          { key: "in_progress", label: "In Progress", color: "#1976d2" },
          { key: "ready", label: "Ready", color: "#52c41a" },
          { key: "completed", label: "Completed", color: "#8c8c8c" },
        ].map((status) => (
          <Col span={4} key={status.key}>
            <Card
              hoverable
              onClick={() => setStatusFilter(status.key)}
              style={{
                borderRadius: 12,
                border: `2px solid ${statusFilter === status.key ? status.color : "transparent"}`,
                cursor: "pointer",
                background: statusFilter === status.key ? "#fff" : "#fafafa",
              }}
              bodyStyle={{ padding: 16 }}
            >
              <Text strong style={{ fontSize: 24, fontFamily: "'JetBrains Mono', ui-monospace, monospace", display: "block", marginBottom: 4 }}>
                {statusCounts[status.key as keyof typeof statusCounts]}
              </Text>
              <Text type="secondary" style={{ fontSize: 14 }}>
                {status.label}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Actions Bar */}
      <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
        <Space>
          <Input
            placeholder="Search tickets, customers, IMEI..."
            prefix={<Search style={{ color: "#8c8c8c" }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 320 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            suffixIcon={<Filter style={{ color: "#8c8c8c" }} />}
          >
            <Option value="all">All Status</Option>
            <Option value="new">New</Option>
            <Option value="diagnosing">Diagnosing</Option>
            <Option value="waiting_parts">Waiting Parts</Option>
            <Option value="in_progress">In Progress</Option>
            <Option value="ready">Ready</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Space>
        <Link to="/repairs/new">
          <Button type="primary" icon={<Plus />}>
            New Ticket
          </Button>
        </Link>
      </Space>

      {/* Tickets Table */}
      <Card style={{ borderRadius: 12, border: "1px solid #e5e7eb" }} bodyStyle={{ padding: 0 }}>
        <Table
          columns={columns}
          dataSource={filteredTickets}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </Card>
    </DashboardLayout>
  );
};

export default Repairs;