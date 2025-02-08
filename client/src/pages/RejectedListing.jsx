import React from "react";
import ListOFListing from "../components/ListOFListing";

const RejectedListing = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Rejected Listing
        </h1>
        <ListOFListing status="Rejected" />
      </div>
    </>
  );
};

export default RejectedListing;
