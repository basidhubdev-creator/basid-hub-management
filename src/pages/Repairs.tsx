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
  ChevronRight,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

const statusConfig = {
  new: { label: "New", color: "bg-info/10 text-info", icon: AlertCircle },
  diagnosing: { label: "Diagnosing", color: "bg-warning/10 text-warning", icon: Wrench },
  waiting_parts: { label: "Waiting Parts", color: "bg-destructive/10 text-destructive", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-accent/10 text-accent", icon: Wrench },
  ready: { label: "Ready", color: "bg-success/10 text-success", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-muted text-muted-foreground", icon: AlertCircle },
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

  return (
    <DashboardLayout title="Repairs" description="Manage repair tickets and track progress">
      {/* Status Overview Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { key: "all", label: "All Tickets", color: "border-border" },
          { key: "new", label: "New", color: "border-info" },
          { key: "in_progress", label: "In Progress", color: "border-accent" },
          { key: "ready", label: "Ready", color: "border-success" },
          { key: "completed", label: "Completed", color: "border-muted" },
        ].map((status) => (
          <button
            key={status.key}
            onClick={() => setStatusFilter(status.key)}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              statusFilter === status.key
                ? `${status.color} bg-card shadow-md`
                : "border-transparent bg-card/50 hover:bg-card"
            )}
          >
            <p className="text-2xl font-bold font-mono">
              {statusCounts[status.key as keyof typeof statusCounts]}
            </p>
            <p className="text-sm text-muted-foreground">{status.label}</p>
          </button>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets, customers, IMEI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-card border-border/50"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] h-10 bg-card border-border/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="diagnosing">Diagnosing</SelectItem>
              <SelectItem value="waiting_parts">Waiting Parts</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link to="/repairs/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </Link>
      </div>

      {/* Tickets Table */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Ticket ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => {
              const status = statusConfig[ticket.status];
              const StatusIcon = status.icon;
              const balance = ticket.total - ticket.paid;

              return (
                <TableRow
                  key={ticket.id}
                  className="cursor-pointer group"
                >
                  <TableCell>
                    <Link
                      to={`/repairs/${ticket.id}`}
                      className="font-mono font-medium text-accent hover:underline"
                    >
                      {ticket.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{ticket.customer}</p>
                        <p className="text-xs text-muted-foreground">{ticket.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{ticket.device}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm truncate max-w-[200px]">{ticket.issue}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("gap-1", status.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {ticket.technician || (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {ticket.dueDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {balance > 0 ? (
                      <span className="font-mono text-sm text-destructive">
                        ₦{balance.toLocaleString()}
                      </span>
                    ) : (
                      <span className="font-mono text-sm text-success">Paid</span>
                    )}
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
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Add Payment</DropdownMenuItem>
                        <DropdownMenuItem>Print Ticket</DropdownMenuItem>
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

export default Repairs;
