import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

import { restaurantDataCleanup } from "../utils";
import { API_URL } from "../utils/constants";

export default function HomeComponent() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [requestFailed, setIsRequestFailed] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await axios.get(API_URL);
      const restaurantData =
        data?.data?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      console.log({ data: data?.data?.data?.cards, restaurantData });

      const _restaurants = restaurantDataCleanup(restaurantData);
      setRestaurants(_restaurants);
      setFilteredRestaurants(_restaurants);
    };

    try {
      fetchRestaurants();
    } catch (err) {
      console.log(err);
      setIsRequestFailed(true);
    }
  }, []);

  const onSearch = (searchTerm) => {
    const _filteredRes = restaurants.filter((res) => {
      return res.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredRestaurants(_filteredRes);
  };

  const resetSearch = () => {
    setFilteredRestaurants(restaurants);
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[450px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/hero_v3/hero_desktop.png")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Your favorite foods,
              <span className="text-doordash-red"> delivered fast</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the best restaurants and dishes near you. Fresh food delivered to your doorstep in minutes.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-doordash-red text-white font-semibold rounded-full hover:bg-[#E02900] transition-colors shadow-lg">
                Order Now
              </button>
              <button className="px-8 py-4 bg-white text-doordash-dark font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                Explore Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-doordash-dark mb-6">
          Restaurants near you
        </h2>
        <Cards
          filteredRestaurants={filteredRestaurants}
          restaurants={restaurants}
          requestFailed={requestFailed}
        />
      </div>
    </div>
  );
}
