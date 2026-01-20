import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Package,
  Smartphone,
  Headphones,
  Wrench,
  AlertTriangle,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Upload,
} from "lucide-react";
import { Card, Input, Button, Badge, Select, Table, Dropdown, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const { Title, Text } = Typography;
const { Option } = Select;

interface Product {
  id: string;
  sku: string;
  name: string;
  category: "phone" | "accessory" | "part" | "service";
  brand: string;
  condition: "new" | "used";
  stock: number;
  minStock: number;
  costPrice: number;
  sellingPrice: number;
  imei?: string;
}

const products: Product[] = [
  { id: "1", sku: "IPH15PM256", name: "iPhone 15 Pro Max 256GB", category: "phone", brand: "Apple", condition: "new", stock: 5, minStock: 3, costPrice: 720000, sellingPrice: 850000 },
  { id: "2", sku: "IPH14P128", name: "iPhone 14 Pro 128GB", category: "phone", brand: "Apple", condition: "new", stock: 3, minStock: 2, costPrice: 440000, sellingPrice: 520000 },
  { id: "3", sku: "SAMS24U512", name: "Samsung S24 Ultra 512GB", category: "phone", brand: "Samsung", condition: "new", stock: 4, minStock: 2, costPrice: 680000, sellingPrice: 780000 },
  { id: "4", sku: "IPH13P-UK", name: "iPhone 13 Pro (UK Used)", category: "phone", brand: "Apple", condition: "used", stock: 2, minStock: 1, costPrice: 250000, sellingPrice: 320000, imei: "352847109283746" },
  { id: "5", sku: "APP2G", name: "AirPods Pro 2nd Gen", category: "accessory", brand: "Apple", condition: "new", stock: 8, minStock: 5, costPrice: 95000, sellingPrice: 125000 },
  { id: "6", sku: "SGB2P", name: "Samsung Galaxy Buds 2 Pro", category: "accessory", brand: "Samsung", condition: "new", stock: 6, minStock: 4, costPrice: 65000, sellingPrice: 85000 },
  { id: "7", sku: "PRT-IPH15SCR", name: "iPhone 15 Pro Max Screen (OLED)", category: "part", brand: "Apple", condition: "new", stock: 2, minStock: 5, costPrice: 55000, sellingPrice: 70000 },
  { id: "8", sku: "PRT-SAMS24BAT", name: "Samsung S24 Battery", category: "part", brand: "Samsung", condition: "new", stock: 3, minStock: 5, costPrice: 12000, sellingPrice: 18000 },
  { id: "9", sku: "USBCL", name: "USB-C to Lightning Cable (1m)", category: "accessory", brand: "Generic", condition: "new", stock: 45, minStock: 20, costPrice: 2500, sellingPrice: 5000 },
  { id: "10", sku: "TGUNI", name: "Tempered Glass (Universal)", category: "accessory", brand: "Generic", condition: "new", stock: 12, minStock: 15, costPrice: 800, sellingPrice: 2500 },
];

const categoryConfig = {
  phone: { label: "Phones", icon: Smartphone, color: "blue" },
  accessory: { label: "Accessories", icon: Headphones, color: "cyan" },
  part: { label: "Parts", icon: Wrench, color: "orange" },
  service: { label: "Services", icon: Package, color: "green" },
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.imei && product.imei.includes(searchQuery));
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock <= product.minStock) ||
      (stockFilter === "out" && product.stock === 0);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalValue = products.reduce(
    (sum, p) => sum + p.costPrice * p.stock,
    0
  );
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  const getDropdownMenu = (): MenuProps => ({
    items: [
      { key: "view", label: "View Details" },
      { key: "edit", label: "Edit Product" },
      { key: "adjust", label: "Adjust Stock" },
      { type: "divider" },
      { key: "history", label: "View History" },
      { key: "delete", label: "Delete", danger: true },
    ],
  });

  const columns: ColumnsType<Product> = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 100,
      render: (sku: string) => <Text code>{sku}</Text>,
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div>
          <Text strong>{record.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.brand}
            {record.imei && (
              <span style={{ marginLeft: 8, fontFamily: "monospace" }}>
                IMEI: {record.imei}
              </span>
            )}
          </Text>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => {
        const config = categoryConfig[category as keyof typeof categoryConfig];
        const Icon = config.icon;
        return (
          <Badge color={config.color} text={config.label}>
            <Icon style={{ fontSize: 12, marginRight: 4 }} />
          </Badge>
        );
      },
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      render: (condition: string) => (
        <Badge
          status={condition === "used" ? "warning" : "default"}
          text={condition}
        />
      ),
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          Stock
          <ArrowUpDown style={{ fontSize: 14 }} />
        </div>
      ),
      dataIndex: "stock",
      key: "stock",
      align: "center",
      render: (stock: number, record) => {
        const isLowStock = stock <= record.minStock;
        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {isLowStock && <AlertTriangle style={{ fontSize: 16, color: "#faad14" }} />}
            <Text strong={isLowStock} style={{ fontFamily: "monospace", color: isLowStock ? "#faad14" : undefined }}>
              {stock}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              / {record.minStock} min
            </Text>
          </div>
        );
      },
    },
    {
      title: "Cost Price",
      dataIndex: "costPrice",
      key: "costPrice",
      align: "right",
      render: (price: number) => (
        <Text style={{ fontFamily: "monospace" }}>₦{price.toLocaleString()}</Text>
      ),
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      align: "right",
      render: (price: number) => (
        <Text strong style={{ fontFamily: "monospace" }}>₦{price.toLocaleString()}</Text>
      ),
    },
    {
      title: "Margin",
      key: "margin",
      align: "right",
      render: (_, record) => {
        const margin = (((record.sellingPrice - record.costPrice) / record.costPrice) * 100).toFixed(0);
        return <Text style={{ fontFamily: "monospace", color: "#52c41a" }}>{margin}%</Text>;
      },
    },
    {
      title: "",
      key: "actions",
      width: 50,
      render: () => (
        <Dropdown menu={getDropdownMenu()} trigger={["click"]}>
          <Button
            type="text"
            icon={<MoreHorizontal />}
            style={{ opacity: 0 }}
            className="group-hover:opacity-100"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Inventory"
      description="Manage your products, parts, and stock levels"
    >
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <Card>
          <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 8 }}>Total Products</Text>
          <Title level={2} style={{ margin: 0, fontFamily: "monospace" }}>{products.length}</Title>
        </Card>
        <Card>
          <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 8 }}>Stock Value</Text>
          <Title level={2} style={{ margin: 0, fontFamily: "monospace" }}>
            ₦{(totalValue / 1000000).toFixed(1)}M
          </Title>
        </Card>
        <Card>
          <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 8 }}>Low Stock Items</Text>
          <Title level={2} style={{ margin: 0, fontFamily: "monospace", color: "#faad14" }}>
            {lowStockCount}
          </Title>
        </Card>
        <Card>
          <Text type="secondary" style={{ fontSize: 14, display: "block", marginBottom: 8 }}>Categories</Text>
          <Title level={2} style={{ margin: 0, fontFamily: "monospace" }}>4</Title>
        </Card>
      </div>

      {/* Actions Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search products, SKU, IMEI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search />}
            style={{ width: 320, height: 40 }}
          />
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 140, height: 40 }}
            suffixIcon={<Filter />}
          >
            <Option value="all">All Categories</Option>
            <Option value="phone">Phones</Option>
            <Option value="accessory">Accessories</Option>
            <Option value="part">Parts</Option>
            <Option value="service">Services</Option>
          </Select>
          <Select
            value={stockFilter}
            onChange={setStockFilter}
            style={{ width: 140, height: 40 }}
          >
            <Option value="all">All Stock</Option>
            <Option value="low">Low Stock</Option>
            <Option value="out">Out of Stock</Option>
          </Select>
        </Space>
        <Space>
          <Button icon={<Download />}>Export</Button>
          <Button icon={<Upload />}>Import</Button>
          <Button type="primary" icon={<Plus />}>
            Add Product
          </Button>
        </Space>
      </div>

      {/* Products Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </DashboardLayout>
  );
};

export default Inventory;
