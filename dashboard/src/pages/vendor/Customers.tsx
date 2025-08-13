import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import useGetVendorCustomers from "@/hooks/useGetVendorCustomers";


const getStatusColor = (status: boolean) => {
  switch (status) {
    // case "vip":
    //   return "bg-warning text-warning-foreground";
    case true:
      return "bg-success text-success-foreground";
    // case "new":
    //   return "bg-info text-info-foreground";
    case false:
      return "bg-muted text-muted-foreground";
    // default:
    //   return "bg-muted text-muted-foreground";
  }
};

const getInitials = (name: string) => {
  return name?.split(" ").map(n => n[0]).join("").toUpperCase();
};

const Customers = () => {
  const { customers } = useGetVendorCustomers();
  console.log(customers)
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const newThisMonth = customers?.filter(customer => {
    const createdDate = new Date(customer.createdAt);
    return (
      createdDate.getFullYear() === currentYear &&
      createdDate.getMonth() === currentMonth
    );
  }).length || 0;

  const activeCustomers = customers?.filter(customer => customer.isActive).length || 0;

  const totalOrders = customers?.reduce((acc, curr) => acc + curr.orders, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Customers</h1>
            <p className="text-muted-foreground">
              Manage customer relationships and track their activity
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{customers?.length}</div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{newThisMonth}</div>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{activeCustomers}</div>
              <p className="text-sm text-muted-foreground">Active Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-sm text-muted-foreground">Total Order</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>View and manage all your customers</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search customers..." className="pl-10 w-64" />
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
              {customers?.map((customer) => (
                <div key={customer._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium">{customer.name}</span>
                        <Badge className={getStatusColor(customer.isActive)}>
                          {customer.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{customer.email}</p>
                        <p>Joined {customer.createdAt} • Last order {customer.lastOrder}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right mr-4">
                    <div className="font-semibold text-lg">{customer.totalSpent}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.orders} orders
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
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

export default Customers;