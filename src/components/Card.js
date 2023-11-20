import React from 'react';
import { FaRegStar } from 'react-icons/fa';

import { CLOUDINARY_URL } from '../utils/constants';

const Card = ({ cardDetails }) => {
  const bgImageUrl = `${CLOUDINARY_URL}${cardDetails.imageId}`;

  return (
    <div className='h-[300px] p-2 w-[250px] relative'>
      <div className='h-full p-2 border border-gray-200 rounded-md'>
        <div
          className='h-[150px] rounded-md mb-2 bg-cover'
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        ></div>
        <div className='absolute top-6 right-6'>
          <div className='flex items-center px-1 py-0.5 space-x-1 text-xs  w-fit rounded-md bg-green-700 text-white'>
            <div className='pt-[1px]'>
              {Number.isInteger(cardDetails.rating)
                ? `${cardDetails.rating}.0`
                : cardDetails.rating}
            </div>
            <div className=''>
              <FaRegStar />
            </div>
          </div>
        </div>

        <h2 className='pb-0.5 text-sm font-semibold'>{cardDetails.name}</h2>
        <p className='pb-2 text-xs font-medium'>
          {cardDetails.cuisines.join(', ')}
        </p>

        <p className='text-xs font-medium'>{cardDetails.eta}</p>
        <div className='py-0.5 px-1 text-[10px] font-medium border w-fit rounded-md border-gray-200 bg-gray-100 absolute top-6 left-6'>
          {cardDetails.costForTwo}
        </div>
      </div>
    </div>
  );
};

export default Card;
