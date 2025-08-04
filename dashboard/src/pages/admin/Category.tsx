import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DashboardLayout } from '@/components/DashboardLayout'

// import axios from 'axios'

interface ICategories {
    _id?: string
    name: string
    image: string
    subcategories: string[]
}

const Category = () => {
    const [categories, setCategories] = useState<ICategories[]>([])
    const [categoryName, setCategoryName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [subInput, setSubInput] = useState('')
    const [subcategories, setSubcategories] = useState<string[]>([])

    const fetchCategories = async () => {
        try {
            //   const res = await axios.get('/api/categories')
            //   setCategories(res.data)
        } catch (err) {
            console.error('Fetch failed', err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleAddSubcategory = () => {
        if (subInput.trim()) {
            setSubcategories([...subcategories, subInput.trim()])
            setSubInput('')
        }
    }

    const handleAddCategory = async () => {
        if (!categoryName || !imageUrl) return

        const newCategory: ICategories = {
            name: categoryName,
            image: imageUrl,
            subcategories
        }

        try {
            //   await axios.post('/api/categories', newCategory)
            setCategoryName('')
            setImageUrl('')
            setSubcategories([])
            fetchCategories()
        } catch (err) {
            console.error('Add failed', err)
        }
    }

    return (
        <DashboardLayout>
            <div className="p-6 mx-auto grid grid-cols-2 gap-10">
                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <h2 className="text-xl font-semibold">All Categories</h2>
                        {categories.map((cat) => (
                            <Card key={cat._id}>
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-medium">{cat.name}</h3>
                                            <img src={cat.image} alt={cat.name} className="w-20 h-20 object-cover rounded" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold">Subcategories:</h4>
                                        <ul className="list-disc pl-5">
                                            {cat.subcategories.map((sub, idx) => (
                                                <li key={idx}>{sub}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <h2 className="text-xl font-semibold">Add New Category</h2>
                        <div className="space-y-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input id="name" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subcategory">Subcategory</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="subcategory"
                                    value={subInput}
                                    onChange={e => setSubInput(e.target.value)}
                                />
                                <Button type="button" onClick={handleAddSubcategory}>
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {subcategories.map((sub, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-200 px-2 py-1 text-sm rounded-full"
                                    >
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Button onClick={handleAddCategory}>Add Category</Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default Category
