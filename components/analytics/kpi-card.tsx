import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description?: string;
}

export function KPICard({ title, value, change, trend, description }: KPICardProps) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-muted-foreground';

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-hover group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <TrendIcon className="w-12 h-12" />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <span className={cn('text-xs font-bold flex items-center', trendColor)}>
            <TrendIcon className="w-3 h-3 mr-0.5" />
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  );
}
