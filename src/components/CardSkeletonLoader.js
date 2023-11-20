import React from 'react';

const CardSkeletonLoader = () => {
  return (
    <div className='w-[250px] h-full p-2'>
      <div className='p-2.5 border border-gray-200 rounded-md'>
        <div className='animate-pulse'>
          {/* Background Image */}
          <div className='h-[150px] bg-gray-100 rounded-md mb-2'></div>

          {/* Title and Rating */}
          <div className='mb-2'>
            <div className='w-full h-4 mb-2 bg-gray-100 rounded'></div>
          </div>

          {/* Cuisine */}
          <div className='mt-4'>
            <div className='w-full h-4 mb-2 bg-gray-100 rounded'></div>
            <div className='w-full h-4 mb-2 bg-gray-100 rounded'></div>
          </div>

          {/* ETA */}
          <div className='mt-4'>
            <div className='w-3/4 h-4 bg-gray-100 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeletonLoader;
