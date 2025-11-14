import React from "react";
import Card from "./Card";
import CardSkeletonLoader from "./CardSkeletonLoader";

const Cards = ({ restaurants, filteredRestaurants, requestFailed }) => {
  if (!requestFailed && restaurants.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {[...Array(8)].map((_, index) => (
          <CardSkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (filteredRestaurants.length === 0) {
    return (
      <div className="text-lg font-bold text-center text-doordash-red py-12">
        OOPS your search returned no result!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {filteredRestaurants.map((resData) => {
        return <Card key={resData.id} {...resData} />;
      })}
    </div>
  );
};

export default Cards;
