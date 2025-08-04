import mongoose, { Document, Schema } from 'mongoose'

export interface ICategories extends Document {
  name: string
  image: string
  subcategories: string[]
}

const categorySchema = new Schema<ICategories>({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  subcategories: [{ type: String }]
}, {
  timestamps: true
})

export const Category = mongoose.model<ICategories>('Category', categorySchema)
