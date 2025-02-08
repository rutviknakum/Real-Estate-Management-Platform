import React from "react";
import ListOFListing from "../components/ListOFListing";

const ApprovedListing = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Approved Listing
        </h1>
        <ListOFListing status="Approved" />
      </div>
    </>
  );
};

export default ApprovedListing;
