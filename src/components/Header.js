import React from 'react';
import MenuItem from './MenuItem';

export default function Header() {
  return (
    <div className='bg-[#f54322] p-10 text-white'>
      <div className='flex justify-between items-center pb-5 border-b-2 border-white'>
        <div className='logo-container'>
          <h1 className='text-5xl font-extrabold'>Namaste Food</h1>
        </div>
        <div className='flex'>
          <MenuItem>Discover</MenuItem>
          <MenuItem>Search</MenuItem>
          <MenuItem>Blog</MenuItem>
          <MenuItem>Contact</MenuItem>
        </div>
      </div>
    </div>
  );
}
