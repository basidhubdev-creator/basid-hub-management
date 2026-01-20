import { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  X,
  ShoppingCart,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  Input,
  Button,
  Badge,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Radio,
} from "antd";

const { Title, Text } = Typography;

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: "phone" | "accessory" | "service";
  condition?: "new" | "used";
}

interface CartItem extends Product {
  quantity: number;
  discount: number;
}

const products: Product[] = [
  { id: "1", name: "iPhone 15 Pro Max 256GB", sku: "IPH15PM256", price: 850000, stock: 5, category: "phone", condition: "new" },
  { id: "2", name: "iPhone 14 Pro 128GB", sku: "IPH14P128", price: 520000, stock: 3, category: "phone", condition: "new" },
  { id: "3", name: "Samsung S24 Ultra 512GB", sku: "SAMS24U512", price: 780000, stock: 4, category: "phone", condition: "new" },
  { id: "4", name: "iPhone 13 Pro (UK Used)", sku: "IPH13P-UK", price: 320000, stock: 2, category: "phone", condition: "used" },
  { id: "5", name: "AirPods Pro 2nd Gen", sku: "APP2G", price: 125000, stock: 8, category: "accessory" },
  { id: "6", name: "Samsung Galaxy Buds 2 Pro", sku: "SGB2P", price: 85000, stock: 6, category: "accessory" },
  { id: "7", name: "USB-C to Lightning Cable", sku: "USBCL", price: 5000, stock: 45, category: "accessory" },
  { id: "8", name: "Tempered Glass (Universal)", sku: "TGUNI", price: 2500, stock: 100, category: "accessory" },
  { id: "9", name: "Screen Replacement Service", sku: "SVC-SCR", price: 25000, stock: 999, category: "service" },
  { id: "10", name: "Battery Replacement Service", sku: "SVC-BAT", price: 15000, stock: 999, category: "service" },
];

const paymentMethods = [
  { id: "cash", name: "Cash", icon: Banknote },
  { id: "transfer", name: "Transfer", icon: CreditCard },
  { id: "pos", name: "POS", icon: Smartphone },
];

const Sales = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [customerName, setCustomerName] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cart.reduce((sum, item) => sum + item.discount, 0);
  const tax = 0;
  const grandTotal = subtotal - totalDiscount + tax;
  const change =
    amountPaid && parseFloat(amountPaid) > grandTotal
      ? parseFloat(amountPaid) - grandTotal
      : 0;

  const handleCheckout = () => {
    setCart([]);
    setAmountPaid("");
    setCustomerName("");
  };

  const categoryColors = {
    phone: { color: "#000000", bg: "#00000015" },
    accessory: { color: "#1890ff", bg: "#1890ff15" },
    service: { color: "#52c41a", bg: "#52c41a15" },
  };

  return (
    <DashboardLayout title="Sales / POS" description="Create new sales and process payments">
      <Row gutter={24} style={{ height: "calc(100vh - 10rem)" }}>
        {/* Products Section */}
        <Col flex="1 1 0" style={{ display: "flex", flexDirection: "column" }}>
          {/* Search & Filters */}
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search by name, SKU, or IMEI..."
              prefix={<Search style={{ color: "#8c8c8c" }} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: 400 }}
            />
            <Radio.Group
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="phone">Phones</Radio.Button>
              <Radio.Button value="accessory">Accessories</Radio.Button>
              <Radio.Button value="service">Services</Radio.Button>
            </Radio.Group>
          </Space>

          {/* Products Grid */}
          <div style={{ flex: 1, overflow: "auto" }}>
            <Row gutter={[12, 12]}>
              {filteredProducts.map((product) => {
                const catColor = categoryColors[product.category];
                return (
                  <Col xs={24} sm={12} xl={8} key={product.id}>
                    <Card
                      hoverable
                      onClick={() => addToCart(product)}
                      style={{
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                        cursor: "pointer",
                      }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Badge
                            style={{
                              background: catColor.bg,
                              color: catColor.color,
                              border: "none",
                              padding: "4px 8px",
                            }}
                          >
                            {product.category}
                          </Badge>
                          {product.condition && (
                            <Badge
                              style={{
                                borderColor: product.condition === "used" ? "#faad14" : undefined,
                                color: product.condition === "used" ? "#faad14" : undefined,
                              }}
                            >
                              {product.condition}
                            </Badge>
                          )}
                        </div>
                        <Title level={5} style={{ margin: 0, fontSize: 14 }}>
                          {product.name}
                        </Title>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {product.sku}
                        </Text>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                            ₦{product.price.toLocaleString()}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {product.stock} in stock
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>

        {/* Cart Section */}
        <Col span={8}>
          <Card
            title={
              <Space>
                <ShoppingCart />
                Cart
                {cart.length > 0 && <Badge count={cart.reduce((sum, item) => sum + item.quantity, 0)} />}
              </Space>
            }
            extra={
              cart.length > 0 && (
                <Button type="text" danger onClick={() => setCart([])}>
                  Clear
                </Button>
              )
            }
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            bodyStyle={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            {/* Customer Selector */}
            <Input
              placeholder="Walk-in customer or search..."
              prefix={<User style={{ color: "#8c8c8c" }} />}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ marginBottom: 16 }}
            />

            {/* Cart Items */}
            <div style={{ flex: 1, overflow: "auto", marginBottom: 16 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <ShoppingCart style={{ fontSize: 48, color: "#d9d9d9", marginBottom: 12 }} />
                  <Text type="secondary">Cart is empty</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Click products to add them
                  </Text>
                </div>
              ) : (
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  {cart.map((item) => (
                    <Card
                      key={item.id}
                      size="small"
                      style={{ background: "#fafafa" }}
                      bodyStyle={{ padding: 12 }}
                    >
                      <Space style={{ width: "100%", justifyContent: "space-between" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Text strong style={{ display: "block", fontSize: 14 }}>
                            {item.name}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            ₦{item.price.toLocaleString()} each
                          </Text>
                        </div>
                        <Space>
                          <Space.Compact>
                            <Button
                              icon={<Minus />}
                              onClick={() => updateQuantity(item.id, -1)}
                              size="small"
                            />
                            <Input
                              readOnly
                              value={item.quantity}
                              style={{
                                width: 50,
                                textAlign: "center",
                                fontWeight: 500,
                              }}
                            />
                            <Button
                              icon={<Plus />}
                              onClick={() => updateQuantity(item.id, 1)}
                              size="small"
                            />
                          </Space.Compact>
                          <Button
                            type="text"
                            danger
                            icon={<X />}
                            onClick={() => removeFromCart(item.id)}
                            size="small"
                          />
                        </Space>
                      </Space>
                    </Card>
                  ))}
                </Space>
              )}
            </div>

            {/* Totals */}
            <div>
              <Space direction="vertical" size="small" style={{ width: "100%", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text type="secondary">Subtotal</Text>
                  <Text strong style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                    ₦{subtotal.toLocaleString()}
                  </Text>
                </div>
                {totalDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text type="secondary">Discount</Text>
                    <Text strong style={{ color: "#52c41a", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                      -₦{totalDiscount.toLocaleString()}
                    </Text>
                  </div>
                )}
                <Divider style={{ margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text strong>Total</Text>
                  <Title level={4} style={{ margin: 0, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                    ₦{grandTotal.toLocaleString()}
                  </Title>
                </div>
              </Space>

              {/* Payment Methods */}
              <Radio.Group
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                style={{ width: "100%", marginBottom: 16 }}
              >
                <Row gutter={8}>
                  {paymentMethods.map((method) => {
                    const MethodIcon = method.icon;
                    return (
                      <Col span={8} key={method.id}>
                        <Radio.Button value={method.id} style={{ width: "100%", textAlign: "center", height: 64, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <MethodIcon style={{ fontSize: 20, marginBottom: 4 }} />
                          <Text style={{ fontSize: 12 }}>{method.name}</Text>
                        </Radio.Button>
                      </Col>
                    );
                  })}
                </Row>
              </Radio.Group>

              {/* Amount Input */}
              <Input
                type="number"
                placeholder="Amount paid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                style={{
                  textAlign: "center",
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              />
              {change > 0 && (
                <Text style={{ display: "block", textAlign: "center", color: "#52c41a", marginBottom: 16 }}>
                  Change: ₦{change.toLocaleString()}
                </Text>
              )}

              {/* Action Buttons */}
              <Space style={{ width: "100%" }} size="small">
                <Button block disabled={cart.length === 0}>
                  Save Draft
                </Button>
                <Button
                  type="primary"
                  block
                  icon={<Receipt />}
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                >
                  Complete
                </Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default Sales;