import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaSearch } from 'react-icons/fa';

export default function Search({
  restaurants,
  filteredRestaurants,
  onSearch,
  resetSearch,
}) {
  const [searchText, setSearchText] = useState('');

  const initiateSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className='flex flex-col items-center h-full pt-6'>
      <h1 className='flex justify-center text-4xl font-bold text-white'>
        Discover restaurants and more near you
      </h1>

      <div className='flex justify-center w-3/4 m-5'>
        <form
          className='relative flex items-center w-1/3 m-3'
          onSubmit={(e) => {
            e.preventDefault();
            initiateSearch();
          }}
        >
          <div className='absolute text-xl left-3'>
            <FaSearch />
          </div>
          <input
            type='search'
            placeholder='Search for a restaurant'
            className='w-full h-10 pl-10 pr-10 text-sm font-medium border border-gray-300 rounded-full outline-none focus:shadow-lg'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <div
            className='absolute text-3xl text-theme-red right-1'
            onClick={initiateSearch}
          >
            <FaArrowAltCircleRight />
          </div>
          {restaurants.length !== filteredRestaurants.length &&
          searchText != '' ? (
            <div className='absolute top-12 right-1'>
              <button
                type='button'
                className='px-2 py-1 text-xs text-white border border-transparent rounded-lg cursor-pointer bg-slate-600 hover:shadow-lg hover:border-slate-200'
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText('');
                  resetSearch();
                }}
              >
                Reset Search
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
