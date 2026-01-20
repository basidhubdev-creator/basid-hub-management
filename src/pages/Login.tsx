import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, ArrowRight } from "lucide-react";
import { Button, Input, Card, Form, Typography, Divider, Grid } from "antd";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const screens = useBreakpoint();

  const handleSubmit = async (_values: { email: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    navigate("/dashboard");
  };

  const isLargeScreen = screens.lg;
  const isXLargeScreen = screens.xl;

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
      display: "flex"
    }}>
      {/* Left Panel - Branding */}
      <div style={{
        display: isLargeScreen ? "flex" : "none",
        width: isXLargeScreen ? "60%" : "50%",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          opacity: 0.9,
        }} />
        
        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: 80,
          left: 80,
          width: 256,
          height: 256,
          borderRadius: "50%",
          background: "rgba(25, 118, 210, 0.1)",
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
        
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              background: "#ffffff",
              border: "1px solid #e0e0e0",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}>
              <img src="/logo.png" alt="logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
            </div>
            <div>
              <Title level={2} style={{ color: "#f1f5f9", margin: 0 }}>
                Basid Hub
              </Title>
              <Text style={{ color: "rgba(241, 245, 249, 0.7)", fontSize: 14 }}>
                Management Portal
              </Text>
            </div>
          </div>

          {/* Hero Content */}
          {/* <div style={{ maxWidth: 512 }}>
            <Title level={1} style={{ 
              color: "#f1f5f9", 
              fontSize: 40,
              marginBottom: 24,
              lineHeight: 1.2,
            }}>
              Manage your phone business with confidence
            </Title>
            <Text style={{ 
              color: "rgba(241, 245, 249, 0.8)", 
              fontSize: 18,
              marginBottom: 32,
              display: "block",
            }}>
              Complete inventory, sales, repairs, and investor management – all in one powerful platform built for Nigerian businesses.
            </Text> */}
            
            {/* Features */}
            {/* <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}>
              {[
                "Inventory & POS",
                "Repair Tracking",
                "Investor Portal",
                "NGN & Multi-currency",
              ].map((feature) => (
                <div
                  key={feature}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(241, 245, 249, 0.9)",
                    fontSize: 14,
                  }}
                >
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#1976d2",
                  }} />
                  {feature}
                </div>
              ))}
            </div>
          </div> */}

          {/* Footer */}
          <Text style={{ color: "rgba(241, 245, 249, 0.5)", fontSize: 14 }}>
            © 2024 ShopFlow. Built for Nigerian entrepreneurs.
          </Text>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Mobile Logo */}
          <div style={{
            display: isLargeScreen ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 32,
          }}>
            <div style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              background: "#ffffff",
              border: "1px solid #e0e0e0",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}>
              <Smartphone style={{ width: 20, height: 20, color: "#000000" }} />
            </div>
            <div>
              <Title level={4} style={{ margin: 0 }}>ShopFlow</Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Phone Shop Manager
              </Text>
            </div>
          </div>

          <Card style={{ boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.04)" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 8 }}>Welcome back</Title>
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
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>Password</span>
                    <Button type="link" style={{ padding: 0, height: "auto" }}>
                      Forgot password?
                    </Button>
                  </div>
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
                  icon={!isLoading && <ArrowRight />}
                  iconPosition="end"
                  style={{ height: 44 }}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>Or</Divider>

            <Button
              block
              onClick={() => navigate("/investor/login")}
              style={{ height: 44 }}
            >
              Sign in as Investor
            </Button>
          </Card>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Don't have an account?{" "}
              <Button type="link" style={{ padding: 0, height: "auto" }}>
                Contact admin
              </Button>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
