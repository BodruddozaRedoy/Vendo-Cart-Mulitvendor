import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentOrders } from "@/components/RecentOrders";
import { SalesChart } from "@/components/SalesChart";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store performance.
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <RecentOrders />
          <SalesChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
