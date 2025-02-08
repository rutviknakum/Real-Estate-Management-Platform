import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminDisplayAllListingPage from "./pages/AdminDisplayAllListingPage";
import ApprovedListing from "./pages/ApprovedListing";
import PendingListing from "./pages/PendingListing";
import RejectedListing from "./pages/RejectedListing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/Alllisting"
              element={<AdminDisplayAllListingPage />}
            />
            <Route path="/approvedlisting" element={<ApprovedListing />} />
            <Route path="/pendinglisting" element={<PendingListing />} />
            <Route path="/rejectedlisting" element={<RejectedListing />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
