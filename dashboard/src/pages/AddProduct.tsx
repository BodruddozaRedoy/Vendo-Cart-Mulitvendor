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

interface ProductFormData {
  name: string
  image: string
  category: string
  subcategory: string
  description: string
  brand: string
  price: number
  discount: number
  inStock: boolean
  colors: string[]
  images: string[]
  features: string[]
  warranty: string
  shipping: string
  tags: string[]
  vendor: string // vendor _id
}

const AddProduct: React.FC = () => {
  const {fetchedUser:user} = useGetProfile()
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
    price: 0,
    discount: 0,
    inStock: true,
    colors: [],
    images: [],
    features: [],
    warranty: "",
    shipping: "",
    tags: [],
    vendor: user._id, // You can auto-fill this from context/auth
  })
console.log(formData)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }))
    }
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
        description: "Product added"
      })
      // setFormData(null)
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
        <div className=" mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <Input name="image" placeholder="Main Image URL" value={formData.image} onChange={handleChange} required />
          <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <Input name="subcategory" placeholder="Subcategory" value={formData.subcategory} onChange={handleChange} />
          <Input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
          <Input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <Input type="number" name="discount" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} />
          <Input disabled name="vendor" placeholder="Vendor ID" value={formData.vendor} onChange={handleChange} required />
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
        </div>

        <Textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />

        <Input name="colors" placeholder="Colors (comma separated)" onChange={(e) => handleMultiValue(e, "colors")} />
        <Input name="images" placeholder="Additional Images (comma separated URLs)" onChange={(e) => handleMultiValue(e, "images")} />
        <Input name="features" placeholder="Features (comma separated)" onChange={(e) => handleMultiValue(e, "features")} />
        <Input name="tags" placeholder="Tags (comma separated)" onChange={(e) => handleMultiValue(e, "tags")} />
        <Input name="warranty" placeholder="Warranty" value={formData.warranty} onChange={handleChange} />
        <Input name="shipping" placeholder="Shipping Info" value={formData.shipping} onChange={handleChange} />

        <Button type="submit" className="w-full">Add Product</Button>
      </form>
    </div>
    </DashboardLayout>
  )
}

export default AddProduct
