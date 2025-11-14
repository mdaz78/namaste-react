# Namaste React - Food Delivery App

A modern, responsive food delivery application with a **DoorDash-inspired design system**, built with React as part of the [Namaste React](https://namastedev.com/learn/namaste-react) course by NamasteDev.

## About This Project

This project is a hands-on implementation of core React concepts and modern web development practices learned through the Namaste React course. It features a **professional, DoorDash-inspired UI/UX** with a clean white background, strategic use of vibrant red accents (#FF3008), and modern design patterns including sticky navigation, shadow elevations, and responsive grid layouts.

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
- **Header Search** - Global search functionality in sticky header
- **Responsive Design** - Fully responsive UI that works on all devices (mobile → tablet → desktop → xl)
- **Skeleton Loading** - Smooth loading states matching card design
- **Route-based Navigation** - Clean URL routing with React Router
- **Mock API Integration** - Local JSON server for development

### DoorDash-Inspired Design System

#### Color Palette
- **DoorDash Red**: `#FF3008` - Primary brand color for CTAs and accents
- **Dark Text**: `#191919` - Main text and headings
- **Gray**: `#696969` - Secondary text and metadata
- **Light Gray**: `#F7F7F7` - Backgrounds and subtle elements

#### Modern Header Design
- **Sticky Navigation** - Header stays visible on scroll with shadow elevation
- **White Background** - Clean, professional appearance with red accents
- **Search Bar** - Centered, prominent search with icon and rounded design
- **Shopping Cart** - Cart icon with item count badge
- **Authentication** - Sign In and Sign Up buttons with hover effects
- **Mobile Menu** - Responsive hamburger menu for smaller screens

#### Hero Section
- **Compelling CTAs** - "Order Now" and "Explore Restaurants" buttons
- **Value Proposition** - Clear messaging: "Your favorite foods, delivered fast"
- **Background Overlay** - Dark gradient for text readability
- **450px Height** - Tall, impactful hero section

#### Restaurant Cards
- **Clean Layout** - Non-overlapping information, structured content
- **Image Hover** - Subtle zoom effect on card hover
- **Shadow Elevation** - Cards lift with shadow on hover
- **Rounded Corners** - Modern rounded-xl design
- **Rating Display** - Star rating with total count (e.g., "4.3 (10K+ ratings)")
- **Veg/Non-Veg Indicator** - Color-coded icons (green/red)
- **Delivery Info** - Delivery time and fee information
- **Responsive Grid** - 1-2-3-4 column layout across breakpoints

### UI/UX Highlights
- Clean, minimalist design with generous white space
- Strategic use of DoorDash red for calls-to-action
- Smooth transitions and hover effects throughout
- Professional typography hierarchy
- Mobile-first responsive approach
- Accessibility-focused color contrasts
- Skeleton loaders matching final design

## Project Structure

```
namaste-react/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Card.js       # Restaurant card component (DoorDash-styled)
│   │   ├── Cards.js      # Restaurant cards grid container
│   │   ├── CardSkeletonLoader.js  # Loading skeleton matching card design
│   │   ├── Header.js     # Sticky navigation header with search
│   │   ├── SearchBar.js  # Search input with icon
│   │   ├── CartIcon.js   # Shopping cart with item badge
│   │   ├── AuthButtons.js # Sign In / Sign Up buttons
│   │   ├── VegNonVegIndicator.js # Veg/Non-veg icon component
│   │   ├── HomeComponent.js       # Main home component with hero
│   │   ├── Search.js     # Search functionality
│   │   └── MenuItem.js   # Navigation menu item with hover effects
│   ├── pages/            # Page components
│   │   ├── Home.js       # Home page
│   │   ├── About.js      # About page
│   │   └── Error.js      # Error page
│   ├── utils/            # Utility functions and constants
│   │   ├── index.js      # Helper functions (restaurantDataCleanup)
│   │   └── constants.js  # API URLs and constants
│   ├── data/             # Static data and assets
│   ├── App.js            # Root component
│   ├── router.js         # Route configuration
│   ├── index.js          # Application entry point
│   └── index.css         # Global styles
├── db.json               # JSON Server database (restaurant data)
├── index.html            # HTML template with meta tags
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS + DoorDash color palette
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

### Design System Development
- **Design Tokens** - Creating a consistent color palette and spacing system
- **Component Design** - DoorDash-inspired modern UI patterns
- **Responsive Design** - Mobile-first approach with breakpoint-based layouts
- **Typography System** - Establishing visual hierarchy with font scales
- **Micro-interactions** - Hover effects, transitions, and animations
- **Design Consistency** - Maintaining unified design language across components

### Styling & UI
- **Tailwind CSS** - Utility-first CSS approach with custom configuration
- **Responsive Grids** - CSS Grid for adaptive layouts (1-2-3-4 columns)
- **Shadow Elevations** - Creating depth with box-shadow
- **Color Theory** - Strategic use of accent colors for CTAs
- **Accessibility** - WCAG-compliant color contrasts

### Build Tools & DevOps
- **Vite** - Fast, modern build tooling
- **pnpm** - Efficient package management
- **JSON Server** - Mocking REST APIs for development
- **Git** - Version control and collaboration

## Design System Architecture

### Component Design Principles
- **Modularity** - Each component serves a single, well-defined purpose
- **Reusability** - Components designed for use across multiple contexts
- **Consistency** - Unified design language across all UI elements
- **Accessibility** - WCAG-compliant color contrasts and semantic HTML

### Responsive Breakpoints
```
mobile:     < 640px  (1 column grid)
sm:         640px    (2 column grid)
md:         768px    (2 column grid)
lg:         1024px   (3 column grid, full header)
xl:         1280px   (4 column grid)
```

### Typography Scale
- **Hero Heading**: text-5xl/text-6xl (48px/60px) - Bold
- **Restaurant Name**: text-lg (18px) - Bold
- **Section Heading**: text-2xl (24px) - Bold
- **Body Text**: text-sm (14px) - Regular
- **Metadata**: text-xs (12px) - Medium

### Spacing System
- **Cards Gap**: gap-6 (1.5rem)
- **Container Padding**: px-4/sm:px-6/lg:px-8
- **Card Padding**: p-4 (1rem)
- **Button Padding**: px-6/px-8 py-2/py-4

## Development Highlights

### DoorDash-Inspired UI/UX
The application features a **professional design system** inspired by DoorDash's "Prism" design language, emphasizing:
- Clean white backgrounds with strategic red accents
- Generous white space for visual clarity
- Shadow elevations for depth perception
- Smooth transitions and micro-interactions
- Mobile-first responsive design

### Component Architecture
Strong component composition with **8 new UI components** added for the DoorDash redesign:
- `SearchBar` - Rounded search input with icon
- `CartIcon` - Interactive cart with badge counter
- `AuthButtons` - CTA buttons for authentication
- `VegNonVegIndicator` - Visual food type indicators

### Performance Optimization
- Efficient re-renders with proper state management
- Responsive images with hover effects
- CSS transitions instead of JavaScript animations
- Grid layout for better rendering performance

### Code Quality
- Clean, readable code following React best practices
- Consistent design tokens via Tailwind config
- Proper component organization and file structure
- Semantic HTML and accessible markup

## Future Enhancements

### Functionality
- [ ] Implement functional shopping cart with add/remove items
- [ ] Add user authentication and profile management
- [ ] Integrate payment gateway
- [ ] Add order tracking and history
- [ ] Implement restaurant detail pages with menu
- [ ] Add favorites/wishlist feature
- [ ] Real-time order status updates

### Design & UX
- [ ] Implement filters (cuisine, rating, price range, delivery fee)
- [ ] Add dark mode with theme toggle
- [ ] Animated page transitions
- [ ] Toast notifications for user actions
- [ ] Loading progress bar
- [ ] Image lazy loading and optimization

### Technical
- [ ] Add unit and integration tests (Jest, React Testing Library)
- [ ] Implement Redux or Context API for state management
- [ ] Progressive Web App (PWA) features
- [ ] SEO optimization and meta tags
- [ ] Performance monitoring and analytics

## Screenshots

> **Note**: The application features a modern DoorDash-inspired design with:
> - Sticky white header with red accents
> - Hero section with compelling CTAs
> - Clean restaurant cards with shadow hover effects
> - Responsive grid layout (1-2-3-4 columns)
> - Veg/non-veg indicators and rating displays
>
> Screenshots coming soon!

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
- **DoorDash** - Design inspiration from their "Prism" design language
- **Unsplash** - For food images used in the application

## License

ISC

---

**Note:** This is a learning project built as part of the Namaste React course. The application uses mock data and is intended for educational purposes.
