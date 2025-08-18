import express from "express";
import {
  createWishlist,
  getWishlistByUser,
  updateWishlist,
  deleteWishlist,
} from "../wishlist/wishlist.controller";
import { protect } from "../auth/auth.middleware";

const router = express.Router();

router.use(protect);
// All routes are protected
router.post("/", createWishlist);
router.get("/", getWishlistByUser);
router.patch("/:id", updateWishlist);
router.delete("/:id", deleteWishlist);

export default router;
