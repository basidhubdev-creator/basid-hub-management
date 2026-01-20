import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Clock,
  Wrench,
  Camera,
  CreditCard,
  Printer,
  Edit2,
  Plus,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, Badge, Card, Divider, Input, Progress, Typography, Space, Row, Col } from "antd";

const { TextArea } = Input;
const { Title, Text } = Typography;

const statusSteps = [
  { key: "new", label: "New", icon: AlertCircle },
  { key: "diagnosing", label: "Diagnosing", icon: Wrench },
  { key: "waiting_parts", label: "Waiting Parts", icon: Clock },
  { key: "in_progress", label: "In Progress", icon: Wrench },
  { key: "ready", label: "Ready", icon: CheckCircle2 },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
];

const mockTicket = {
  id: "REP-2847",
  customer: {
    name: "Chinedu Okafor",
    phone: "08123456789",
    email: "chinedu.okafor@email.com",
    address: "123 Victoria Island, Lagos",
  },
  device: {
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    color: "Deep Purple",
    imei: "356789012345678",
    condition: "Good - Minor scratches on back",
    photos: [],
  },
  issue: "Screen replacement - Display is cracked and unresponsive in some areas. Customer dropped phone on concrete floor.",
  status: "in_progress",
  technician: "Emeka Adeyemi",
  createdAt: "2024-01-15 09:30 AM",
  dueDate: "2024-01-17",
  estimate: 85000,
  deposit: 40000,
  parts: [
    { name: "iPhone 14 Pro Max OLED Screen", qty: 1, cost: 55000, price: 70000 },
    { name: "Screen Adhesive Kit", qty: 1, cost: 2000, price: 5000 },
  ],
  labor: 10000,
  payments: [
    { date: "2024-01-15", method: "Transfer", amount: 40000, ref: "TRF-8847261" },
  ],
  notes: [
    { date: "2024-01-15 10:00", author: "Emeka A.", text: "Device received. Initial inspection complete. Screen badly cracked, touch not responsive on left side." },
    { date: "2024-01-15 14:30", author: "Emeka A.", text: "Parts ordered. Expected delivery tomorrow." },
    { date: "2024-01-16 11:00", author: "Emeka A.", text: "Parts received. Starting repair now." },
  ],
};

const RepairDetail = () => {
  const { id } = useParams();
  const [newNote, setNewNote] = useState("");

  const ticket = mockTicket;
  const currentStepIndex = Math.max(0, statusSteps.findIndex((s) => s.key === ticket.status));
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  const partsTotal = ticket.parts.reduce((sum, p) => sum + p.price * p.qty, 0);
  const grandTotal = partsTotal + ticket.labor;
  const totalPaid = ticket.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = grandTotal - totalPaid;

  return (
    <DashboardLayout
      title={`Ticket ${id}`}
      description="Repair ticket details and progress"
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/repairs">
            <Button type="text" icon={<ArrowLeft style={{ fontSize: 16 }} />} />
          </Link>
          <div>
            <Space align="center" size="small">
              <Title level={2} style={{ margin: 0 }}>{ticket.id}</Title>
              <Badge status="processing" text="In Progress" />
            </Space>
            <Text type="secondary" style={{ display: "block", marginTop: 4 }}>
              Created {ticket.createdAt} · Due {ticket.dueDate}
            </Text>
          </div>
        </div>
        <Space>
          <Button icon={<Printer style={{ fontSize: 16 }} />}>
            Print Ticket
          </Button>
          <Button icon={<CreditCard style={{ fontSize: 16 }} />}>
            Add Payment
          </Button>
          <Button type="primary" icon={<Edit2 style={{ fontSize: 16 }} />}>
            Update Status
          </Button>
        </Space>
      </div>

      {/* Status Timeline */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ paddingTop: 24 }}>
          <Progress percent={progress} style={{ marginBottom: 24 }} />
          <Row justify="space-between">
            {statusSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <Col key={step.key} span={3}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: `2px solid ${isCurrent ? "#1976d2" : isActive ? "#1976d2" : "#d9d9d9"}`,
                        backgroundColor: isCurrent ? "#1976d2" : isActive ? "rgba(25, 118, 210, 0.1)" : "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isCurrent ? "#fff" : isActive ? "#1976d2" : "#8c8c8c",
                      }}
                    >
                      <StepIcon style={{ fontSize: 20 }} />
                    </div>
                    <Text type={isActive ? undefined : "secondary"} style={{ fontSize: 12, fontWeight: 500 }}>
                      {step.label}
                    </Text>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Card>

      <Row gutter={24}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Customer & Device */}
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Card 
                title={
                  <Space>
                    <User style={{ fontSize: 16 }} />
                    Customer
                  </Space>
                }
                style={{ height: "100%" }}
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <Text strong>{ticket.customer.name}</Text>
                  <Space>
                    <Phone style={{ fontSize: 16 }} />
                    <Text type="secondary">{ticket.customer.phone}</Text>
                  </Space>
                  <Space>
                    <Mail style={{ fontSize: 16 }} />
                    <Text type="secondary">{ticket.customer.email}</Text>
                  </Space>
                  <Button type="link" style={{ padding: 0 }}>
                    View customer history →
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card 
                title={
                  <Space>
                    <Phone style={{ fontSize: 16 }} />
                    Device
                  </Space>
                }
                style={{ height: "100%" }}
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <div>
                    <Text strong>
                      {ticket.device.brand} {ticket.device.model}
                    </Text>
                    <br />
                    <Text type="secondary">{ticket.device.color}</Text>
                  </div>
                  <Text type="secondary">
                    IMEI: <Text code>{ticket.device.imei}</Text>
                  </Text>
                  <Text type="secondary">
                    Condition: {ticket.device.condition}
                  </Text>
                  <Button block icon={<Camera style={{ fontSize: 16 }} />}>
                    View/Add Photos
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Problem Description */}
          <Card title="Problem Description">
            <Text>{ticket.issue}</Text>
          </Card>

          {/* Parts & Labor */}
          <Card 
            title="Parts & Labor"
            extra={
              <Button type="text" size="small" icon={<Plus style={{ fontSize: 16 }} />}>
                Add Item
              </Button>
            }
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {ticket.parts.map((part, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: "#fafafa"
                  }}
                >
                  <div>
                    <Text strong style={{ fontSize: 14 }}>{part.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Qty: {part.qty} · Cost: ₦{part.cost.toLocaleString()}
                    </Text>
                  </div>
                  <Text code strong>
                    ₦{part.price.toLocaleString()}
                  </Text>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: "#fafafa"
                }}
              >
                <div>
                  <Text strong style={{ fontSize: 14 }}>Labor</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>Repair service</Text>
                </div>
                <Text code strong>
                  ₦{ticket.labor.toLocaleString()}
                </Text>
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>Total</Text>
                <Text code strong style={{ fontSize: 18 }}>
                  ₦{grandTotal.toLocaleString()}
                </Text>
              </div>
            </Space>
          </Card>

          {/* Notes */}
          <Card 
            title={
              <Space>
                <MessageSquare style={{ fontSize: 16 }} />
                Technician Notes
              </Space>
            }
          >
            <Space direction="vertical" size="middle" style={{ width: "100%", marginBottom: 16 }}>
              {ticket.notes.map((note, index) => (
                <div key={index} style={{ display: "flex", gap: 12 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <User style={{ fontSize: 16, color: "#8c8c8c" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Space size="small" style={{ marginBottom: 4 }}>
                      <Text strong style={{ fontSize: 14 }}>{note.author}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {note.date}
                      </Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: 14 }}>{note.text}</Text>
                  </div>
                </div>
              ))}
            </Space>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <TextArea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button size="small" disabled={!newNote.trim()}>
                Add Note
              </Button>
            </Space>
          </Card>
          </Space>
        </Col>

        {/* Right Column - Payment Summary */}
        <Col xs={24} lg={8}>
        <Card 
          title="Payment Summary"
          style={{ position: "sticky", top: 96 }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Parts</Text>
                <Text code>₦{partsTotal.toLocaleString()}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Labor</Text>
                <Text code>₦{ticket.labor.toLocaleString()}</Text>
              </div>
              <Divider style={{ margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>Total</Text>
                <Text code strong>₦{grandTotal.toLocaleString()}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Paid</Text>
                <Text code style={{ color: "#52c41a" }}>
                  -₦{totalPaid.toLocaleString()}
                </Text>
              </div>
              <Divider style={{ margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>Balance Due</Text>
                <Text code strong style={{ fontSize: 18, color: balance > 0 ? "#ff4d4f" : "#52c41a" }}>
                  ₦{balance.toLocaleString()}
                </Text>
              </div>
            </Space>

            <Button type="primary" block icon={<CreditCard style={{ fontSize: 16 }} />}>
              Record Payment
            </Button>

            <div>
              <Text strong style={{ fontSize: 14, display: "block", marginBottom: 12 }}>
                Payment History
              </Text>
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {ticket.payments.map((payment, index) => (
                  <div
                    key={index}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: "#fafafa"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text strong style={{ fontSize: 14 }}>{payment.method}</Text>
                      <Text code style={{ fontSize: 14, color: "#52c41a" }}>
                        +₦{payment.amount.toLocaleString()}
                      </Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>{payment.date}</Text>
                      <Text code style={{ fontSize: 12 }}>{payment.ref}</Text>
                    </div>
                  </div>
                ))}
              </Space>
            </div>
          </Space>
        </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default RepairDetail;
