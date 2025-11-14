import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import AuthButtons from "./AuthButtons";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-doordash-red">
                Namaste Food
              </h1>
            </Link>
          </div>

          {/* Desktop: Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Desktop: Navigation & Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center">
              <MenuItem>
                <Link to="/about">About Us</Link>
              </MenuItem>
              <MenuItem>Blog</MenuItem>
              <MenuItem>Contact</MenuItem>
            </nav>
            <div className="flex items-center gap-4">
              <CartIcon itemCount={3} />
              <AuthButtons />
            </div>
          </div>

          {/* Mobile: Menu Button */}
          <button
            className="lg:hidden p-2 text-doordash-dark hover:bg-doordash-light-gray rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile: Search Bar */}
        <div className="lg:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            <div className="block">
              <Link to="/about" className="block py-2 px-3 text-doordash-dark font-medium hover:text-doordash-red">
                About Us
              </Link>
            </div>
            <div className="block py-2 px-3 text-doordash-dark font-medium hover:text-doordash-red">
              Blog
            </div>
            <div className="block py-2 px-3 text-doordash-dark font-medium hover:text-doordash-red">
              Contact
            </div>
          </nav>
          <div className="px-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <CartIcon itemCount={3} />
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
