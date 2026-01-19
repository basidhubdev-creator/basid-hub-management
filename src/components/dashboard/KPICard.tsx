import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function KPICard({
  title,
  value,
  prefix,
  suffix,
  change,
  changeLabel = "vs last period",
  icon,
  trend,
  className,
}: KPICardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  
  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div className={cn("kpi-card group", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            {prefix && <span className="currency-prefix">{prefix}</span>}
            <span className="stat-value text-foreground">{value}</span>
            {suffix && <span className="text-sm text-muted-foreground ml-1">{suffix}</span>}
          </div>
        </div>
        {icon && (
          <div className="rounded-lg bg-secondary p-2.5 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          <div className={cn("flex items-center gap-1 text-sm font-medium", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{Math.abs(change)}%</span>
          </div>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
