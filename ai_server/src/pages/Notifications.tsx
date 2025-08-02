import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, Info, Package, ShoppingCart, Users, Settings as SettingsIcon } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-001 from John Doe for $299.99",
    time: "2 minutes ago",
    read: false,
    icon: ShoppingCart,
    priority: "high"
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Stock Alert",
    message: "Wireless Headphones has only 5 units left",
    time: "1 hour ago",
    read: false,
    icon: Package,
    priority: "medium"
  },
  {
    id: 3,
    type: "customer",
    title: "New Customer Registration",
    message: "Jane Smith just created an account",
    time: "3 hours ago",
    read: true,
    icon: Users,
    priority: "low"
  },
  {
    id: 4,
    type: "system",
    title: "Payment Method Updated",
    message: "Your payment settings have been successfully updated",
    time: "5 hours ago",
    read: true,
    icon: SettingsIcon,
    priority: "low"
  },
  {
    id: 5,
    type: "order",
    title: "Order Shipped",
    message: "Order #ORD-002 has been shipped to customer",
    time: "1 day ago",
    read: true,
    icon: ShoppingCart,
    priority: "medium"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "order":
      return "bg-success/10 text-success";
    case "inventory":
      return "bg-warning/10 text-warning";
    case "customer":
      return "bg-info/10 text-info";
    case "system":
      return "bg-primary/10 text-primary";
    default:
      return "bg-muted/10 text-muted-foreground";
  }
};

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your store activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Mark All as Read</Button>
            <Button variant="outline">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{unreadCount}</div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-success" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">Order Updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-warning" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">Stock Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-info" />
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-muted-foreground">Customer Activity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest updates and alerts from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                      !notification.read ? "bg-muted/20 border-primary/20" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;