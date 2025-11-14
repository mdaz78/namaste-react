export const restaurantDataCleanup = (restaurantData) => {
  return restaurantData.map((resData) => {
    const info = resData?.info;

    if (!info) {
      return {};
    }

    return {
      id: info.id,
      name: info.name,
      imageId: info.cloudinaryImageId,
      costForTwo: info.costForTwo,
      cuisines: info.cuisines,
      rating: info.avgRating,
      eta: info.sla?.slaString,
      veg: info.veg,
      totalRatingsString: info.totalRatingsString,
    };
  });
};
