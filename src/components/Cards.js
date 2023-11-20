import React from 'react';
import CardSkeletonLoader from './CardSkeletonLoader';

const Cards = () => {
  return (
    <div className='flex w-full space-x-3'>
      <CardSkeletonLoader />
      <CardSkeletonLoader />
      <CardSkeletonLoader />
      <CardSkeletonLoader />
      <CardSkeletonLoader />
    </div>
  );
};

export default Cards;
