import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  listingId: { type: String, require: true },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
