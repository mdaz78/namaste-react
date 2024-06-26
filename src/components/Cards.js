import React from "react";
import Card from "./Card";
import CardSkeletonLoader from "./CardSkeletonLoader";

const Cards = ({ restaurants, filteredRestaurants, requestFailed }) => {
  if (!requestFailed && restaurants.length === 0) {
    return (
      <div className="flex flex-wrap w-full">
        {[...Array(9)].map((_, index) => (
          <CardSkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (filteredRestaurants.length === 0) {
    return (
      <div className="text-lg font-bold text-center text-theme-red">
        OOPS your search returned no result!
      </div>
    );
  }

  return (
    <div className="flex flex-wrap w-full">
      {filteredRestaurants.map((resData) => {
        return <Card key={resData.id} {...resData} />;
      })}
    </div>
  );
};

export default Cards;
