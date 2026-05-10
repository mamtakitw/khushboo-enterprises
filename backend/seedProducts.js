const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  // CLOTHING
  { name: "Men's Casual Shirt", category: "Clothing", price: 799, description: "Comfortable cotton casual shirt for everyday wear.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
  { name: "Women's Kurti", category: "Clothing", price: 999, description: "Elegant floral printed kurti for women.", image: "https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?w=500" },
  { name: "Men's Formal Shirt", category: "Clothing", price: 1299, description: "Premium formal shirt for office wear.", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500" },
  { name: "Women's Saree", category: "Clothing", price: 1899, description: "Beautiful silk saree with golden border.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" },
  { name: "Men's T-Shirt", category: "Clothing", price: 599, description: "Stylish round neck t-shirt for casual outings.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
  { name: "Women's Jeans", category: "Clothing", price: 1499, description: "Trendy slim fit jeans for women.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
  { name: "Men's Jacket", category: "Clothing", price: 2499, description: "Warm winter jacket for men.", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },

  // FOOTWEAR
  { name: "Men's Sports Shoes", category: "Footwear", price: 2999, description: "Lightweight sports shoes for running and gym.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { name: "Women's Heels", category: "Footwear", price: 1799, description: "Elegant block heels for formal occasions.", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500" },
  { name: "Men's Formal Shoes", category: "Footwear", price: 3499, description: "Premium leather formal shoes for office.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500" },
  { name: "Women's Sandals", category: "Footwear", price: 999, description: "Comfortable flat sandals for daily use.", image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=500" },
  { name: "Men's Sneakers", category: "Footwear", price: 2499, description: "Trendy sneakers for casual outings.", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
  { name: "Kids Shoes", category: "Footwear", price: 899, description: "Colorful and comfortable shoes for kids.", image: "https://images.unsplash.com/photo-1555860141-ece3f06974b1?w=500" },

  // COSMETICS
  { name: "Lipstick Set", category: "Cosmetics", price: 699, description: "Set of 5 long-lasting matte lipsticks.", image: "https://images.unsplash.com/photo-1586495777744-4e6232bf6dfe?w=500" },
  { name: "Face Moisturizer", category: "Cosmetics", price: 499, description: "Daily hydrating face moisturizer for all skin types.", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500" },
  { name: "Eye Shadow Palette", category: "Cosmetics", price: 899, description: "12 shade eye shadow palette for stunning looks.", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500" },
  { name: "Perfume", category: "Cosmetics", price: 1599, description: "Long lasting luxury fragrance for women.", image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=500" },
  { name: "Foundation", category: "Cosmetics", price: 799, description: "Full coverage liquid foundation for flawless skin.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500" },
  { name: "Hair Serum", category: "Cosmetics", price: 599, description: "Nourishing hair serum for smooth and shiny hair.", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500" },
  { name: "Sunscreen SPF 50", category: "Cosmetics", price: 449, description: "Lightweight sunscreen with SPF 50 protection.", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany({});
    console.log("Old products cleared");

    await Product.insertMany(products);
    console.log("✅ 20 Products Added Successfully!");

    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedDB();