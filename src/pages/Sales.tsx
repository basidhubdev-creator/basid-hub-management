import { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  X,
  ShoppingCart,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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
  const [showCheckout, setShowCheckout] = useState(false);

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
  const tax = 0; // Can be configured
  const grandTotal = subtotal - totalDiscount + tax;
  const change =
    amountPaid && parseFloat(amountPaid) > grandTotal
      ? parseFloat(amountPaid) - grandTotal
      : 0;

  const handleCheckout = () => {
    // Handle checkout logic
    setCart([]);
    setAmountPaid("");
    setCustomerName("");
    setShowCheckout(false);
  };

  return (
    <DashboardLayout title="Sales / POS" description="Create new sales and process payments">
      <div className="flex gap-6 h-[calc(100vh-10rem)]">
        {/* Products Section */}
        <div className="flex-1 flex flex-col">
          {/* Search & Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, or IMEI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-card border-border/50"
              />
            </div>
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              {[
                { id: "all", label: "All" },
                { id: "phone", label: "Phones" },
                { id: "accessory", label: "Accessories" },
                { id: "service", label: "Services" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    activeCategory === cat.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="text-left p-4 rounded-xl border border-border/50 bg-card hover:border-accent/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        product.category === "phone" && "bg-primary/10 text-primary",
                        product.category === "accessory" && "bg-info/10 text-info",
                        product.category === "service" && "bg-success/10 text-success"
                      )}
                    >
                      {product.category}
                    </Badge>
                    {product.condition && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          product.condition === "used" && "border-warning text-warning"
                        )}
                      >
                        {product.condition}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.sku}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-foreground">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product.stock} in stock
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <Card className="w-[400px] flex flex-col border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cart.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </CardTitle>
              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCart([])}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col overflow-hidden">
            {/* Customer Selector */}
            <div className="mb-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Walk-in customer or search..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto space-y-2 mb-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">Cart is empty</p>
                  <p className="text-xs text-muted-foreground/70">
                    Click products to add them
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-card rounded-md border">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-muted rounded-l-md transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-muted rounded-r-md transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">₦{subtotal.toLocaleString()}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-mono text-success">
                    -₦{totalDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-mono font-bold text-lg">
                  ₦{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all",
                    selectedPayment === method.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <method.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{method.name}</span>
                </button>
              ))}
            </div>

            {/* Amount Input */}
            <div className="mt-4">
              <Input
                type="number"
                placeholder="Amount paid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="h-11 text-center font-mono text-lg"
              />
              {change > 0 && (
                <p className="text-center text-sm text-success mt-2">
                  Change: ₦{change.toLocaleString()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" disabled={cart.length === 0}>
                Save Draft
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                <Receipt className="mr-2 h-4 w-4" />
                Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sales;
