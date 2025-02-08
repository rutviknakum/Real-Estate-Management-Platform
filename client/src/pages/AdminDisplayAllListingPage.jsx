import React from "react";
import ListOFListing from "../components/ListOFListing";

const AdminDisplayAllListingPage = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Listing</h1>
        <ListOFListing status="" />
      </div>
    </>
  );
};

export default AdminDisplayAllListingPage;
