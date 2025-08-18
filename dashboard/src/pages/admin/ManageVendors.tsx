import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetAllProductsByVendorQuery, useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct, IVendor } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useApproveVendorMutation, useDeleteVendorMutation, useGetAllVendorQuery } from "@/redux/features/vendor/vendorApi";

const ManageVendors = () => {
  const { data, isLoading } = useGetAllVendorQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  console.log(data?.data)
const [deleteVendor, result] = useDeleteVendorMutation()
const [approveVendor] = useApproveVendorMutation()
  

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Vendors</h1>
            <p className="text-muted-foreground">
              Manage your vendors
            </p>
          </div>
          <Link to={'/'}>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Vendor
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Vendors</CardTitle>
                <CardDescription>A list of all your vendors</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search products..." className="pl-10 w-64" />
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
              {!data?.data?.length && !isLoading && <div>No vendors added</div>}
              {isLoading && ([1,2,3]).map((_) => <Skeleton key={_} className="w-full h-[60px]"/>)}
              {data?.data?.map((vendor: IVendor) => (
                <div key={vendor._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                      <img src={vendor.logo} alt="" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium">{vendor.name}</span>
                        <Badge className={vendor.isVerified ? 'bg-success': "bg-warning"}>
                          {vendor.isVerified ? 'Verified' : "Not Verified"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vendor._id} • {vendor.joinedAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-semibold">{vendor.products?.length} Products</div>
                      {/* <div className="text-sm text-muted-foreground">
                        {vendor.quantity} in stock
                      </div> */}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link to={`/product/update-product/${vendor._id}`}><DropdownMenuItem>Products</DropdownMenuItem></Link>
                        <DropdownMenuItem onClick={() => {deleteVendor(vendor._id);toast.success("Deleted")}}>Delete</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {approveVendor(vendor._id);toast.success("Approved")}}>Approve</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageVendors;