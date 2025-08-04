import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    products: ["Wireless Headphones", "Phone Case"],
    amount: "$324.98",
    status: "delivered",
    date: "Dec 1, 2024",
    time: "2:30 PM"
  },
  {
    id: "#ORD-002", 
    customer: "Jane Smith",
    email: "jane@example.com",
    products: ["Smart Watch"],
    amount: "$199.99",
    status: "shipped",
    date: "Dec 1, 2024",
    time: "1:15 PM"
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com", 
    products: ["Bluetooth Speaker", "Wireless Charger"],
    amount: "$114.98",
    status: "processing",
    date: "Dec 1, 2024",
    time: "11:45 AM"
  },
  {
    id: "#ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    products: ["Phone Case"],
    amount: "$24.99", 
    status: "pending",
    date: "Dec 1, 2024",
    time: "10:20 AM"
  },
  {
    id: "#ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    products: ["Smart Watch", "Wireless Headphones"],
    amount: "$499.98",
    status: "cancelled",
    date: "Nov 30, 2024",
    time: "4:45 PM"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-success text-success-foreground";
    case "shipped":
      return "bg-info text-info-foreground";
    case "processing":
      return "bg-warning text-warning-foreground";
    case "pending":
      return "bg-muted text-muted-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">
              Track and manage all customer orders
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">89</div>
              <p className="text-sm text-muted-foreground">Completed Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all customer orders</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search orders..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-lg">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>{order.customer}</strong> • {order.email}</p>
                      <p>Products: {order.products.join(", ")}</p>
                      <p>{order.date} at {order.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-right mr-4">
                    <div className="font-semibold text-xl">{order.amount}</div>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;