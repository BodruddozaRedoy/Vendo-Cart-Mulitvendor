"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlist = exports.updateWishlist = exports.getWishlistByUser = exports.createWishlist = void 0;
const wishlist_model_1 = require("./wishlist.model");
// ✅ Add to wishlist
const createWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { product, status } = req.body;
        // Optional: Prevent duplicates
        const exists = yield wishlist_model_1.Wishlist.findOne({ userId, product });
        if (exists)
            return res.status(400).json({ message: 'Already in wishlist' });
        const wishlistItem = yield wishlist_model_1.Wishlist.create({
            userId,
            product,
            status: status || 'saved',
        });
        res.status(201).json(wishlistItem);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create wishlist item', error: err });
    }
});
exports.createWishlist = createWishlist;
// ✅ Get wishlist for user with populated product
const getWishlistByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const wishlist = yield wishlist_model_1.Wishlist.find({ userId }).populate('product');
        res.status(200).json(wishlist);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch wishlist', error: err });
    }
});
exports.getWishlistByUser = getWishlistByUser;
// ✅ Update wishlist item (e.g., status)
const updateWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { status } = req.body;
        const updated = yield wishlist_model_1.Wishlist.findOneAndUpdate({ _id: id, userId }, { status }, { new: true }).populate('product');
        if (!updated)
            return res.status(404).json({ message: 'Wishlist item not found' });
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update wishlist item', error: err });
    }
});
exports.updateWishlist = updateWishlist;
// ✅ Delete from wishlist
const deleteWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const deleted = yield wishlist_model_1.Wishlist.findOneAndDelete({ _id: id, userId });
        if (!deleted)
            return res.status(404).json({ message: 'Wishlist item not found' });
        res.status(200).json({ message: 'Item removed from wishlist' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete wishlist item', error: err });
    }
});
exports.deleteWishlist = deleteWishlist;
