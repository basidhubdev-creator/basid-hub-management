import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Wrench,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

  return (
    <DashboardLayout
      title="Customers"
      description="Manage customer profiles and track purchase history"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
          <p className="text-2xl font-bold font-mono">{totalCustomers}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Retail</p>
          <p className="text-2xl font-bold font-mono">
            {totalCustomers - wholesaleCount}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Wholesale</p>
          <p className="text-2xl font-bold font-mono">{wholesaleCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">VIP Customers</p>
          <p className="text-2xl font-bold font-mono text-accent">{vipCount}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-card border-border/50"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] h-10 bg-card border-border/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="wholesale">Wholesale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Customers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="border-border/50 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center text-lg font-semibold",
                      customer.isVIP
                        ? "bg-gradient-accent text-primary"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{customer.name}</h3>
                      {customer.isVIP && (
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs mt-1",
                        customer.type === "wholesale" &&
                          "bg-info/10 text-info"
                      )}
                    >
                      {customer.type}
                    </Badge>
                  </div>
                </div>
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
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Create Sale</DropdownMenuItem>
                    <DropdownMenuItem>Create Repair</DropdownMenuItem>
                    <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {customer.phone}
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="font-mono font-semibold">
                    ₦{(customer.totalSpent / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-mono font-semibold">
                      {customer.purchaseCount}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Purchases</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-mono font-semibold">
                      {customer.repairCount}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Repairs</p>
                </div>
              </div>

              {customer.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                  {customer.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Customers;
