import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useGetProfile } from "@/hooks/useGetProfile"
import { useAddProductMutation, useGetAProductQuery, useUpdateProductMutation } from "@/redux/features/products/productApi"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "@/components/Loading"
import { Label } from "@/components/ui/label"

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

const UpdateProduct: React.FC = () => {
  const { fetchedUser: user } = useGetProfile()
  const { id } = useParams()
  const { data } = useGetAProductQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  const [updateProduct, result] = useUpdateProductMutation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    image: "",
    category: "",
    subcategory: "",
    description: "",
    brand: "",
    price: 0,
    discount: 0,
    quantity: 0,
    colors: [],
    images: [],
    features: [],
    warranty: "",
    shipping: "",
    tags: [],
    vendor: user?._id || "",
  })

  useEffect(() => {
    if (data?.data) {
      setFormData({
        ...data.data,
        vendor: data.data.vendor || user?._id || "",
      })
    }
  }, [data, user, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }))
  }

  const handleMultiValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pick<ProductFormData, "colors" | "images" | "features" | "tags">
  ) => {
    const values = e.target.value.split(",").map((val) => val.trim())
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProduct({ id, payload: formData }).unwrap()
      toast({ title: "Success", description: "Product updated" })
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
        <h1 className="text-2xl font-semibold mb-4">Update Product</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">

          {/* Two-column grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="image">Main Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" name="price" value={formData.price || 0} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input type="number" id="discount" name="discount" value={formData.discount || 0} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input type="number" id="quantity" name="quantity" value={formData.quantity || 0} onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="vendor">Vendor ID</Label>
              <Input id="vendor" name="vendor" value={formData.vendor} disabled />
            </div>
          </div>

          {/* Single-column fields */}
          <div>
            <Label htmlFor="description">Product Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="colors">Colors (comma separated)</Label>
            <Input id="colors" name="colors" value={formData.colors.join(", ")} onChange={(e) => handleMultiValue(e, "colors")} />
          </div>
          <div>
            <Label htmlFor="images">Additional Images (comma separated URLs)</Label>
            <Input id="images" name="images" value={formData.images.join(", ")} onChange={(e) => handleMultiValue(e, "images")} />
          </div>
          <div>
            <Label htmlFor="features">Features (comma separated)</Label>
            <Input id="features" name="features" value={formData.features.join(", ")} onChange={(e) => handleMultiValue(e, "features")} />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" name="tags" value={formData.tags.join(", ")} onChange={(e) => handleMultiValue(e, "tags")} />
          </div>
          <div>
            <Label htmlFor="warranty">Warranty</Label>
            <Input id="warranty" name="warranty" value={formData.warranty} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="shipping">Shipping Info</Label>
            <Input id="shipping" name="shipping" value={formData.shipping} onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full">
            {result.isLoading ? <Loading color="text-white" /> : "Update Product"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default UpdateProduct
