import React from 'react';
import CardSkeletonLoader from './CardSkeletonLoader';
import Card from './Card';

const Cards = ({ restaurants, requestFailed }) => {
  if (!requestFailed && restaurants.length === 0) {
    return (
      <div className='flex flex-wrap w-full'>
        {[...Array(9)].map((_, index) => (
          <CardSkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-wrap w-full'>
      {restaurants.map((resData) => {
        return <Card key={resData.id} cardDetails={resData} />;
      })}
    </div>
  );
};

export default Cards;
