import React from 'react';
import MenuItem from './MenuItem';

export default function Header() {
  return (
    <div className='p-10 pb-0 text-white bg-theme-red'>
      <div className='flex items-center justify-between pb-5 '>
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
