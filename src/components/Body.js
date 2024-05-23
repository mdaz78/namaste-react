import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Search from "./Search";

import { restaurantDataCleanup } from "../utils";
import { API_URL } from "../utils/constants";

export default function Body() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [requestFailed, setIsRequestFailed] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await axios.get(API_URL);
      const restaurantData =
        data?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
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
      <div className='bg-[url("https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/hero_v3/hero_desktop.png")] h-[300px] w-full bg-cover'>
        <div className="h-full hero-body">
          <Search
            restaurants={restaurants}
            filteredRestaurants={filteredRestaurants}
            onSearch={onSearch}
            resetSearch={resetSearch}
          />
        </div>
      </div>
      <div className="w-full p-10">
        <Cards
          filteredRestaurants={filteredRestaurants}
          restaurants={restaurants}
          requestFailed={requestFailed}
        />
      </div>
    </div>
  );
}
