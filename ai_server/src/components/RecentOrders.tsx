import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Wireless Headphones",
    amount: "$299.99",
    status: "completed",
    date: "2 hours ago"
  },
  {
    id: "#ORD-002", 
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Smart Watch",
    amount: "$199.99",
    status: "processing",
    date: "4 hours ago"
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com", 
    product: "Bluetooth Speaker",
    amount: "$89.99",
    status: "pending",
    date: "6 hours ago"
  },
  {
    id: "#ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Phone Case",
    amount: "$24.99", 
    status: "completed",
    date: "8 hours ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success text-success-foreground";
    case "processing":
      return "bg-warning text-warning-foreground";
    case "pending":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function RecentOrders() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Latest orders from your store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{order.customer} • {order.email}</p>
                  <p>{order.product}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-lg">{order.amount}</div>
                <div className="text-sm text-muted-foreground">{order.date}</div>
              </div>
              
              <Button variant="ghost" size="icon" className="ml-4">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}