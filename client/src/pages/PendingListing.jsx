import React from "react";
import ListOFListing from "../components/ListOFListing";

const PendingListing = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Pending Listing
        </h1>
        <ListOFListing status="Pending" />
      </div>
    </>
  );
};

export default PendingListing;
