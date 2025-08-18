import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { DashboardLayout } from '@/components/DashboardLayout'
import {
    useAddCategoryMutation,
    useDeleteACategoryMutation,
    useGetAllCategoryQuery,
    useUpdateACategoryMutation
} from '@/redux/features/category/categoryApi'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'

interface ICategories {
    _id?: string
    name: string
    image: string
    subcategories: string[]
}

const Category = () => {
    const { data: categoryData, isLoading } = useGetAllCategoryQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })

    const [addCategory] = useAddCategoryMutation()
    const [updateCategory] = useUpdateACategoryMutation()
    const [deleteCategory] = useDeleteACategoryMutation()

    const [categoryName, setCategoryName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [subInput, setSubInput] = useState('')
    const [subcategories, setSubcategories] = useState<string[]>([])

    const [isEditing, setIsEditing] = useState(false)
    const [editCategoryId, setEditCategoryId] = useState<string | null>(null)

    const handleAddSubcategory = () => {
        if (subInput.trim()) {
            setSubcategories([...subcategories, subInput.trim()])
            setSubInput('')
        }
    }

    const handleStartEdit = (cat: ICategories) => {
        setIsEditing(true)
        setEditCategoryId(cat._id!)
        setCategoryName(cat.name)
        setImageUrl(cat.image)
        setSubcategories(cat.subcategories)
    }

    const resetForm = () => {
        setCategoryName('')
        setImageUrl('')
        setSubcategories([])
        setSubInput('')
        setEditCategoryId(null)
        setIsEditing(false)
    }

    const handleAddOrUpdateCategory = async () => {
        if (!categoryName || !imageUrl) return

        const categoryData: ICategories = {
            name: categoryName,
            image: imageUrl,
            subcategories
        }

        try {
            if (isEditing && editCategoryId) {
                await updateCategory({ id: editCategoryId, payload: categoryData })
            } else {
                await addCategory(categoryData)
            }
            resetForm()
        } catch (err) {
            console.error('Failed to submit', err)
        }
    }

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id)
        } catch (err) {
            console.error('Delete failed', err)
        }
    }

    return (
        <DashboardLayout>
            <CustomBreadcrumb />
            <div className="p-6 mx-auto grid grid-cols-2 gap-10 items-start">
                {/* Left: Category List */}
                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <h2 className="text-xl font-semibold">All Categories</h2>
                        {!categoryData?.data?.length && <div>No Category added</div>}
                        {categoryData?.data?.map((cat: ICategories) => (
                            <Card key={cat._id} className="bg-gray-50">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-medium">{cat.name}</h3>
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        </div>
                                        <div className="space-x-2">
                                            <Button size="sm" onClick={() => handleStartEdit(cat)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteCategory(cat._id!)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold">Subcategories:</h4>
                                        <ul className="list-disc pl-5">
                                            {cat.subcategories?.map((sub, idx) => (
                                                <li key={idx}>{sub}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {/* Right: Add / Edit Form */}
                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <h2 className="text-xl font-semibold">
                            {isEditing ? 'Edit Category' : 'Add New Category'}
                        </h2>

                        <div className="space-y-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                id="name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subcategory">Subcategory</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="subcategory"
                                    value={subInput}
                                    onChange={(e) => setSubInput(e.target.value)}
                                />
                                <Button type="button" onClick={handleAddSubcategory}>
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {subcategories?.map((sub, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-200 px-2 py-1 text-sm rounded-full flex items-center gap-1"
                                    >
                                        <span>{sub}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSubcategories(subcategories.filter((_, index) => index !== i))
                                            }
                                            className="text-red-600 hover:text-red-800 font-bold px-1"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleAddOrUpdateCategory}>
                                {isEditing ? 'Update' : 'Add'} Category
                            </Button>
                            {isEditing && (
                                <Button variant="ghost" onClick={resetForm}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default Category
