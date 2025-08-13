import { DashboardLayout } from "@/components/DashboardLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Eye, Search, Filter, Download } from "lucide-react"
import { useGetOrdersByVendorQuery, useUpdateStatusMutation } from "@/redux/features/order/orderApi"
import { useState } from "react"
import { cn } from "@/lib/utils"
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusSteps = [
  { key: "Pending", label: "Pending" },
  { key: "Processing", label: "Processing" },
  { key: "Shipped", label: "Shipped" },
  { key: "Out for delivery", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-success text-success-foreground"
    case "Out for delivery":
      return "bg-info text-info-foreground"
    case "Shipped":
      return "bg-warning text-warning-foreground"
    case "Processing":
      return "bg-primary text-primary-foreground"
    case "Pending":
      return "bg-muted text-muted-foreground"
    case "Cancelled":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const Orders = () => {
  const { data: orders } = useGetOrdersByVendorQuery(undefined,{
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [updateStatus] = useUpdateStatusMutation()
  console.log(orders)

  const handleStatusChange = async (status:string, id:string) => {
    console.log(status, id)
    console.log({id, deliveryStatus:status})
    await updateStatus({id, payload:{deliveryStatus:status}})
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">Track and manage all customer orders</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{orders?.length ?? 0}</div>
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
              {orders?.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-lg">OID: {order._id}</span>
                      <Badge className={getStatusColor(order.deliveryStatus)}>
                        {order.deliveryStatus}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <strong>{order.userId.fullName}</strong> • {order.userId.email}
                      </p>
                      <p>Products: {order.products.map((p: any) => p.product?.name).join(", ")}</p>
                      <p>{moment(order.createdAt).format("MMM D, yyyy")} at {moment(order.createdAt).format("hh:mm A")}</p>
                    </div>
                  </div>

                  <div className="text-right mr-4">
                    <div className="font-semibold text-xl">${order.totalAmount}</div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4" />View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full">
                      <DialogHeader>
                        <DialogTitle>Tracking Order: {selectedOrder?._id} ({order.paymentMethod === "cod" ? "COD": "Paid"})</DialogTitle>
                      </DialogHeader>

                      <div className="mt-4 space-y-4">
                        <Table>
                          <TableCaption>Product List</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="">Index</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.products?.map((p, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{p.product.name}</TableCell>
                                <TableCell>{p.quantity}</TableCell>
                                <TableCell className="text-right">{p.product.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={3}>Total</TableCell>
                              <TableCell className="text-right">${order.totalAmount}</TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>

                        <p className="text-primary font-semibold">Customer Details:</p>
                        <div className="ml-3">
                          <p className="text-muted-foreground text-sm">{order.deliveryInfo.fullName}</p>
                          <p className="text-muted-foreground text-sm">{order?.deliveryInfo.address}</p>
                          <p className="text-muted-foreground text-sm">{order.userId.email}</p>
                          <p className="text-muted-foreground text-sm">{order.deliveryInfo.phone}</p>
                          
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="ml-2">
                    {/* <Button className="" variant="outline">Status</Button> */}
                    <Select disabled={order.deliveryStatus === "Delivered"} value={order.deliveryStatus} onValueChange={(e) => handleStatusChange(e,order._id)}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Change Status</SelectLabel>
                          <SelectItem value="Order placed">Order Placed</SelectItem>
                          <SelectItem value="In progress">In Progress</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Out for delivery">Out for Delivery</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Orders
