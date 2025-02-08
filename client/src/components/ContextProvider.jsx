import React, { createContext, useState } from "react";

export const wishlistContext = createContext();

const ContextProvider = ({ children }) => {
  const [wishlistContextData, setWishlistContextData] = useState([]);

  return (
    <>
      <wishlistContext.Provider
        value={{ wishlistContextData, setWishlistContextData }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
};

export default ContextProvider;
