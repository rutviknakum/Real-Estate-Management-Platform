import Listing from "../models/listing.model.js";
import Wishlist from "../models/wishlist.model.js";

export const addWishlist = async (req, res, next) => {
  const { userId, listingId } = req.body;
  try {
    if (!userId || !listingId) {
      res.status(401).json({ status: 401, message: "not all field added" });
    } else {
      const newWishlist = new Wishlist({ userId, listingId });
      await newWishlist.save();
      res.status(201).json({
        status: 201,
        message: "This Property Added Into Your Wishlist!",
        newWishlist,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const displayWishlist = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    const findWishlist = await Wishlist.find({ userId: userId });
    const listingIds = findWishlist.map((item) => item.listingId);
    const findListings = await Listing.find({ _id: listingIds });
    res.status(201).json(findListings);
  } catch (error) {
    next(error);
  }
};

export const removeWishlist = async (req, res, next) => {
  const { userId, listingId } = req.body;
  try {
    const removeWishlist = await Wishlist.findOneAndDelete({
      userId: userId,
      listingId: listingId,
    });

    res.status(201).json({
      status: 201,
      message: "This Property removed Into Your Wishlist!",
      removeWishlist,
    });
  } catch (error) {
    next(error);
  }
};
