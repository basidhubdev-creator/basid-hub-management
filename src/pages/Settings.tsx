import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, Button, Input, Form, Switch, Tabs, Typography, Divider, Avatar } from "antd";
import type { TabsProps } from "antd";
import {
  Building2,
  Users,
  CreditCard,
  FileText,
  Bell,
  Upload,
} from "lucide-react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("organization");

  const users = [
    { name: "Adebayo Okonkwo", email: "adebayo@techhub.ng", role: "Admin" },
    { name: "Emeka Adeyemi", email: "emeka@techhub.ng", role: "Technician" },
    { name: "Tunde Bakare", email: "tunde@techhub.ng", role: "Technician" },
    { name: "Chioma Eze", email: "chioma@techhub.ng", role: "Sales" },
  ];

  const notificationPreferences = [
    { title: "Low Stock Alerts", description: "When items fall below minimum level" },
    { title: "Large Transactions", description: "Sales or expenses above ₦500,000" },
    { title: "New Investor Activity", description: "Contributions and payout requests" },
    { title: "Repair Status Updates", description: "When tickets change status" },
    { title: "Daily Summary", description: "End of day business summary" },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "organization",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Building2 style={{ fontSize: 16 }} />
          Organization
        </span>
      ),
      children: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <Card
            title={<Title level={5} style={{ margin: 0 }}>Shop Information</Title>}
            extra={<Text type="secondary" style={{ fontSize: 14 }}>Basic details about your business</Text>}
          >
            <Form layout="vertical" style={{ marginTop: 16 }}>
              <Form.Item label="Shop Name" name="shopName" initialValue="TechHub Nigeria">
                <Input />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone" initialValue="+234 812 345 6789">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" initialValue="hello@techhub.ng">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Address" name="address" initialValue="123 Computer Village, Ikeja, Lagos">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Save Changes</Button>
              </Form.Item>
            </Form>
          </Card>

          <Card
            title={<Title level={5} style={{ margin: 0 }}>Logo & Branding</Title>}
            extra={<Text type="secondary" style={{ fontSize: 14 }}>Customize your receipts and documents</Text>}
          >
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Building2 style={{ fontSize: 32, color: "#8c8c8c" }} />
                </div>
                <div>
                  <Button icon={<Upload />}>Upload Logo</Button>
                  <Text type="secondary" style={{ display: "block", fontSize: 12, marginTop: 4 }}>
                    PNG or JPG, max 2MB
                  </Text>
                </div>
              </div>
              <Divider />
              <Form layout="vertical">
                <Form.Item label="Tagline" name="tagline">
                  <Input placeholder="Your trusted tech partner" />
                </Form.Item>
                <Form.Item label="Website" name="website">
                  <Input placeholder="https://techhub.ng" />
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "users",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Users style={{ fontSize: 16 }} />
          Users & Roles
        </span>
      ),
      children: (
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>Team Members</Title>
                <Text type="secondary" style={{ fontSize: 14 }}>Manage user accounts and permissions</Text>
              </div>
              <Button type="primary" icon={<Users />}>
                Add User
              </Button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            {users.map((user) => (
              <div
                key={user.email}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  borderRadius: 8,
                  background: "#fafafa",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar
                    style={{
                      backgroundColor: "#1976d215",
                      color: "#1976d2",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <div>
                    <Text strong style={{ display: "block" }}>{user.name}</Text>
                    <Text type="secondary" style={{ fontSize: 14 }}>{user.email}</Text>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Text style={{ fontSize: 14, background: "#f5f5f5", padding: "4px 8px", borderRadius: 4 }}>
                    {user.role}
                  </Text>
                  <Button type="text">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      key: "financial",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CreditCard style={{ fontSize: 16 }} />
          Financial
        </span>
      ),
      children: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <Card
            title={<Title level={5} style={{ margin: 0 }}>Currency & Tax</Title>}
            extra={<Text type="secondary" style={{ fontSize: 14 }}>Configure financial settings</Text>}
          >
            <Form layout="vertical" style={{ marginTop: 16 }}>
              <Form.Item label="Primary Currency" name="currency" initialValue="NGN - Nigerian Naira">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Default Tax Rate (%)" name="tax" initialValue="7.5">
                <Input type="number" />
              </Form.Item>
              <Form.Item>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <Text strong style={{ fontSize: 14, display: "block" }}>Apply tax by default</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Automatically add tax to sales
                    </Text>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Form.Item>
              <Form.Item>
                <Button type="primary">Save Changes</Button>
              </Form.Item>
            </Form>
          </Card>

          <Card
            title={<Title level={5} style={{ margin: 0 }}>Invoice Settings</Title>}
            extra={<Text type="secondary" style={{ fontSize: 14 }}>Customize invoice numbering and terms</Text>}
          >
            <Form layout="vertical" style={{ marginTop: 16 }}>
              <Form.Item label="Invoice Prefix" name="prefix" initialValue="INV-">
                <Input />
              </Form.Item>
              <Form.Item label="Next Invoice Number" name="nextNum" initialValue="1247">
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Default Payment Terms (days)" name="terms" initialValue="7">
                <Input type="number" />
              </Form.Item>
            </Form>
          </Card>
        </div>
      ),
    },
    {
      key: "templates",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FileText style={{ fontSize: 16 }} />
          Templates
        </span>
      ),
      children: (
        <Card
          title={<Title level={5} style={{ margin: 0 }}>Document Templates</Title>}
          extra={<Text type="secondary" style={{ fontSize: 14 }}>Customize text that appears on printed documents</Text>}
        >
          <Form layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item label="Invoice Footer Text" name="invoiceFooter">
              <TextArea
                rows={4}
                defaultValue="Thank you for your business! Returns accepted within 7 days with original receipt. Warranty as per manufacturer terms."
              />
            </Form.Item>
            <Form.Item label="Repair Terms & Conditions" name="repairTerms">
              <TextArea
                rows={4}
                defaultValue="Repairs are warranted for 30 days from collection date. Customer must collect device within 14 days of completion. Uncollected devices may be disposed after 90 days."
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Save Templates</Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: "notifications",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell style={{ fontSize: 16 }} />
          Notifications
        </span>
      ),
      children: (
        <Card
          title={<Title level={5} style={{ margin: 0 }}>Notification Preferences</Title>}
          extra={<Text type="secondary" style={{ fontSize: 14 }}>Choose when and how to receive alerts</Text>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            {notificationPreferences.map((pref) => (
              <div
                key={pref.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  borderRadius: 8,
                  background: "#fafafa",
                }}
              >
                <div>
                  <Text strong style={{ fontSize: 14, display: "block" }}>{pref.title}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{pref.description}</Text>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </Card>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Settings"
      description="Manage your shop settings and preferences"
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
      />
    </DashboardLayout>
  );
};

export default Settings;
