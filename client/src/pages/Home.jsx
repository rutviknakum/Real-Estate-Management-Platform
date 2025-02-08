import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function SkeletonListingItem() {
  return (
    <div className="bg-gray-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] animate-pulse">
      <div className="h-[320px] sm:h-[220px] bg-gray-300"></div>
      <div className="p-3 flex flex-col gap-2 w-full">
        <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 w-full rounded"></div>
        </div>
        <div className="h-4 bg-gray-300 w-3/4 rounded mt-2"></div>
        <div className="h-6 bg-gray-300 w-1/2 rounded mt-2"></div>
        <div className="flex gap-4 mt-2">
          <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
          <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonSwiperSlide() {
  return <div className="h-[500px] bg-gray-300 animate-pulse"></div>;
}

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true); // For controlling skeleton loader
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?type=rent&?status=Approved&limit=4"
        );
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?type=sale&?status=Approved&limit=4"
        );
        const data = await res.json();
        setSaleListings(data);

        // Stop loading after 0.3 seconds even if data is already fetched
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Prime Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {loading
          ? [...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <SkeletonSwiperSlide />
              </SwiperSlide>
            ))
          : saleListings.length > 0 &&
            saleListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                ></div>
              </SwiperSlide>
            ))}
      </Swiper>

      {/* Listing results for offer, sale, and rent */}
      <div className="max-w-fit mx-auto p-3 flex flex-col gap-8 my-10">
        {/* Offer Listings */}
        {loading ? (
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <SkeletonListingItem key={index} />
            ))}
          </div>
        ) : (
          rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )
        )}

        {/* Sale Listings */}
        {loading ? (
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <SkeletonListingItem key={index} />
            ))}
          </div>
        ) : (
          saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
