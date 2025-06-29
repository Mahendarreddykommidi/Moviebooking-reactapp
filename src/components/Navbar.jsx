import { Search, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'];
  const [selectedCity, setSelectedCity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className='flex items-center justify-between py-4 px-6 md:px-16 lg:px-24 border-b bg-white shadow-lg relative'>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://cdn.prod.website-files.com/600ee75084e3fe0e5731624c/65b6384089ec9e265952391f_bookmyshow-logo-vector-removebg-preview%20(1).png"
          alt=""
          className="w-32 md:w-40"
        />
      </Link>

      {/* Desktop Search */}
      <div className="max-w-lg w-full px-4 py-2 items-center rounded-lg shadow-inner bg-gray-100 max-sm:hidden flex">
        <input
          type="search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search for movies, theatres..."
          className="w-full border-0 outline-none rounded-lg px-4 py-2 bg-transparent focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-400"
        />
        <button className="ml-2 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center">
          <Search size={20} />
        </button>
      </div>

      {/* Mobile menu and search toggles */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={() => setMobileSearchOpen((prev) => !prev)}
        >
          <Search size={22} />
        </button>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Desktop City Dropdown & Sign In */}
      <div className="items-center max-sm:hidden flex">
        <div className="relative">
          <button
            className="bg-gray-200 px-2 md:px-4 lg:px-6 py-2 rounded-lg mr-4"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {selectedCity ? selectedCity : "Select City"}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              {cities.map((city, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCity === city ? "bg-gray-200" : ""}`}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowDropdown(false);
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className='bg-red-500 px-6 max-sm:px-4 max-sm:text-sm inline-flex max-sm:py-0.5 py-2 text-white rounded-lg'>sign in</button>
      </div>

      {/* Mobile Searchbar */}
      {mobileSearchOpen && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-lg px-4 py-3 flex items-center z-30 md:hidden">
          <input
            type="search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search for movies, theatres..."
            className="w-full border-0 outline-none rounded-lg px-4 py-2 bg-gray-100 focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-400"
          />
          <button className="ml-2 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 w-full bg-white shadow-lg  z-30 flex flex-col gap-2 p-4 md:hidden">
          {/* Mobile Searchbar inside menu */}
          <div className="flex items-center mb-2">
            <input
              type="search"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search for movies, theatres..."
              className="w-full border-0 outline-none rounded-lg px-4 py-2 bg-gray-100 focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-400"
            />
            <button className="ml-2 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center">
              <Search size={20} />
            </button>
          </div>
          <div className="relative mb-2">
            <button
              className="bg-gray-200 px-4 py-2 rounded-lg w-full text-left"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {selectedCity ? selectedCity : "Select City"}
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-40">
                {cities.map((city, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCity === city ? "bg-gray-200" : ""}`}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowDropdown(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className='bg-red-500 px-6 py-2 text-white rounded-lg w-full'>sign in</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;