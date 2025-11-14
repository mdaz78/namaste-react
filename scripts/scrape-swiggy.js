const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  city: 'Kolkata',
  targetRestaurantCount: 100,
  scrollDelay: 2000,
  menuDelay: 1000,
  headless: false, // Set to true for production
};

// Swiggy URL for Kolkata
const SWIGGY_URL = 'https://www.swiggy.com/city/kolkata';

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to scroll page
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Extract restaurant data from Swiggy page
async function scrapeRestaurants(page) {
  console.log('Extracting restaurant data from page...');

  const restaurants = await page.evaluate(() => {
    const restaurantCards = [];

    // Try to find restaurant cards on the page
    const cards = document.querySelectorAll('[data-testid="restaurant-card"], .RestaurantList__grid > div, .styles_container__K_VT1');

    cards.forEach((card, index) => {
      try {
        // Extract restaurant name
        const nameElement = card.querySelector('div[class*="name"], .sc-aXZVg, h3, div[class*="title"]');
        const name = nameElement?.textContent?.trim();

        if (!name) return;

        // Extract cuisines
        const cuisinesElement = card.querySelector('div[class*="cuisines"], .sc-djWRfJ, div[class*="category"]');
        const cuisinesText = cuisinesElement?.textContent?.trim() || '';
        const cuisines = cuisinesText.split(',').map(c => c.trim()).filter(c => c);

        // Extract rating
        const ratingElement = card.querySelector('div[class*="rating"], .sc-beySPh, span[class*="star"]');
        const ratingText = ratingElement?.textContent?.trim() || '4.0';
        const rating = parseFloat(ratingText.replace(/[^\d.]/g, '')) || 4.0;

        // Extract delivery time
        const timeElement = card.querySelector('div[class*="deliveryTime"], div[class*="time"], .sc-gswNZR');
        const timeText = timeElement?.textContent?.trim() || '30 mins';

        // Extract cost for two
        const costElement = card.querySelector('div[class*="cost"], div[class*="price"], .sc-eDvSVe');
        const costText = costElement?.textContent?.trim() || '₹300 for two';

        // Extract image
        const imgElement = card.querySelector('img');
        const imgSrc = imgElement?.src || '';

        // Extract discount info if available
        const discountElement = card.querySelector('div[class*="discount"], div[class*="offer"], .sc-bGbJRg');
        const discountText = discountElement?.textContent?.trim();

        // Generate ID from name
        const id = `kolkata_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${index}`;

        restaurantCards.push({
          name,
          cuisines,
          rating,
          ratingText,
          deliveryTime: timeText,
          costForTwo: costText,
          imgSrc,
          discountText,
          id
        });
      } catch (error) {
        console.error('Error extracting card:', error);
      }
    });

    return restaurantCards;
  });

  return restaurants;
}

// Format restaurant data to match db.json structure
function formatRestaurantData(restaurants) {
  return restaurants.map((restaurant, index) => {
    const id = restaurant.id || `rest_${Date.now()}_${index}`;
    const deliveryTime = parseInt(restaurant.deliveryTime) || 30;
    const rating = restaurant.rating || 4.0;

    // Extract cloudinary ID from image or use placeholder
    let cloudinaryImageId = '';
    if (restaurant.imgSrc && restaurant.imgSrc.includes('cloudinary') || restaurant.imgSrc.includes('swiggy')) {
      cloudinaryImageId = restaurant.imgSrc;
    } else {
      // Use Unsplash as fallback
      const unsplashImages = [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=660&h=400&fit=crop',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=660&h=400&fit=crop',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=660&h=400&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&h=400&fit=crop',
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=660&h=400&fit=crop',
      ];
      cloudinaryImageId = unsplashImages[index % unsplashImages.length];
    }

    const restaurantObj = {
      info: {
        id: id,
        name: restaurant.name,
        cloudinaryImageId: cloudinaryImageId,
        locality: 'Kolkata',
        areaName: 'Central Kolkata',
        costForTwo: restaurant.costForTwo || '₹300 for two',
        cuisines: restaurant.cuisines || ['Indian'],
        avgRating: rating,
        avgRatingString: rating.toString(),
        totalRatingsString: `${Math.floor(Math.random() * 50 + 10)}K+ ratings`,
        veg: restaurant.cuisines.some(c => c.toLowerCase().includes('veg')),
        sla: {
          deliveryTime: deliveryTime,
          lastMileTravel: Math.random() * 5 + 1,
          slaString: `${deliveryTime} mins`
        }
      }
    };

    // Add discount info if available
    if (restaurant.discountText) {
      const discountMatch = restaurant.discountText.match(/(\d+%?\s*OFF|FLAT\s*₹?\d+)/i);
      if (discountMatch) {
        restaurantObj.info.aggregatedDiscountInfoV3 = {
          header: discountMatch[0],
          subHeader: restaurant.discountText
        };
      }
    }

    return restaurantObj;
  });
}

// Generate sample menu data for a restaurant
function generateMenuData(restaurantId, restaurantName, cuisines) {
  const categories = [
    'Recommended',
    'Popular Dishes',
    'Main Course',
    'Starters',
    'Breads',
    'Rice & Biryani',
    'Desserts',
    'Beverages'
  ];

  const menuCards = [
    {},
    {},
    {
      card: {
        card: {
          "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.RestaurantLicenseInfo",
          type: "RESTAURANT_RENDERER",
          data: {
            type: "restaurant",
            id: restaurantId,
            name: restaurantName,
            city: "Kolkata",
            area: "Central Kolkata"
          }
        }
      }
    },
    {}
  ];

  // Add menu categories
  const categoryCards = categories.map((category, catIndex) => {
    const itemCount = Math.floor(Math.random() * 8) + 3;
    const items = [];

    for (let i = 0; i < itemCount; i++) {
      const dishNames = [
        'Special Biryani', 'Paneer Tikka', 'Butter Chicken', 'Dal Makhani',
        'Naan', 'Roti', 'Gulab Jamun', 'Raita', 'Mix Veg', 'Chicken Curry',
        'Fish Fry', 'Mutton Rogan Josh', 'Palak Paneer', 'Chole Bhature',
        'Dosa', 'Idli', 'Vada', 'Samosa', 'Lassi', 'Masala Chai'
      ];

      const itemName = `${category} ${dishNames[Math.floor(Math.random() * dishNames.length)]} ${i + 1}`;
      const price = (Math.floor(Math.random() * 300) + 100) * 100;

      items.push({
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.Dish",
          info: {
            id: `${restaurantId}_item_${catIndex}_${i}`,
            name: itemName,
            category: category,
            description: `Delicious ${itemName.toLowerCase()} prepared with authentic spices`,
            imageId: `item_${Math.floor(Math.random() * 1000)}`,
            price: price,
            defaultPrice: price,
            ratings: {
              aggregatedRating: {
                rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                ratingCountV2: Math.floor(Math.random() * 500 + 50).toString()
              }
            },
            isVeg: Math.random() > 0.5 ? 1 : 0
          }
        }
      });
    }

    return {
      card: {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
          title: category,
          itemCards: items
        }
      }
    };
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

// Main scraping function
async function main() {
  console.log(`Starting Swiggy scraper for ${CONFIG.city}...`);
  console.log(`Target: ${CONFIG.targetRestaurantCount} restaurants\n`);

  let browser;
  let allRestaurants = [];

  try {
    // Launch browser
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: CONFIG.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to Swiggy
    console.log(`Navigating to ${SWIGGY_URL}...`);
    await page.goto(SWIGGY_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('Page loaded, waiting for content...');
    await wait(5000);

    // Try to handle location popup if it appears
    try {
      const locationButton = await page.$('button[class*="location"], button[class*="confirm"]');
      if (locationButton) {
        await locationButton.click();
        await wait(2000);
      }
    } catch (e) {
      console.log('No location popup found');
    }

    // Scroll to load more restaurants
    console.log('Scrolling to load restaurants...');
    for (let i = 0; i < 10; i++) {
      await autoScroll(page);
      await wait(CONFIG.scrollDelay);

      const currentRestaurants = await scrapeRestaurants(page);
      console.log(`Scroll ${i + 1}: Found ${currentRestaurants.length} restaurants`);

      if (currentRestaurants.length >= CONFIG.targetRestaurantCount) {
        allRestaurants = currentRestaurants.slice(0, CONFIG.targetRestaurantCount);
        break;
      }
      allRestaurants = currentRestaurants;
    }

    console.log(`\nTotal restaurants scraped: ${allRestaurants.length}`);

    if (allRestaurants.length === 0) {
      throw new Error('No restaurants found. The page structure might have changed.');
    }

    await browser.close();

    // Format data
    console.log('\nFormatting restaurant data...');
    const formattedRestaurants = formatRestaurantData(allRestaurants);

    // Generate menu data
    console.log('Generating menu data for each restaurant...');
    const menuData = {};
    formattedRestaurants.forEach(restaurant => {
      const menuKey = `menu_${restaurant.info.id}`;
      menuData[menuKey] = generateMenuData(
        restaurant.info.id,
        restaurant.info.name,
        restaurant.info.cuisines
      );
    });

    // Read existing db.json
    console.log('\nReading existing db.json...');
    const dbPath = path.join(__dirname, '..', 'db.json');
    let existingData = { restaurants: { data: { data: { cards: [] } } } };

    if (fs.existsSync(dbPath)) {
      existingData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    }

    // Merge data
    console.log('Merging with existing data...');
    const existingRestaurants = existingData.restaurants?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    const mergedRestaurants = [...existingRestaurants, ...formattedRestaurants];

    // Create final structure
    const finalData = {
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
                        restaurants: mergedRestaurants
                      }
                    }
                  }
                }
              }
            ]
          }
        }
      },
      ...menuData,
      // Preserve existing menu data
      ...Object.keys(existingData)
        .filter(key => key.startsWith('menu_'))
        .reduce((acc, key) => ({ ...acc, [key]: existingData[key] }), {})
    };

    // Write to db.json
    console.log('\nWriting to db.json...');
    fs.writeFileSync(dbPath, JSON.stringify(finalData, null, 2));

    console.log('\n✅ Success!');
    console.log(`Total restaurants in db.json: ${mergedRestaurants.length}`);
    console.log(`New restaurants added: ${formattedRestaurants.length}`);
    console.log(`Menu endpoints created: ${Object.keys(menuData).length}`);

  } catch (error) {
    console.error('\n❌ Error during scraping:', error.message);
    console.error(error.stack);

    if (browser) {
      await browser.close();
    }

    process.exit(1);
  }
}

// Run the scraper
main();
