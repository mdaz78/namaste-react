import React from 'react';

const MenuItem = ({ children }) => {
  return (
    <div className='px-3 py-2 list-none hover:cursor-pointer text-doordash-dark font-medium hover:text-doordash-red transition-colors relative group'>
      {children}
      <span className='absolute bottom-0 left-3 right-3 h-0.5 bg-doordash-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></span>
    </div>
  );
};

export default MenuItem;
