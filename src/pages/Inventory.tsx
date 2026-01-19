import { useState } from "react";
import { Link } from "react-router-dom";
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
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
  phone: { label: "Phones", icon: Smartphone, color: "bg-primary/10 text-primary" },
  accessory: { label: "Accessories", icon: Headphones, color: "bg-info/10 text-info" },
  part: { label: "Parts", icon: Wrench, color: "bg-warning/10 text-warning" },
  service: { label: "Services", icon: Package, color: "bg-success/10 text-success" },
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

  return (
    <DashboardLayout
      title="Inventory"
      description="Manage your products, parts, and stock levels"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Products</p>
          <p className="text-2xl font-bold font-mono">{products.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Stock Value</p>
          <p className="text-2xl font-bold font-mono">
            ₦{(totalValue / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Low Stock Items</p>
          <p className="text-2xl font-bold font-mono text-warning">
            {lowStockCount}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Categories</p>
          <p className="text-2xl font-bold font-mono">4</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, SKU, IMEI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-card border-border/50"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] h-10 bg-card border-border/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="phone">Phones</SelectItem>
              <SelectItem value="accessory">Accessories</SelectItem>
              <SelectItem value="part">Parts</SelectItem>
              <SelectItem value="service">Services</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-[140px] h-10 bg-card border-border/50">
              <SelectValue placeholder="Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  Stock
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>
              <TableHead className="text-right">Cost Price</TableHead>
              <TableHead className="text-right">Selling Price</TableHead>
              <TableHead className="text-right">Margin</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const category = categoryConfig[product.category];
              const CategoryIcon = category.icon;
              const isLowStock = product.stock <= product.minStock;
              const margin = (
                ((product.sellingPrice - product.costPrice) /
                  product.costPrice) *
                100
              ).toFixed(0);

              return (
                <TableRow key={product.id} className="group">
                  <TableCell>
                    <span className="font-mono text-sm">{product.sku}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand}
                        {product.imei && (
                          <span className="ml-2 font-mono">
                            IMEI: {product.imei}
                          </span>
                        )}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("gap-1", category.color)}>
                      <CategoryIcon className="h-3 w-3" />
                      {category.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        product.condition === "used" &&
                          "border-warning text-warning"
                      )}
                    >
                      {product.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {isLowStock && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                      <span
                        className={cn(
                          "font-mono font-medium",
                          isLowStock && "text-warning"
                        )}
                      >
                        {product.stock}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / {product.minStock} min
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-sm">
                      ₦{product.costPrice.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-sm font-medium">
                      ₦{product.sellingPrice.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-sm text-success">
                      {margin}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
