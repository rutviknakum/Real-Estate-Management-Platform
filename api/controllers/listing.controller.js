import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    const deletedList = await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      deletedList,
      message: "Listing has been deleted!",
    });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListingCount = async (req, res, next) => {
  try {
    const now = new Date();

    // Get start of the current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Get start of the current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get start of the current week (assuming week starts on Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // Define common filter for approved listings
    const commonFilter = { status: "Approved" };

    // Fetch counts for sale listings
    const saleFilter = { ...commonFilter, type: "sale" };
    const saleYearCount = await Listing.countDocuments({
      ...saleFilter,
      createdAt: { $gte: startOfYear },
    });
    const saleMonthCount = await Listing.countDocuments({
      ...saleFilter,
      createdAt: { $gte: startOfMonth },
    });
    const saleWeekCount = await Listing.countDocuments({
      ...saleFilter,
      createdAt: { $gte: startOfWeek },
    });

    // Fetch counts for rent listings
    const rentFilter = { ...commonFilter, type: "rent" };
    const rentYearCount = await Listing.countDocuments({
      ...rentFilter,
      createdAt: { $gte: startOfYear },
    });
    const rentMonthCount = await Listing.countDocuments({
      ...rentFilter,
      createdAt: { $gte: startOfMonth },
    });
    const rentWeekCount = await Listing.countDocuments({
      ...rentFilter,
      createdAt: { $gte: startOfWeek },
    });

    // Respond with aggregated counts
    res.status(200).json({
      status: 200,
      message: "Listing stats retrieved successfully.",
      data: {
        sale: {
          thisYear: saleYearCount,
          thisMonth: saleMonthCount,
          thisWeek: saleWeekCount,
        },
        rent: {
          thisYear: rentYearCount,
          thisMonth: rentMonthCount,
          thisWeek: rentWeekCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    // Dynamically add status filter
    const status = req.query.status || {
      $in: ["Approved", "Pending", "Rejected"],
    };

    const listings = await Listing.find({
      $and: [
        { status }, // Dynamic status filter
        {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { state: { $regex: searchTerm, $options: "i" } },
            { city: { $regex: searchTerm, $options: "i" } },
          ],
        },
        { offer },
        { furnished },
        { parking },
        { type },
      ],
    })
      .sort({ [sort]: order === "desc" ? -1 : 1 })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const adminUpdateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.query.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
