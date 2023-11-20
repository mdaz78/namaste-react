import React, { useState, useEffect } from 'react';
import Search from './Search';
import Cards from './Cards';
import axios from 'axios';

import { API_URL } from '../utils/constants';
import { restaurantDataCleanup } from '../utils';

export default function Body() {
  const [restaurants, setRestaurants] = useState([]);
  const [requestFailed, setIsRequestFailed] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await axios.get(API_URL);
      const restaurantData =
        data?.data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      const _restaurants = restaurantDataCleanup(restaurantData);
      setRestaurants(_restaurants);
    };
    try {
      fetchRestaurants();
    } catch (err) {
      console.log(err);
      setIsRequestFailed(true);
    }
  }, []);

  return (
    <div className=''>
      <div className='bg-[url("https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/hero_v3/hero_desktop.png")] h-[300px] w-full bg-cover'>
        <div className='hero-body'>
          <Search />
        </div>
      </div>
      <div className='w-full p-10'>
        <Cards restaurants={restaurants} requestFailed={requestFailed} />
      </div>
    </div>
  );
}
