"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../wishlist/wishlist.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.protect);
// All routes are protected
router.post("/", wishlist_controller_1.createWishlist);
router.get("/", wishlist_controller_1.getWishlistByUser);
router.patch("/:id", wishlist_controller_1.updateWishlist);
router.delete("/:id", wishlist_controller_1.deleteWishlist);
exports.default = router;
