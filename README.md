# NovaCart - Premium Online Shopping Website

A modern, responsive e-commerce frontend built with React, Vite, Bootstrap 5, and React Router. Created as a frontend internship assignment.

## Features

- **Home page** with hero banner, featured products, category cards, promo banner, and footer
- **Product listing page** with 16 sample products across 4 categories (Men, Women, Footwear, Accessories)
- **Product search** by name
- **Category filtering** and **price sorting** (low to high, high to low, alphabetical)
- **Product details page** with size/color selection, description, and related products
- **Add to Cart** functionality with toast confirmation
- **Shopping cart page** with quantity controls, remove buttons, subtotal, shipping calculation, and total in Indian Rupees (₹)
- **Cart persistence** using localStorage (cart survives page refresh)
- **Contact Us page** with form validation (name, email, message)
- **Fully responsive** design for mobile, tablet, and desktop
- **Empty cart message** and **no search results message**
- Working navigation between all pages

## Tech Stack

- React 18 (JavaScript)
- Vite 5
- Bootstrap 5 + Bootstrap Icons
- React Router DOM 7
- Custom CSS for premium styling
- localStorage for cart persistence

## Project Structure

```
src/
├── components/
│   ├── Footer.jsx        # Footer with links and newsletter
│   ├── Hero.jsx           # Home page hero banner
│   ├── Navbar.jsx         # Navigation bar with search and cart icon
│   └── ProductCard.jsx    # Reusable product card component
├── context/
│   └── CartContext.jsx    # Cart state management with localStorage
├── data/
│   └── products.js        # Sample product data (16 products)
├── pages/
│   ├── Cart.jsx           # Shopping cart page
│   ├── Contact.jsx        # Contact form with validation
│   ├── Home.jsx           # Home page
│   ├── ProductDetail.jsx  # Individual product page
│   └── Products.jsx       # Product listing with filters
├── styles/
│   └── novacart.css       # Custom premium styles
├── App.jsx                # Main app with routing
└── main.jsx               # Entry point
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Notes

- No real payments, authentication, or backend are used
- All product data is local/sample data
- Product images are from Pexels (free to use)
- Cart is saved in the browser's localStorage
