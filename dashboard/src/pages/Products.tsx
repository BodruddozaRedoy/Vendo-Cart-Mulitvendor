import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useGetAllProductsByVendorQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types";

// const products = [
//   {
//     id: "PRD-001",
//     name: "Wireless Bluetooth Headphones",
//     category: "Electronics",
//     price: "$299.99",
//     stock: 45,
//     status: "active",
//     image: "🎧"
//   },
//   {
//     id: "PRD-002",
//     name: "Smart Fitness Watch",
//     category: "Wearables", 
//     price: "$199.99",
//     stock: 23,
//     status: "active",
//     image: "⌚"
//   },
//   {
//     id: "PRD-003",
//     name: "Portable Bluetooth Speaker",
//     category: "Electronics",
//     price: "$89.99",
//     stock: 0,
//     status: "out_of_stock",
//     image: "🔊"
//   },
//   {
//     id: "PRD-004",
//     name: "Wireless Phone Charger",
//     category: "Accessories",
//     price: "$24.99",
//     stock: 67,
//     status: "active",
//     image: "📱"
//   }
// ];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success text-success-foreground";
    case "out_of_stock":
      return "bg-destructive text-destructive-foreground";
    case "draft":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Products = () => {
  const {data} = useGetAllProductsByVendorQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  console.log(data?.data)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Manage your product catalog and inventory
            </p>
          </div>
          <Link to={'/product/add-product'}>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>A list of all your products</CardDescription>
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
              {data?.data?.map((product:IProduct) => (
                <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                      <img src={product.image} alt="" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium">{product.name}</span>
                        {/* <Badge className={getStatusColor(product.status)}>
                          {product.status.replace("_", " ")}
                        </Badge> */}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {product._id} • {product.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-semibold">{product.price}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.inStock} in stock
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
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

export default Products;