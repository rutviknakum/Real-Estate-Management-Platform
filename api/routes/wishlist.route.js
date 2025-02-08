import express from "express";
import {
  addWishlist,
  displayWishlist,
  removeWishlist,
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/addWishlist", addWishlist);
router.get("/displayWishlist", displayWishlist);
router.delete("/removeWishlist", removeWishlist);

export default router;
