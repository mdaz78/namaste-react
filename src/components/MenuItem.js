import React from 'react';

const MenuItem = ({ children }) => {
  return (
    <div className='px-3 py-2 border-2 border-transparent list-none hover:cursor-pointer hover:border-white rounded-md'>
      {children}
    </div>
  );
};

export default MenuItem;
