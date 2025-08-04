import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  Store,
  Bell
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetProfile } from "@/hooks/useGetProfile";
import Loading from "./Loading";

const vendorLinks = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Customers", url: "/customers", icon: Users },
];

const adminLinks = [
  {title: "Dashboard", url: "/", icon: LayoutDashboard},
  {title: "Manage Products", url: "/manage-products", icon: Package},
  { title: "Manage Orders", url: "/manage-orders", icon: ShoppingCart },
  { title: "Analytics", url: "/admin-analytics", icon: BarChart3 },
  { title: "Users", url: "/users", icon: Users },
]

const storeItems = [
  { title: "Store Settings", url: "/store", icon: Store },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const {fetchedUser, isLoading} = useGetProfile()
  // console.log(fetchedUser)
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => 
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const getNavClassName = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return "bg-primary text-primary-foreground font-medium hover:bg-primary/90";
    }
    return "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
  };

  if(isLoading) return <div className="w-screen h-screen flex items-center justify-center"><Loading color={"text-primary"}/></div>

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64 "}`} collapsible="icon">
      <div className="p-4 border-b bg-black text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Store className="w-4 h-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-sm">VendoCart</h2>
              <p className="text-xs text-muted">{fetchedUser.role === "vendor" ? "Vendor" : "Admin"} Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(fetchedUser?.role === 'vendor' ? vendorLinks : adminLinks).map((item) => (
                <SidebarMenuItem key={item.title} className={``}>
                  <SidebarMenuButton asChild className={`${currentPath === item.url ? 'text-black bg-white' : "text-white bg-black"}`}>
                    <NavLink to={item.url} end={item.url === "/"} >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted">Store</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {storeItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`${currentPath === item.url ? 'text-black bg-white' : "text-white bg-black"}`}>
                    <NavLink to={item.url} >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}