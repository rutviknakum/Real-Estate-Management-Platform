import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-slate-100 border">
      <div className="container mx-auto px-6 md:px-12 py-10">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">PrimeEstate</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforming how you discover properties. PrimeEstate is your
              trusted partner in buying, selling, and renting properties.
            </p>
            <div className="flex space-x-4 mt-4">
              <p className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-facebook fa-lg cursor-pointer"></i>
              </p>
              <p className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-twitter fa-lg cursor-pointer"></i>
              </p>
              <p className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-instagram fa-lg cursor-pointer"></i>
              </p>
              <p className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-linkedin fa-lg cursor-pointer"></i>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:m-auto">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-2">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                  activeClassName="text-blue-600 font-semibold" // Optional active styling
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                  activeClassName="text-blue-600 font-semibold"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                  activeClassName="text-blue-600 font-semibold"
                >
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                  activeClassName="text-blue-600 font-semibold"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Get the latest property updates and exclusive offers straight to
              your inbox.
            </p>
            <form className="mt-4 md:flex space-x-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-4 py-2 mt-2 md:mt-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:mx-auto">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <span className="text-gray-600">Email:</span>{" "}
                <a
                  href="mailto:info@primeestate.com"
                  className="text-blue-600 hover:underline"
                >
                  info@primeestate.com
                </a>
              </li>
              <li>
                <span className="text-gray-600">Phone:</span> +1 (123) 456-7890
              </li>
              <li>
                <span className="text-gray-600">Address:</span> 123 Prime St,
                Real Estate City
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-blue-600">PrimeEstate</span>.
            All rights reserved.
          </p>
          <p className="mt-4 md:mt-0">
            Built with ❤️ by{" "}
            <a className="hover:text-blue-600 font-semibold cursor-pointer">
              Team
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
