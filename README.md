# Vibe Commerce - E-Commerce Cart Application

A full-stack shopping cart application built with React, Node.js/Express, and MongoDB.

## Features

- **Product Listing** - Browse all available products with images, prices, and stock information
- **Search Functionality** - Real-time product search with 500ms debouncing for optimal performance
- **Stock Management** - Real-time stock tracking that updates as items are added to cart
- **Add to Cart** - Add products to cart with stock validation (max 10 items per product)
- **Shopping Cart** - View and manage cart items with quantity controls
- **Quantity Management** - Increase/decrease item quantities with stock and max limit validation
- **Real-time Stock Updates** - See available stock count that decreases as items are added to cart
- **Cart Totals** - Automatic calculation of subtotals and total price
- **Checkout** - Complete orders with customer information (name and email)
- **Order Receipt** - Generate and display order receipt with order details
- **Responsive Design** - Fully responsive design that works on all devices
- **Active Navigation** - Visual indicators for current page in navigation
- **Footer** - Footer with company information and quick links

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Context API for state management

## Setup Instructions

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
CROSS_ORIGIN=http://localhost:5173
```

**Note:** Replace the `MONGODB_URI` with your actual MongoDB connection string (local or Atlas).

4. Make sure MongoDB is running on your system

5. Seed the database with sample products:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:3000` (or the port specified in your `.env` file)

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory (optional):
```env
VITE_API_BASE_URL=http://localhost:3000
```

**Note:** If not specified, the frontend will default to `http://localhost:3000` for API calls.

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products
  - Returns: Array of products with `_id`, `name`, `price`, `image`, and `stock`
- `GET /api/products/search?query=<search_term>` - Search products by name
  - Query Parameter: `query` (string) - Search term
  - Returns: Array of matching products (case-insensitive search)

### Cart
- `GET /api/cart` - Get cart items with totals and stock information
  - Returns: Object with `items` array and `total` (includes stock info for each item)
- `POST /api/cart` - Add item to cart
  - Body: `{ productId, qty }`
  - Validates: Stock availability and max quantity limit (10 items)
  - Returns: Cart item or error message
- `DELETE /api/cart/:id` - Remove item from cart
  - Params: `id` - Cart item ID
  - Returns: Success message
- `PUT /api/cart/:id` - Update cart item quantity
  - Params: `id` - Cart item ID
  - Body: `{ qty }`
  - Validates: Stock availability and max quantity limit (10 items)
  - Returns: Updated cart item or error message

### Checkout
- `POST /api/cart/checkout` - Process checkout
  - Body: `{ name, email, cartItems }`
  - Returns: Receipt object with order details, timestamp, and receipt ID
  - Note: Clears cart after successful checkout

## Project Structure

### Backend
```
Backend/
├── src/
│   ├── config/
│   ├── models/         # Product and Cart models
│   ├── controllers/    # Business logic
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── db/             # Database connection
│   ├── app.js          # Express app configuration
│   └── index.js        # Server entry point
└── package.json
```

### Frontend
```
Frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── context/        # Context providers
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
└── package.json
```

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Browse products - View all available products with stock information
4. Search products - Use the search bar to find specific products (300ms debounce)
5. Add to cart - Click "Add to Cart" on any product (validates stock availability)
6. View cart - Click on "Cart" in the navbar to view your cart
7. Manage quantities - Use +/- buttons to adjust quantities (respects stock and max limit of 10)
8. Checkout - Fill in your name and email, then click "Checkout"
9. View receipt - Order confirmation modal with receipt details

## Key Features Explained

### Stock Management
- Products have individual stock counts stored in the database
- Stock is validated on both frontend and backend when adding/updating items
- Users cannot exceed available stock or the maximum limit of 10 items per product
- Stock count on product cards updates in real-time: Available stock = Total stock - Items in cart
- When stock is limited (e.g., 4 items), users cannot add more than available
- Out of stock products are clearly marked and cannot be added to cart
- Stock information is displayed for each cart item

### Search Functionality
- Real-time product search with 300ms debouncing
- Case-insensitive search by product name
- Instant reset to show all products when search is cleared
- Search bar appears only on the products page

### Cart Management
- Add/remove items with stock validation
- Update quantities with +/- buttons
- Maximum quantity limit: 10 items per product
- Real-time total calculation
- Stock information displayed for each cart item

### UI/UX Features
- Active page indicators in navigation
- Responsive design for mobile and desktop
- Loading states during API calls
- Error handling with user-friendly messages
- Footer with company information
- Modern gradient design with blue-purple theme

## Notes

- This is a mock e-commerce application for demonstration purposes
- No real payment processing is implemented
- Cart data is stored in MongoDB
- Products are seeded using the seed script (`npm run seed`)
- Stock validation prevents overselling
- Maximum 10 items per product can be added to cart
- All API endpoints include proper error handling and validation
