import React, { useState, useEffect } from 'react';
import Search from './Search';
import Cards from './Cards';

export default function Body() {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <div className=''>
      <div className='bg-[url("https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/hero_v3/hero_desktop.png")] h-[300px] w-full bg-cover'>
        <div className='hero-body'>
          <Search />
        </div>
      </div>
      <div className='w-full p-10'>
        <Cards />
      </div>
    </div>
  );
}
