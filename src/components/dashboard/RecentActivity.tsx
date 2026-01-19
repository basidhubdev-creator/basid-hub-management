import { ShoppingCart, Wrench, TrendingUp, CreditCard, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "sale",
    title: "New sale completed",
    description: "iPhone 15 Pro Max - N850,000",
    time: "2 mins ago",
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: "repair",
    title: "Repair ticket #2847 completed",
    description: "Screen replacement - Samsung S23",
    time: "15 mins ago",
    icon: Wrench,
  },
  {
    id: 3,
    type: "investment",
    title: "New investor contribution",
    description: "Chief Okafor - ₦5,000,000",
    time: "1 hour ago",
    icon: TrendingUp,
  },
  {
    id: 4,
    type: "payment",
    title: "Large payment received",
    description: "Wholesale order - TechMart Ltd",
    time: "2 hours ago",
    icon: CreditCard,
  },
  {
    id: 5,
    type: "stock",
    title: "Stock received",
    description: "PO #1245 - 50 units",
    time: "3 hours ago",
    icon: Package,
  },
];

const typeStyles = {
  sale: "bg-success/10 text-success",
  repair: "bg-info/10 text-info",
  investment: "bg-accent/10 text-accent",
  payment: "bg-primary/10 text-primary",
  stock: "bg-secondary text-secondary-foreground",
};

export function RecentActivity() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 animate-fade-in",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  typeStyles[activity.type as keyof typeof typeStyles]
                )}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
