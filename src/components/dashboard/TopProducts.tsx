import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 45, revenue: 2700000, progress: 100 },
  { name: "Samsung S24 Ultra", sales: 38, revenue: 1900000, progress: 84 },
  { name: "iPhone 14 Pro", sales: 32, revenue: 1280000, progress: 71 },
  { name: "Google Pixel 8 Pro", sales: 24, revenue: 840000, progress: 53 },
  { name: "Samsung A54", sales: 18, revenue: 378000, progress: 40 },
];

export function TopProducts() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Top Selling Models</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-semibold">
                    ₦{(product.revenue / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-muted-foreground">{product.sales} units</p>
                </div>
              </div>
              <Progress value={product.progress} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
