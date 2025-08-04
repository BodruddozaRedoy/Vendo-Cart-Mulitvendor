import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useGetProfile } from "@/hooks/useGetProfile"
import { useAddProductMutation } from "@/redux/features/products/productApi"
import { useNavigate } from "react-router-dom"
import Loading from "@/components/Loading"

interface ProductFormData {
  name: string
  image: string
  category: string
  subcategory: string
  description: string
  brand: string
  price: number
  discount: number
  quantity: number
  colors: string[]
  images: string[]
  features: string[]
  warranty: string
  shipping: string
  tags: string[]
  vendor: string
}

const AddProduct: React.FC = () => {
  const { fetchedUser: user } = useGetProfile()
  const [addProduct, result] = useAddProductMutation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    image: "",
    category: "",
    subcategory: "",
    description: "",
    brand: "",
    price: null,
    discount: null,
    quantity: null,
    colors: [],
    images: [],
    features: [],
    warranty: "",
    shipping: "",
    tags: [],
    vendor: user._id,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }))
  }

  const handleMultiValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pick<ProductFormData, "colors" | "images" | "features" | "tags">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value.split(",").map((val) => val.trim()),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addProduct(formData)
      toast({
        title: "Success",
        description: "Product added",
      })
      navigate("/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="image">Main Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input id="discount" type="number" name="discount" value={formData.discount} onChange={handleChange} />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="vendor">Vendor ID</Label>
              <Input id="vendor" disabled name="vendor" value={formData.vendor} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="description">Product Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="colors">Colors (comma separated)</Label>
            <Input id="colors" name="colors" onChange={(e) => handleMultiValue(e, "colors")} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="images">Additional Images (comma separated URLs)</Label>
            <Input id="images" name="images" onChange={(e) => handleMultiValue(e, "images")} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="features">Features (comma separated)</Label>
            <Input id="features" name="features" onChange={(e) => handleMultiValue(e, "features")} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" name="tags" onChange={(e) => handleMultiValue(e, "tags")} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="warranty">Warranty</Label>
            <Input id="warranty" name="warranty" value={formData.warranty} onChange={handleChange} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="shipping">Shipping Info</Label>
            <Input id="shipping" name="shipping" value={formData.shipping} onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full">
            {result.isLoading ? <Loading color={"text-white"} /> : "Add Product"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default AddProduct
