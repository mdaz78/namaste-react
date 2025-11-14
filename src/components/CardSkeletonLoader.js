import React from 'react';

const CardSkeletonLoader = () => {
  return (
    <div className='bg-white rounded-xl overflow-hidden border border-gray-100'>
      <div className='animate-pulse'>
        {/* Image Section */}
        <div className='h-48 bg-gray-200'></div>

        {/* Content Section */}
        <div className='p-4 space-y-3'>
          {/* Restaurant Name */}
          <div className='h-6 bg-gray-200 rounded w-3/4'></div>

          {/* Cuisines */}
          <div className='h-4 bg-gray-200 rounded w-full'></div>

          {/* Rating and Veg Indicator */}
          <div className='flex items-center justify-between'>
            <div className='h-4 bg-gray-200 rounded w-24'></div>
            <div className='h-4 bg-gray-200 rounded w-16'></div>
          </div>

          {/* Delivery Info */}
          <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
            <div className='h-4 bg-gray-200 rounded w-20'></div>
            <div className='h-4 bg-gray-200 rounded w-24'></div>
          </div>

          {/* Cost for Two */}
          <div className='h-4 bg-gray-200 rounded w-28'></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeletonLoader;
