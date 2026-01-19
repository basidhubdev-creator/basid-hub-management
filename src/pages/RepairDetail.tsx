import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  const currentStepIndex = statusSteps.findIndex((s) => s.key === ticket.status);
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/repairs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{ticket.id}</h1>
              <Badge className="bg-accent/10 text-accent">In Progress</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Created {ticket.createdAt} · Due {ticket.dueDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Ticket
          </Button>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Payment
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Edit2 className="mr-2 h-4 w-4" />
            Update Status
          </Button>
        </div>
      </div>

      {/* Status Timeline */}
      <Card className="mb-6 border-border/50">
        <CardContent className="pt-6">
          <div className="relative">
            <Progress value={progress} className="h-2 mb-6" />
            <div className="flex justify-between">
              {statusSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    key={step.key}
                    className={cn(
                      "flex flex-col items-center gap-2",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                        isCurrent
                          ? "border-accent bg-accent text-accent-foreground"
                          : isActive
                          ? "border-primary bg-primary/10"
                          : "border-muted bg-muted"
                      )}
                    >
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Device */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{ticket.customer.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {ticket.customer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {ticket.customer.email}
                </div>
                <Button variant="link" className="p-0 h-auto text-accent">
                  View customer history →
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Device
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">
                    {ticket.device.brand} {ticket.device.model}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.device.color}
                  </p>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">IMEI: </span>
                  <span className="font-mono">{ticket.device.imei}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Condition: </span>
                  {ticket.device.condition}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  View/Add Photos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Problem Description */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{ticket.issue}</p>
            </CardContent>
          </Card>

          {/* Parts & Labor */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Parts & Labor</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ticket.parts.map((part, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div>
                      <p className="font-medium text-sm">{part.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {part.qty} · Cost: ₦{part.cost.toLocaleString()}
                      </p>
                    </div>
                    <span className="font-mono font-medium">
                      ₦{part.price.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium text-sm">Labor</p>
                    <p className="text-xs text-muted-foreground">Repair service</p>
                  </div>
                  <span className="font-mono font-medium">
                    ₦{ticket.labor.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-mono font-bold text-lg">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Technician Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {ticket.notes.map((note, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{note.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button size="sm" disabled={!newNote.trim()}>
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="space-y-6">
          <Card className="border-border/50 sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Parts</span>
                  <span className="font-mono">₦{partsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Labor</span>
                  <span className="font-mono">₦{ticket.labor.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-mono font-semibold">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-mono text-success">
                    -₦{totalPaid.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Balance Due</span>
                  <span
                    className={cn(
                      "font-mono font-bold text-lg",
                      balance > 0 ? "text-destructive" : "text-success"
                    )}
                  >
                    ₦{balance.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                <CreditCard className="mr-2 h-4 w-4" />
                Record Payment
              </Button>

              <div className="space-y-3">
                <p className="text-sm font-medium">Payment History</p>
                {ticket.payments.map((payment, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-secondary/50 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{payment.method}</span>
                      <span className="font-mono text-sm text-success">
                        +₦{payment.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{payment.date}</span>
                      <span className="font-mono">{payment.ref}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RepairDetail;
