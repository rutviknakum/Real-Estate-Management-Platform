import React, { useContext, useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import { wishlistContext } from "../components/ContextProvider";

const Wishlist = () => {
  const { wishlistContextData, setWishlistContextData } =
    useContext(wishlistContext);

  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWhislist = async () => {
      try {
        const res = await fetch(
          `/api/wishlist/displayWishlist?userId=${userId}`
        );
        const data = await res.json();
        setWishlist(data);
        setWishlistContextData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWhislist();
  }, []);

  return (
    <>
      <div className="m-10">
        <div className="flex flex-wrap gap-4">
          {wishlist.length > 0 ? (
            wishlist.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))
          ) : (
            <p>No items in your wishlist</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
