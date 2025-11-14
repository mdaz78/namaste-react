const fs = require('fs');
const path = require('path');

// Kolkata restaurant data
const KOLKATA_RESTAURANTS = [
  // Bengali Cuisine
  { name: "Bhojohori Manna", cuisines: ["Bengali", "Indian", "Fish"], locality: "Salt Lake", area: "Sector 5" },
  { name: "6 Ballygunge Place", cuisines: ["Bengali", "Indian"], locality: "Ballygunge", area: "Ballygunge Place" },
  { name: "Kewpies Kitchen", cuisines: ["Bengali", "Home Food"], locality: "Elgin Road", area: "Elgin" },
  { name: "Oh! Calcutta", cuisines: ["Bengali", "Indian", "Seafood"], locality: "Forum Mall", area: "Elgin Road" },
  { name: "Kasturi Restaurant", cuisines: ["Bengali", "North Indian"], locality: "Park Street", area: "Central Kolkata" },
  { name: "Aminia", cuisines: ["Biryani", "Mughlai", "North Indian"], locality: "Park Circus", area: "Park Circus" },
  { name: "Arsalan", cuisines: ["Biryani", "Mughlai", "Kebab"], locality: "Park Circus", area: "Park Circus" },
  { name: "Shiraz Golden Restaurant", cuisines: ["Biryani", "Mughlai", "North Indian"], locality: "Park Street", area: "Park Street" },

  // North Indian
  { name: "Mainland China", cuisines: ["Chinese", "Asian"], locality: "South City Mall", area: "Prince Anwar Shah Road" },
  { name: "Aangan", cuisines: ["North Indian", "Mughlai", "Kebab"], locality: "Salt Lake", area: "Sector 1" },
  { name: "Punjabi Rasoi", cuisines: ["North Indian", "Punjabi", "Tandoor"], locality: "Rajarhat", area: "New Town" },
  { name: "The Bhoj Company", cuisines: ["North Indian", "Thali", "Rajasthani"], locality: "Salt Lake", area: "Sector 5" },

  // South Indian
  { name: "Sagar Ratna", cuisines: ["South Indian", "Vegetarian"], locality: "Gariahat", area: "Gariahat Road" },
  { name: "Banana Leaf", cuisines: ["South Indian", "Kerala"], locality: "Hindustan Park", area: "Gariahat" },
  { name: "Dakshin", cuisines: ["South Indian", "Andhra", "Kerala"], locality: "ITC Sonar", area: "EM Bypass" },

  // Chinese
  { name: "Beijing", cuisines: ["Chinese", "Asian"], locality: "Park Street", area: "Park Street" },
  { name: "Chowman", cuisines: ["Chinese", "Asian", "Thai"], locality: "Ballygunge", area: "Ballygunge" },
  { name: "Yauatcha", cuisines: ["Chinese", "Dim Sum", "Asian"], locality: "Quest Mall", area: "Park Circus" },
  { name: "Tung Fong", cuisines: ["Chinese", "Tibetan"], locality: "Tangra", area: "Tangra Chinatown" },
  { name: "Kim Fa", cuisines: ["Chinese", "Asian"], locality: "Tangra", area: "Tangra Chinatown" },

  // Continental & Multi-cuisine
  { name: "Mocambo", cuisines: ["Continental", "Chinese", "Indian"], locality: "Park Street", area: "Park Street" },
  { name: "Peter Cat", cuisines: ["Continental", "Indian"], locality: "Park Street", area: "Park Street" },
  { name: "Flurys", cuisines: ["Bakery", "Continental", "Desserts"], locality: "Park Street", area: "Park Street" },
  { name: "Trincas", cuisines: ["Continental", "Chinese"], locality: "Park Street", area: "Park Street" },

  // Italian & Pizza
  { name: "Olive Kitchen & Bar", cuisines: ["Italian", "Continental"], locality: "Alipore", area: "Alipore" },
  { name: "La Cucina", cuisines: ["Italian", "Continental"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Pizza Express", cuisines: ["Pizza", "Italian"], locality: "Quest Mall", area: "Park Circus" },
  { name: "Prego", cuisines: ["Italian", "Continental"], locality: "The Westin", area: "Rajarhat" },

  // Fast Food & Cafe
  { name: "Barista Coffee", cuisines: ["Cafe", "Beverages", "Snacks"], locality: "Park Street", area: "Park Street" },
  { name: "Cafe Coffee Day", cuisines: ["Cafe", "Beverages"], locality: "Gariahat", area: "Gariahat" },
  { name: "Starbucks", cuisines: ["Cafe", "Beverages", "Desserts"], locality: "South City Mall", area: "Prince Anwar Shah Road" },

  // Street Food & Snacks
  { name: "Sharma Chai", cuisines: ["Tea", "Snacks", "Street Food"], locality: "College Street", area: "College Street" },
  { name: "Dilkhusa Cabin", cuisines: ["Street Food", "Snacks"], locality: "Gariahat", area: "Gariahat" },
  { name: "Anadi Cabin", cuisines: ["Bengali Snacks", "Street Food"], locality: "Shyambazar", area: "North Kolkata" },

  // Sweets
  { name: "KC Das", cuisines: ["Sweets", "Desserts", "Bengali"], locality: "Esplanade", area: "Dharmatala" },
  { name: "Balaram Mullick", cuisines: ["Sweets", "Desserts"], locality: "Gariahat", area: "Gariahat" },
  { name: "Nahoum & Sons", cuisines: ["Bakery", "Confectionery"], locality: "New Market", area: "Lindsay Street" },

  // Fine Dining
  { name: "Zen", cuisines: ["Asian", "Japanese", "Thai"], locality: "Park Hotel", area: "Park Street" },
  { name: "Saffron", cuisines: ["North Indian", "Mughlai"], locality: "ITC Sonar", area: "EM Bypass" },
  { name: "Sonargaon", cuisines: ["Bengali", "Indian"], locality: "Taj Bengal", area: "Alipore" },

  // Additional Popular Restaurants
  { name: "Royal Indian Hotel", cuisines: ["North Indian", "Mughlai"], locality: "Zakaria Street", area: "Central Kolkata" },
  { name: "Nizam's Restaurant", cuisines: ["Rolls", "Kebab", "Mughlai"], locality: "New Market", area: "New Market" },
  { name: "Kusum Rolls", cuisines: ["Rolls", "Fast Food"], locality: "Salt Lake", area: "Sector 1" },
  { name: "Roll Express", cuisines: ["Rolls", "Fast Food"], locality: "Ballygunge", area: "Ballygunge" },
  { name: "Zeeshan Restaurant", cuisines: ["Biryani", "Mughlai"], locality: "Park Circus", area: "Park Circus" },
  { name: "Apanjan", cuisines: ["Bengali", "Seafood"], locality: "Hindustan Park", area: "Gariahat" },
  { name: "Bijoli Grill", cuisines: ["Kebab", "North Indian"], locality: "Hindustan Park", area: "Gariahat" },
  { name: "Oudh 1590", cuisines: ["Awadhi", "North Indian"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Bohemian", cuisines: ["Continental", "Multi-cuisine"], locality: "Hindustan Park", area: "Gariahat" },
  { name: "Fire And Ice", cuisines: ["Italian", "Continental"], locality: "Park Street", area: "Park Street" },
  { name: "Bombay Brasserie", cuisines: ["North Indian", "Continental"], locality: "Elgin Road", area: "Elgin" },
  { name: "Cafe Mezzuna", cuisines: ["Cafe", "Continental"], locality: "Theatre Road", area: "Elgin" },
  { name: "The Corner Courtyard", cuisines: ["Continental", "Multi-cuisine"], locality: "Sarat Bose Road", area: "Hindustan Park" },
  { name: "Chapter 2", cuisines: ["Continental", "Asian"], locality: "Jawaharlal Nehru Road", area: "Park Circus" },
  { name: "Saptapadi", cuisines: ["Bengali", "Indian"], locality: "Lake Gardens", area: "Lake Gardens" },
  { name: "Banana Leaf Apna Punjabi Dhaba", cuisines: ["North Indian", "Punjabi"], locality: "EM Bypass", area: "Kasba" },
  { name: "Tandoor Park", cuisines: ["North Indian", "Tandoor"], locality: "Rajarhat", area: "New Town" },
  { name: "Haandi", cuisines: ["North Indian", "Mughlai"], locality: "Elgin Road", area: "Elgin" },
  { name: "Bar-B-Q", cuisines: ["North Indian", "Chinese"], locality: "Park Street", area: "Park Street" },
  { name: "Golden Joy", cuisines: ["Chinese", "Asian"], locality: "Tangra", area: "Tangra Chinatown" },
  { name: "China Pearl", cuisines: ["Chinese", "Seafood"], locality: "Tangra", area: "Tangra Chinatown" },
  { name: "Mandarin", cuisines: ["Chinese", "Asian"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Chung Wah", cuisines: ["Chinese", "Asian"], locality: "Tangra", area: "Tangra Chinatown" },
  { name: "Hatari", cuisines: ["Chinese", "Thai"], locality: "Elgin Road", area: "Elgin" },
  { name: "India Restaurant", cuisines: ["South Indian", "Vegetarian"], locality: "Gariahat", area: "Gariahat" },
  { name: "Annapurna", cuisines: ["South Indian", "North Indian"], locality: "Lake Market", area: "Lake Market" },
  { name: "Udupi Home", cuisines: ["South Indian", "Vegetarian"], locality: "Salt Lake", area: "Sector 1" },
  { name: "Madras Cafe", cuisines: ["South Indian", "Vegetarian"], locality: "Ballygunge", area: "Ballygunge" },
  { name: "Basanti", cuisines: ["Bengali", "Indian"], locality: "Lake Market", area: "Lake Market" },
  { name: "Kasturi", cuisines: ["Bengali", "North Indian"], locality: "VIP Road", area: "Rajarhat" },
  { name: "Afraa", cuisines: ["Biryani", "Mughlai"], locality: "Park Circus", area: "Park Circus" },
  { name: "Haji Saheb", cuisines: ["Biryani", "Mughlai"], locality: "Ripon Street", area: "Central Kolkata" },
  { name: "Rahmania", cuisines: ["Biryani", "Mughlai"], locality: "Park Circus", area: "Park Circus" },
  { name: "Dada Boudi Biryani", cuisines: ["Biryani", "Bengali"], locality: "Lake Town", area: "Lake Town" },
  { name: "Azad Hind Dhaba", cuisines: ["North Indian", "Punjabi"], locality: "Elgin Road", area: "Elgin" },
  { name: "Calcutta Pavillion", cuisines: ["Multi-cuisine", "Continental"], locality: "Park Plaza", area: "Park Street" },
  { name: "The Grill Room", cuisines: ["Continental", "Grills"], locality: "The Oberoi Grand", area: "Jawaharlal Nehru Road" },
  { name: "Threesixtythree Degrees", cuisines: ["Multi-cuisine", "Asian"], locality: "The Oberoi Grand", area: "Jawaharlal Nehru Road" },
  { name: "Vintage Asia", cuisines: ["Asian", "Thai", "Japanese"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Yum Yum Cha", cuisines: ["Chinese", "Dim Sum"], locality: "Quest Mall", area: "Park Circus" },
  { name: "Farzi Cafe", cuisines: ["Modern Indian", "Continental"], locality: "Acropolis Mall", area: "Kasba" },
  { name: "Pirates of Grill", cuisines: ["Buffet", "Multi-cuisine"], locality: "Rajarhat", area: "New Town" },
  { name: "Barbeque Nation", cuisines: ["Buffet", "North Indian"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Mainland China", cuisines: ["Chinese", "Asian"], locality: "Camac Street", area: "Park Street" },
  { name: "Cafe Ekante", cuisines: ["Cafe", "Continental"], locality: "Alipore", area: "Alipore" },
  { name: "The Bikers Cafe", cuisines: ["Multi-cuisine", "Fast Food"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Chilli's", cuisines: ["Mexican", "American"], locality: "South City Mall", area: "Prince Anwar Shah Road" },
  { name: "TGI Friday's", cuisines: ["American", "Continental"], locality: "Quest Mall", area: "Park Circus" },
  { name: "Social", cuisines: ["Multi-cuisine", "Continental"], locality: "Hindustan Park", area: "Gariahat" },
  { name: "Lord of the Drinks", cuisines: ["Multi-cuisine", "Continental"], locality: "Park Street", area: "Park Street" },
  { name: "The Grid", cuisines: ["Multi-cuisine", "Continental"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Haka", cuisines: ["Chinese", "Asian"], locality: "Park Street", area: "Park Street" },
  { name: "Wow! Momo", cuisines: ["Momos", "Fast Food"], locality: "Gariahat", area: "Gariahat" },
  { name: "The Salt House", cuisines: ["Continental", "Multi-cuisine"], locality: "Southern Avenue", area: "Golpark" },
  { name: "Bombay Chopstix", cuisines: ["Chinese", "Asian"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Tres", cuisines: ["Mexican", "Continental"], locality: "Park Street", area: "Park Street" },
  { name: "Riyasat", cuisines: ["North Indian", "Mughlai"], locality: "Salt Lake", area: "Sector 5" },
  { name: "Monkey Bar", cuisines: ["Multi-cuisine", "Continental"], locality: "Camac Street", area: "Park Street" },
  { name: "The Bhojohori Manna Junction", cuisines: ["Bengali", "Indian"], locality: "Lake Gardens", area: "Lake Gardens" },
  { name: "Swabhumi", cuisines: ["Bengali", "Indian"], locality: "EM Bypass", area: "Mukundapur" },
];

// Food items database
const FOOD_ITEMS = {
  Bengali: [
    { name: "Kosha Mangsho", price: 450, desc: "Slow-cooked mutton in rich Bengali spices" },
    { name: "Doi Maach", price: 380, desc: "Fish curry in yogurt gravy" },
    { name: "Chingri Malai Curry", price: 550, desc: "Prawns in coconut milk curry" },
    { name: "Bhapa Ilish", price: 600, desc: "Steamed hilsa fish in mustard" },
    { name: "Aloo Posto", price: 200, desc: "Potatoes in poppy seed paste" },
    { name: "Shukto", price: 220, desc: "Mixed vegetable in bitter curry" },
    { name: "Macher Jhol", price: 320, desc: "Traditional Bengali fish curry" },
    { name: "Luchi", price: 80, desc: "Deep fried Bengali flatbread" },
    { name: "Rosogolla", price: 120, desc: "Spongy cottage cheese balls in syrup" },
    { name: "Mishti Doi", price: 100, desc: "Sweet yogurt dessert" }
  ],
  Biryani: [
    { name: "Mutton Biryani", price: 350, desc: "Fragrant basmati rice with tender mutton" },
    { name: "Chicken Biryani", price: 280, desc: "Aromatic chicken biryani with raita" },
    { name: "Egg Biryani", price: 180, desc: "Flavorful biryani with boiled eggs" },
    { name: "Veg Biryani", price: 200, desc: "Mixed vegetables in aromatic rice" },
    { name: "Fish Biryani", price: 320, desc: "Bengali style fish biryani" },
    { name: "Prawn Biryani", price: 420, desc: "Succulent prawns in basmati rice" }
  ],
  NorthIndian: [
    { name: "Butter Chicken", price: 380, desc: "Creamy tomato-based chicken curry" },
    { name: "Dal Makhani", price: 280, desc: "Slow-cooked black lentils in butter" },
    { name: "Paneer Tikka Masala", price: 320, desc: "Cottage cheese in rich gravy" },
    { name: "Tandoori Chicken", price: 420, desc: "Clay oven roasted chicken" },
    { name: "Naan", price: 60, desc: "Soft tandoor-baked bread" },
    { name: "Garlic Naan", price: 80, desc: "Naan topped with garlic" },
    { name: "Rogan Josh", price: 450, desc: "Kashmiri mutton curry" },
    { name: "Chole Bhature", price: 180, desc: "Spicy chickpeas with fried bread" },
    { name: "Palak Paneer", price: 300, desc: "Cottage cheese in spinach gravy" },
    { name: "Kadai Paneer", price: 320, desc: "Cottage cheese in spicy tomato gravy" }
  ],
  SouthIndian: [
    { name: "Masala Dosa", price: 150, desc: "Crispy crepe with potato filling" },
    { name: "Idli Sambhar", price: 100, desc: "Steamed rice cakes with lentil soup" },
    { name: "Medu Vada", price: 120, desc: "Crispy lentil donuts" },
    { name: "Uttapam", price: 140, desc: "Thick savory pancake with toppings" },
    { name: "Rava Dosa", price: 160, desc: "Crispy semolina crepe" },
    { name: "Filter Coffee", price: 60, desc: "Traditional South Indian coffee" },
    { name: "Appam", price: 130, desc: "Rice pancakes with coconut" },
    { name: "Coconut Chutney", price: 40, desc: "Fresh coconut chutney" }
  ],
  Chinese: [
    { name: "Chilli Chicken", price: 320, desc: "Spicy Indo-Chinese chicken" },
    { name: "Hakka Noodles", price: 200, desc: "Stir-fried noodles with vegetables" },
    { name: "Fried Rice", price: 180, desc: "Chinese style fried rice" },
    { name: "Manchurian", price: 250, desc: "Fried balls in spicy sauce" },
    { name: "Spring Rolls", price: 180, desc: "Crispy vegetable rolls" },
    { name: "Sweet & Sour Chicken", price: 340, desc: "Chicken in tangy sauce" },
    { name: "Szechuan Noodles", price: 220, desc: "Spicy Szechuan style noodles" },
    { name: "Momos", price: 150, desc: "Steamed dumplings" }
  ],
  Italian: [
    { name: "Margherita Pizza", price: 380, desc: "Classic pizza with mozzarella and basil" },
    { name: "Pasta Alfredo", price: 340, desc: "Creamy white sauce pasta" },
    { name: "Pasta Arrabiata", price: 320, desc: "Spicy tomato sauce pasta" },
    { name: "Garlic Bread", price: 150, desc: "Toasted bread with garlic butter" },
    { name: "Lasagna", price: 420, desc: "Layered pasta with meat and cheese" },
    { name: "Risotto", price: 380, desc: "Creamy Italian rice dish" }
  ],
  Continental: [
    { name: "Grilled Chicken Steak", price: 480, desc: "Juicy grilled chicken with sides" },
    { name: "Fish & Chips", price: 420, desc: "Battered fish with french fries" },
    { name: "Caesar Salad", price: 280, desc: "Romaine lettuce with Caesar dressing" },
    { name: "Soup of the Day", price: 180, desc: "Chef's special soup" },
    { name: "Mushroom Risotto", price: 360, desc: "Creamy mushroom rice" }
  ],
  Cafe: [
    { name: "Cappuccino", price: 150, desc: "Espresso with steamed milk foam" },
    { name: "Latte", price: 160, desc: "Smooth espresso with milk" },
    { name: "Cold Coffee", price: 180, desc: "Chilled coffee with ice cream" },
    { name: "Sandwich", price: 200, desc: "Grilled sandwich with fries" },
    { name: "Brownie", price: 150, desc: "Warm chocolate brownie" },
    { name: "Cheesecake", price: 220, desc: "Creamy New York style cheesecake" }
  ],
  Desserts: [
    { name: "Gulab Jamun", price: 100, desc: "Sweet milk solid balls in syrup" },
    { name: "Rasgulla", price: 100, desc: "Cottage cheese balls in syrup" },
    { name: "Ice Cream", price: 120, desc: "Assorted flavors" },
    { name: "Chocolate Mousse", price: 200, desc: "Rich chocolate dessert" },
    { name: "Tiramisu", price: 250, desc: "Italian coffee dessert" }
  ]
};

// Unsplash food images
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=660&h=400&fit=crop', // Indian food
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&h=400&fit=crop', // Biryani
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&h=400&fit=crop', // Pizza
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=660&h=400&fit=crop', // Burger
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=660&h=400&fit=crop', // Salad
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=660&h=400&fit=crop', // Pizza
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=660&h=400&fit=crop', // Chinese
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&h=400&fit=crop', // Salad bowl
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=660&h=400&fit=crop', // Burger
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=660&h=400&fit=crop', // Indian thali
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=660&h=400&fit=crop', // Dosa
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=660&h=400&fit=crop', // Noodles
];

// Generate menu for a restaurant
function generateMenu(restaurant, restaurantId) {
  const menuCards = [{}, {}, {
    card: {
      card: {
        "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.RestaurantLicenseInfo",
        type: "RESTAURANT_RENDERER",
        data: {
          type: "restaurant",
          id: restaurantId,
          name: restaurant.name,
          city: "Kolkata",
          area: restaurant.area
        }
      }
    }
  }, {}];

  const categories = ["Recommended", "Popular", "Main Course", "Starters", "Desserts"];
  const categoryCards = [];

  categories.forEach(category => {
    const items = [];
    const cuisineTypes = restaurant.cuisines.map(c => c.replace(/\s+/g, ''));

    // Get relevant food items
    let foodPool = [];
    cuisineTypes.forEach(cuisine => {
      if (FOOD_ITEMS[cuisine]) {
        foodPool = [...foodPool, ...FOOD_ITEMS[cuisine]];
      }
    });

    // Add some generic items if pool is small
    if (foodPool.length < 5) {
      foodPool = [...foodPool, ...FOOD_ITEMS.NorthIndian];
    }

    // Select 4-8 items for this category
    const itemCount = Math.floor(Math.random() * 5) + 4;
    for (let i = 0; i < itemCount && i < foodPool.length; i++) {
      const foodItem = foodPool[i];
      const isVeg = Math.random() > 0.4;

      items.push({
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.Dish",
          info: {
            id: `${restaurantId}_${category}_${i}`,
            name: foodItem.name,
            category: category,
            description: foodItem.desc,
            imageId: FOOD_IMAGES[Math.floor(Math.random() * FOOD_IMAGES.length)],
            price: foodItem.price * 100,
            defaultPrice: foodItem.price * 100,
            ratings: {
              aggregatedRating: {
                rating: (Math.random() * 1 + 4).toFixed(1),
                ratingCountV2: Math.floor(Math.random() * 500 + 50).toString()
              }
            },
            isVeg: isVeg ? 1 : 0
          }
        }
      });
    }

    if (items.length > 0) {
      categoryCards.push({
        card: {
          card: {
            "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
            title: category,
            itemCards: items
          }
        }
      });
    }
  });

  menuCards.push({
    groupedCard: {
      cardGroupMap: {
        REGULAR: {
          cards: categoryCards
        }
      }
    }
  });

  return {
    data: {
      cards: menuCards
    }
  };
}

// Generate restaurant data
function generateRestaurantData() {
  console.log('Generating Kolkata restaurant data...\n');

  const restaurants = KOLKATA_RESTAURANTS.map((restaurant, index) => {
    const id = `kolkata_${restaurant.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${index}`;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const deliveryTime = Math.floor(Math.random() * 30) + 20;
    const costMin = Math.floor(Math.random() * 400) + 200;
    const costMax = costMin + 200;

    return {
      info: {
        id: id,
        name: restaurant.name,
        cloudinaryImageId: FOOD_IMAGES[index % FOOD_IMAGES.length],
        locality: restaurant.locality,
        areaName: restaurant.area,
        costForTwo: `₹${costMin} for two`,
        cuisines: restaurant.cuisines,
        avgRating: parseFloat(rating),
        avgRatingString: rating,
        totalRatingsString: `${Math.floor(Math.random() * 50 + 5)}K+ ratings`,
        veg: restaurant.cuisines.some(c => c.includes('Vegetarian')),
        sla: {
          deliveryTime: deliveryTime,
          lastMileTravel: parseFloat((Math.random() * 8 + 1).toFixed(1)),
          slaString: `${deliveryTime} mins`
        },
        ...(Math.random() > 0.5 && {
          aggregatedDiscountInfoV3: {
            header: `${Math.floor(Math.random() * 50 + 10)}% OFF`,
            subHeader: `UPTO ₹${Math.floor(Math.random() * 100 + 50)}`
          }
        })
      }
    };
  });

  console.log(`✅ Generated ${restaurants.length} restaurants\n`);
  return restaurants;
}

// Main function
function main() {
  console.log('Kolkata Restaurant Data Generator\n');
  console.log('==================================\n');

  // Generate restaurants
  const newRestaurants = generateRestaurantData();

  // Read existing db.json
  const dbPath = path.join(__dirname, '..', 'db.json');
  let existingData = {};

  if (fs.existsSync(dbPath)) {
    console.log('Reading existing db.json...');
    existingData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  }

  // Get existing restaurants
  const existingRestaurants =
    existingData.restaurants?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  console.log(`Existing restaurants: ${existingRestaurants.length}`);
  console.log(`New restaurants: ${newRestaurants.length}`);

  // Merge restaurants
  const allRestaurants = [...existingRestaurants, ...newRestaurants];

  // Create restaurant structure
  const restaurantData = {
    restaurants: {
      data: {
        data: {
          cards: [
            {},
            {
              card: {
                card: {
                  "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget",
                  header: {
                    title: "Top restaurant chains in Kolkata"
                  },
                  gridElements: {
                    infoWithStyle: {
                      restaurants: allRestaurants
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  };

  // Generate menus for new restaurants
  console.log('\nGenerating menu data...');
  const menuData = {};
  newRestaurants.forEach((restaurant, index) => {
    const menuKey = `menu_${restaurant.info.id}`;
    menuData[menuKey] = generateMenu(KOLKATA_RESTAURANTS[index], restaurant.info.id);
    if ((index + 1) % 20 === 0) {
      console.log(`  Generated ${index + 1}/${newRestaurants.length} menus`);
    }
  });
  console.log(`✅ Generated ${newRestaurants.length} menus\n`);

  // Preserve existing menu data
  const existingMenus = Object.keys(existingData)
    .filter(key => key.startsWith('menu_'))
    .reduce((acc, key) => ({ ...acc, [key]: existingData[key] }), {});

  // Combine all data
  const finalData = {
    ...restaurantData,
    ...existingMenus,
    ...menuData
  };

  // Write to db.json
  console.log('Writing to db.json...');
  fs.writeFileSync(dbPath, JSON.stringify(finalData, null, 2));

  console.log('\n✅ SUCCESS!\n');
  console.log('=====================================');
  console.log(`Total restaurants: ${allRestaurants.length}`);
  console.log(`New restaurants added: ${newRestaurants.length}`);
  console.log(`Total menu endpoints: ${Object.keys(menuData).length + Object.keys(existingMenus).length}`);
  console.log('=====================================\n');
}

// Run the generator
main();
