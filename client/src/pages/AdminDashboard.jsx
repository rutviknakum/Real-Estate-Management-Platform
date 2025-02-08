import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(null);
  const [listingCount, setListingCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Graph Data
  const data = {
    labels: ["Yearly", "Monthly", "Weekly"],
    datasets: [
      {
        label: "Registered Users",
        backgroundColor: "rgba(14, 143, 194, 0.6)",
        borderColor: "rgba(14, 143, 194, 1)",
        borderWidth: 1,
        data: [userCount?.thisYear, userCount?.thisMonth, userCount?.thisWeek],
      },
      {
        label: "Listed Items",
        backgroundColor: "rgba(255, 193, 7, 0.6)",
        borderColor: "rgba(255, 193, 7, 1)",
        borderWidth: 1,
        data: [
          listingCount?.data?.sale?.thisYear +
            listingCount?.data?.rent?.thisYear,
          listingCount?.data?.sale?.thisMonth +
            listingCount?.data?.rent?.thisMonth,
          listingCount?.data?.sale?.thisWeek +
            listingCount?.data?.rent?.thisWeek,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  const getUserState = async () => {
    try {
      const res = await fetch("/api/user/getAll");
      const countOfUser = await res.json();
      setUserCount(countOfUser?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListingState = async () => {
    try {
      const res = await fetch("/api/listing/getAllListingCount");
      const countOfListing = await res.json();
      setListingCount(countOfListing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getUserState(), getListingState()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
      <div className="flex justify-between">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registered Users Metrics */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Registered Users
          </h2>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Yearly</p>
                <p className="text-2xl font-bold text-blue-500">
                  {userCount?.thisYear}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly</p>
                <p className="text-2xl font-bold text-green-500">
                  {userCount?.thisMonth}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weekly</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {userCount?.thisWeek}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Listed Items Metrics */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Listed Items</h2>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Yearly</p>
                <p className="text-2xl font-bold text-blue-500">
                  {listingCount?.data?.sale?.thisYear +
                    listingCount?.data?.rent?.thisYear}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly</p>
                <p className="text-2xl font-bold text-green-500">
                  {listingCount?.data?.sale?.thisMonth +
                    listingCount?.data?.rent?.thisMonth}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weekly</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {listingCount?.data?.sale?.thisWeek +
                    listingCount?.data?.rent?.thisWeek}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Metrics Overview
        </h2>
        <div className="h-80">
          {isLoading ? (
            <div className="animate-pulse h-full bg-gray-200 rounded"></div>
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
