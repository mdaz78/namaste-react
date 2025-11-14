# Namaste React - Food Delivery App

A modern, responsive food delivery application built with React as part of the [Namaste React](https://namastedev.com/learn/namaste-react) course by NamasteDev.

## About This Project

This project is a hands-on implementation of core React concepts and modern web development practices learned through the Namaste React course. It simulates a food delivery platform similar to Swiggy, featuring restaurant listings, real-time search, and a clean, user-friendly interface.

## Tech Stack

### Frontend
- **React 18.3.1** - UI library for building component-based interfaces
- **React Router DOM 6.26.2** - Client-side routing
- **Axios 1.7.7** - HTTP client for API requests
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **React Icons 5.3.0** - Icon library
- **React Loading Skeleton 3.5.0** - Skeleton loading states

### Build Tools & Development
- **Vite 5.4.2** - Next-generation frontend build tool
- **PostCSS 8.4.47** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing
- **JSON Server 1.0.0-beta.3** - Mock REST API server

### Package Manager
- **pnpm 9.0.0** - Fast, disk space efficient package manager

## Features

### Core Features
- **Restaurant Listings** - Browse through a curated list of restaurants
- **Real-time Search** - Search restaurants by name with instant results
- **Responsive Design** - Fully responsive UI that works on all devices
- **Skeleton Loading** - Smooth loading states for better UX
- **Route-based Navigation** - Clean URL routing with React Router
- **Mock API Integration** - Local JSON server for development

### UI/UX Highlights
- Clean, modern interface inspired by food delivery platforms
- Hover effects and smooth transitions
- Rating badges and delivery time indicators
- Cost and cuisine information at a glance
- Hero section with search functionality
- Error handling with custom error pages

## Project Structure

```
namaste-react/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Card.js       # Restaurant card component
│   │   ├── Cards.js      # Restaurant cards container
│   │   ├── CardSkeletonLoader.js  # Loading skeleton
│   │   ├── Header.js     # Navigation header
│   │   ├── HomeComponent.js       # Main home component
│   │   ├── Search.js     # Search functionality
│   │   └── MenuItem.js   # Menu item component
│   ├── pages/            # Page components
│   │   ├── Home.js       # Home page
│   │   ├── About.js      # About page
│   │   └── Error.js      # Error page
│   ├── utils/            # Utility functions and constants
│   │   ├── index.js      # Helper functions
│   │   └── constants.js  # API URLs and constants
│   ├── data/             # Static data and assets
│   ├── App.js            # Root component
│   ├── router.js         # Route configuration
│   ├── index.js          # Application entry point
│   └── index.css         # Global styles
├── db.json               # JSON Server database
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (v9.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mdaz78/namaste-react.git
cd namaste-react
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the JSON server (in one terminal):
```bash
pnpm server
```
This will start the mock API server on `http://localhost:3001`

4. Start the development server (in another terminal):
```bash
pnpm start
```
The app will be available at `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm start` | Start Vite development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm server` | Start JSON server on port 3001 |
| `pnpm test` | Run tests with Jest |

## API Endpoints

The application uses a local JSON server that provides the following endpoints:

### Restaurants
```
GET http://localhost:3001/restaurants
```
Returns a list of all available restaurants with details including:
- Restaurant name and ID
- Cuisine types
- Average rating
- Cost for two
- Delivery time
- Location information
- Discount offers

### Restaurant Menu
```
GET http://localhost:3001/menu_{restaurantId}
```
Returns detailed menu information for a specific restaurant:
- Menu categories
- Item details with prices
- Item descriptions and images

Example:
```
GET http://localhost:3001/menu_123456
```

## Key Learning Outcomes

Through building this project, I've gained practical experience in:

### React Fundamentals
- **Component Architecture** - Building reusable, composable components
- **State Management** - Using React hooks (useState, useEffect)
- **Props & Data Flow** - Passing data between components
- **Conditional Rendering** - Handling different UI states
- **List Rendering** - Efficiently rendering lists with keys

### Modern Development Practices
- **React Router** - Implementing client-side routing
- **API Integration** - Fetching and handling data from REST APIs
- **Error Handling** - Graceful error states and error boundaries
- **Loading States** - Skeleton loaders for better UX
- **Search Functionality** - Real-time filtering and search

### Styling & UI
- **Tailwind CSS** - Utility-first CSS approach
- **Responsive Design** - Mobile-first responsive layouts
- **CSS-in-JS** - Dynamic styling with inline styles
- **Component Styling** - Modular and maintainable styles

### Build Tools & DevOps
- **Vite** - Fast, modern build tooling
- **pnpm** - Efficient package management
- **JSON Server** - Mocking REST APIs for development
- **Git** - Version control and collaboration

## Development Highlights

### Component Reusability
The project demonstrates strong component composition with reusable components like `Card`, `Search`, and `CardSkeletonLoader` that can be easily extended and maintained.

### Performance Optimization
- Lazy loading for better initial load times
- Efficient re-renders with proper state management
- Image optimization with appropriate loading strategies

### Code Quality
- Clean, readable code following React best practices
- Proper component organization and file structure
- Consistent naming conventions
- DRY (Don't Repeat Yourself) principles

## Future Enhancements

- [ ] Add restaurant detail pages
- [ ] Implement shopping cart functionality
- [ ] Add user authentication
- [ ] Integrate payment gateway
- [ ] Add order tracking
- [ ] Implement filters (cuisine, rating, price range)
- [ ] Add favorites/wishlist feature
- [ ] Implement dark mode
- [ ] Add unit and integration tests
- [ ] Progressive Web App (PWA) features

## Screenshots

> Add screenshots of your application here once deployed

## Course Information

This project is part of the **Namaste React** course by [NamasteDev](https://namastedev.com/learn/namaste-react), a comprehensive program covering React from fundamentals to advanced concepts.

**Key Topics Covered:**
- React fundamentals and JSX
- Component lifecycle and hooks
- State management
- Routing and navigation
- API integration
- Performance optimization
- Build tools and deployment

## Author

**Md Abu Zafar**
- GitHub: [@mdaz78](https://github.com/mdaz78)
- Course: [Namaste React](https://namastedev.com/learn/namaste-react)

## Acknowledgments

- **Akshay Saini** - Instructor of Namaste React course
- **NamasteDev** - For providing an excellent learning platform
- **Unsplash** - For food images used in the application

## License

ISC

---

**Note:** This is a learning project built as part of the Namaste React course. The application uses mock data and is intended for educational purposes.
