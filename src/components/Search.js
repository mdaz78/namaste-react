import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaSearch } from 'react-icons/fa';

export default function Search() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='flex justify-center text-4xl font-bold text-white'>
        Discover restaurants and more near you
      </h1>

      <div className='flex justify-center w-full m-3'>
        <form
          className='relative flex items-center w-1/3 m-3'
          onSubmit={() => {}}
        >
          <div className='absolute text-xl left-3'>
            <FaSearch />
          </div>
          <input
            type='search'
            placeholder='Search for a restaurant'
            className='w-full h-10 pl-10 pr-10 text-sm font-medium border border-gray-300 rounded-full outline-none focus:shadow-lg'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div
            className='absolute text-3xl text-theme-red right-1'
            onClick={() => {
              initiateSearch();
            }}
          >
            <FaArrowAltCircleRight />
          </div>
        </form>
      </div>
    </div>
  );
}
