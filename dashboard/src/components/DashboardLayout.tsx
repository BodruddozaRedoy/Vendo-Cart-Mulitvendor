import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProfile } from "@/hooks/useGetProfile";
import { toast } from "sonner";
import { logOut } from "@/redux/features/auth/authSlice";
import { authApi, useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useDispatch()
  const { fetchedUser: user } = useGetProfile()
  const [logout, result] = useLogoutMutation()
  const navigate = useNavigate()

  // console.log(user)
  const handleLogout = async () => {
    await logout(null).unwrap()
    dispatch(authApi.util.resetApiState())
    dispatch(logOut())
    if (result.isSuccess) {
      toast.success("Logged Out")
    }
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products, orders, customers..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
                <Button variant="ghost" size="icon">
                  {
                    user ? <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Avatar>
                            <AvatarImage src={user?.image || 'https://github.com/shadcn.png'} />
                            {/* <AvatarFallback>CN</AvatarFallback> */}
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                          <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout}>
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div> : <User className="w-4 h-4" />
                  }
                </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}