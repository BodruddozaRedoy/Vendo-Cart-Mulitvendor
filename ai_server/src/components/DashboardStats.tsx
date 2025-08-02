import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,234",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month"
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "vs last month"
  },
  {
    title: "Total Products",
    value: "456",
    change: "+3.1%",
    trend: "up",
    icon: Package,
    description: "vs last month"
  },
  {
    title: "Total Customers",
    value: "2,345",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    description: "vs last month"
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon 
                  className={`mr-1 h-3 w-3 ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`} 
                />
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}