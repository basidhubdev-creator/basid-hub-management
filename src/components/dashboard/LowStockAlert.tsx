import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const lowStockItems = [
  { name: "iPhone 15 Screen", stock: 2, min: 5, urgent: true },
  { name: "Samsung S24 Battery", stock: 3, min: 5, urgent: true },
  { name: "USB-C Cables (1m)", stock: 8, min: 10, urgent: false },
  { name: "Tempered Glass (Universal)", stock: 12, min: 15, urgent: false },
  { name: "AirPods Pro 2", stock: 4, min: 5, urgent: true },
];

export function LowStockAlert() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Low Stock Alert</CardTitle>
          <span className="status-badge status-badge-warning">
            <AlertTriangle className="h-3 w-3" />
            {lowStockItems.length} items
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center justify-between rounded-lg p-3 transition-colors",
                item.urgent ? "bg-destructive/5" : "bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3">
                {item.urgent && (
                  <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                )}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-mono font-semibold",
                    item.urgent ? "text-destructive" : "text-warning"
                  )}>
                    {item.stock} left
                  </p>
                  <p className="text-xs text-muted-foreground">min: {item.min}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
