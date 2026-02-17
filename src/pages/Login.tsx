import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined, MobileOutlined } from "@ant-design/icons";
import { Button, Input, Card, Form, Typography, Divider, Grid, Flex, Space, theme } from "antd";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { useToken } = theme;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const screens = useBreakpoint();
  const { token } = useToken();

  const handleSubmit = async (_values: { email: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    navigate("/dashboard");
  };

  const isLargeScreen = screens.lg;
  const isXLargeScreen = screens.xl;

  return (
    <Flex
      style={{ 
        minHeight: "100vh", 
        background: `linear-gradient(180deg, ${token.colorBgLayout} 0%, #f1f5f9 100%)`,
      }}
    >
      {/* Left Panel - Branding */}
      <div style={{
        display: isLargeScreen ? "flex" : "none",
        width: isXLargeScreen ? "60%" : "50%",
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: 80,
          left: 80,
          width: 256,
          height: 256,
          borderRadius: "50%",
          background: `rgba(${parseInt(token.colorPrimary.slice(1, 3), 16)}, ${parseInt(token.colorPrimary.slice(3, 5), 16)}, ${parseInt(token.colorPrimary.slice(5, 7), 16)}, 0.1)`,
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: 80,
          right: 80,
          width: 384,
          height: 384,
          borderRadius: "50%",
          background: "rgba(245, 158, 11, 0.05)",
          filter: "blur(60px)",
        }} />
        
        <Flex
          vertical
          justify="space-between"
          style={{
            position: "relative",
            zIndex: 10,
            padding: token.paddingXL * 2,
            width: "100%",
          }}
        >
          {/* Logo */}
          <Flex align="center" gap={token.margin}>
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
              <Title level={2} style={{ color: "#f1f5f9", margin: 0 }}>
                Basid Hub
              </Title>
              <Text style={{ color: "rgba(241, 245, 249, 0.7)", fontSize: token.fontSize }}>
                Management Portal
              </Text>
            </Space>
          </Flex>

          {/* Footer */}
          <Text style={{ color: "rgba(241, 245, 249, 0.5)", fontSize: token.fontSize }}>
            © 2024 ShopFlow. Built for Nigerian entrepreneurs.
          </Text>
        </Flex>
      </div>

      {/* Right Panel - Login Form */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        style={{ padding: token.paddingLG }}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Mobile Logo */}
          <Flex
            align="center"
            justify="center"
            gap={token.margin}
            style={{
              display: isLargeScreen ? "none" : "flex",
              marginBottom: token.marginXL,
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: token.borderRadiusLG,
              background: token.colorBgContainer,
              border: `1px solid ${token.colorBorder}`,
              boxShadow: token.boxShadowSecondary,
            }}>
              <MobileOutlined style={{ fontSize: 20, color: "#000000" }} />
            </div>
            <Space direction="vertical" size={0}>
              <Title level={4} style={{ margin: 0 }}>ShopFlow</Title>
              <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                Phone Shop Manager
              </Text>
            </Space>
          </Flex>

          <Card style={{ boxShadow: token.boxShadow }}>
            <Space direction="vertical" size={token.marginLG} style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <Title level={2} style={{ marginBottom: token.marginXS }}>Welcome back</Title>
                <Text type="secondary">Sign in to your account to continue</Text>
              </div>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
              >
                <Form.Item
                  name="email"
                  label="Email or Phone"
                  rules={[{ required: true, message: "Please input your email or phone!" }]}
                >
                  <Input placeholder="you@example.com" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={
                    <Flex justify="space-between" style={{ width: "100%" }}>
                      <span>Password</span>
                      <Button type="link" style={{ padding: 0, height: "auto" }}>
                        Forgot password?
                      </Button>
                    </Flex>
                  }
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="••••••••" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isLoading}
                    icon={!isLoading && <ArrowRightOutlined />}
                    iconPosition="end"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>

              <Divider plain>Or</Divider>

              <Button
                block
                onClick={() => navigate("/investor/login")}
              >
                Sign in as Investor
              </Button>
            </Space>
          </Card>

          <div style={{ marginTop: token.marginLG, textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: token.fontSize }}>
              Don't have an account?{" "}
              <Button type="link" style={{ padding: 0, height: "auto" }}>
                Contact admin
              </Button>
            </Text>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default Login;
