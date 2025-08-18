import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Wishlist } from './wishlist.model'

// ✅ Add to wishlist
export const createWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id
    const { product, status } = req.body

    // Optional: Prevent duplicates
    const exists = await Wishlist.findOne({ userId, product })
    if (exists) return res.status(400).json({ message: 'Already in wishlist' })

    const wishlistItem = await Wishlist.create({
      userId,
      product,
      status: status || 'saved',
    })

    res.status(201).json(wishlistItem)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create wishlist item', error: err })
  }
}

// ✅ Get wishlist for user with populated product
export const getWishlistByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id

    const wishlist = await Wishlist.find({ userId }).populate('product')
    res.status(200).json(wishlist)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error: err })
  }
}

// ✅ Update wishlist item (e.g., status)
export const updateWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id
    const { id } = req.params
    const { status } = req.body

    const updated = await Wishlist.findOneAndUpdate(
      { _id: id, userId },
      { status },
      { new: true }
    ).populate('product')

    if (!updated) return res.status(404).json({ message: 'Wishlist item not found' })

    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update wishlist item', error: err })
  }
}

// ✅ Delete from wishlist
export const deleteWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id
    const { id } = req.params

    const deleted = await Wishlist.findOneAndDelete({ _id: id, userId })

    if (!deleted) return res.status(404).json({ message: 'Wishlist item not found' })

    res.status(200).json({ message: 'Item removed from wishlist' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete wishlist item', error: err })
  }
}
