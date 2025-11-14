import React from "react";
import { FaRegStar } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

import { CLOUDINARY_URL } from "../utils/constants";
import VegNonVegIndicator from "./VegNonVegIndicator";

const Card = ({
  imageId,
  rating,
  name,
  cuisines,
  costForTwo,
  eta,
  veg,
  totalRatingsString
}) => {
  // Check if imageId is a full URL or a Cloudinary ID
  const imageUrl = imageId?.startsWith('http')
    ? imageId
    : `${CLOUDINARY_URL}${imageId}`;

  // Mock delivery fee (you can make this dynamic based on your data)
  const deliveryFee = "Free delivery";

  return (
    <div className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Restaurant Name */}
        <h2 className="text-lg font-bold text-doordash-dark truncate">
          {name}
        </h2>

        {/* Cuisines */}
        <p className="text-sm text-doordash-gray truncate">
          {cuisines.join(", ")}
        </p>

        {/* Rating and Veg Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaRegStar className="text-yellow-500 text-sm" />
            <span className="text-sm font-semibold text-doordash-dark">
              {Number.isInteger(rating) ? `${rating}.0` : rating}
            </span>
            {totalRatingsString && (
              <span className="text-xs text-doordash-gray">
                ({totalRatingsString})
              </span>
            )}
          </div>
          <VegNonVegIndicator isVeg={veg} />
        </div>

        {/* Delivery Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-doordash-gray">
            <MdDeliveryDining className="text-lg" />
            <span>{eta} mins</span>
          </div>
          <span className="text-xs font-medium text-green-600">
            {deliveryFee}
          </span>
        </div>

        {/* Cost for Two */}
        <div className="text-sm font-medium text-doordash-dark">
          {costForTwo}
        </div>
      </div>
    </div>
  );
};

export default Card;
