import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { wishlistContext } from "./ContextProvider";

export default function Header() {
  const { wishlistContextData, setWishlistContextData } =
    useContext(wishlistContext);
  console.log(wishlistContextData);

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}&?status=Approved`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchWhislist = async () => {
      try {
        const res = await fetch(
          `/api/wishlist/displayWishlist?userId=${userId}`
        );
        const data = await res.json();
        setWishlist(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWhislist();
  });

  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Prime</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/wishlist">
              <Badge
                badgeContent={
                  wishlistContextData?.length !== 0
                    ? wishlistContextData?.length
                    : wishlist
                }
                color="primary"
              >
                <FavoriteIcon color="action" />
              </Badge>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser?.rest?.avatar}
                  alt="profile"
                />
              ) : (
                <li className=" text-slate-700 hover:underline"> Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
}
