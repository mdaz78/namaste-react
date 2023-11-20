import React from 'react';

export default function Header() {
  return (
    <div className='container'>
      <div className='header-container'>
        <div className='logo-container'>
          <h1 className='logo'>Namaste Food</h1>
        </div>
        <div className='menu-container'>
          <li className='menu-items'>Discover</li>
          <li className='menu-items'>Search</li>
          <li className='menu-items'>Blog</li>
          <li className='menu-items'>Contact</li>
        </div>
      </div>
    </div>
  );
}
