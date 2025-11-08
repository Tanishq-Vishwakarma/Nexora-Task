// Note: .env is loaded via -r dotenv/config in package.json script
import Product from "../models/Product.js";
import connectDB from "../db/index.js";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 10
  },
  {
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 4
  },
  {
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    stock: 8
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
    stock: 6
  },
  {
    name: "Gaming Mouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    stock: 10
  },
  {
    name: "USB-C Hub",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
    stock: 15
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    stock: 3
  },
  {
    name: "Monitor Stand",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
    stock: 7
  }
];

const seedProducts = async () => {
  try {
    // Use the existing connectDB function from db/index.js
    await connectDB();
    console.log("Connected to MongoDB using existing connection setup");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Seeded ${insertedProducts.length} products`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    // Try to close connection if it exists
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedProducts();

