import Chatbot from "./components/Chatbot";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const token = localStorage.getItem("token");
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://khushboo-backend.onrender.com/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  const placeOrder = async () => {
    if (!customerName || !address || !phone) {
      alert("Please fill all checkout details");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://khushboo-backend.onrender.com/api/payment/order",
        { amount: totalPrice }
      );
      const options = {
        key: "rzp_test_SmSCzjljWGjp6e",
        amount: data.amount,
        currency: data.currency,
        name: "Khushboo Enterprises",
        description: "Order Payment",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful");
          setCart([]);
        },
        prefill: { name: customerName, contact: phone },
        theme: { color: "#2563eb" }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
    console.log(error);
    alert("Error: " + error.message);
  }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    alert("Logout Successful");
    window.location.reload();
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <div className={darkMode ? "app-container dark" : "app-container"}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-section">
          <h1 className="logo">Khushboo Enterprises</h1>
          <p className="tagline">Fashion • Footwear • Cosmetics</p>
        </div>
        <div className="nav-links">
          <p onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</p>
          <p onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Shop</p>
          <p onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}>Categories</p>
          <p onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Offers</p>
          <p onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</p>

          <div
            className="cart-badge"
            style={{ background: "#e11d48", cursor: "pointer" }}
            onClick={() => setShowWishlist(!showWishlist)}
          >
            ❤️ {wishlist.length}
          </div>

          <div className="cart-badge">
            🛒 {cart.length}
          </div>

          <button className="dark-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {token ? (
            <button className="logout-btn" onClick={logoutUser}>Logout</button>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/signup">Signup</a>
            </>
          )}
        </div>
      </nav>

      {/* WISHLIST DRAWER */}
      {showWishlist && (
        <div className="wishlist-drawer">
          <div className="wishlist-header">
            <h2>❤️ My Wishlist ({wishlist.length})</h2>
            <button onClick={() => setShowWishlist(false)}>✖ Close</button>
          </div>
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <p>Your wishlist is empty!</p>
              <p>Click ❤️ on products to save them.</p>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map((product) => (
                <div key={product._id} className="wishlist-card">
                  <img src={product.image} alt={product.name} />
                  <div className="wishlist-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <h4>₹ {product.price}</h4>
                    <div className="wishlist-actions">
                      <button
                        className="add-cart-btn"
                        onClick={() => {
                          addToCart(product);
                          setShowWishlist(false);
                        }}
                      >
                        🛒 Add to Cart
                      </button>
                      <button
                        className="remove-wish-btn"
                        onClick={() => toggleWishlist(product)}
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Upgrade Your Style Today</h1>
          <p>Explore Premium Clothing, Footwear & Beauty Products</p>
          <button className="hero-btn">Explore Collection</button>
        </div>
      </section>

      {/* PRODUCTS */}
               {/* PRODUCTS */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2>Trending Products</h2>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons" id="categories">
          <button onClick={() => setSelectedCategory("All")}>All</button>
          <button onClick={() => setSelectedCategory("Clothing")}>Clothing</button>
          <button onClick={() => setSelectedCategory("Footwear")}>Footwear</button>
          <button onClick={() => setSelectedCategory("Cosmetics")}>Cosmetics</button>
        </div>

        <div className="products-grid">
          {products
            .filter((product) => {
              const matchesCategory =
                selectedCategory === "All" || product.category === selectedCategory;
              const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              return matchesCategory && matchesSearch;
            })
            .map((product) => (
              <div key={product._id} className="product-card">
                <div className="image-container">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(product)}
                  >
                    {isWishlisted(product._id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <h2>₹ {product.price}</h2>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* CART */}
      <section className="cart-section">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <h2>Total: ₹ {totalPrice}</h2>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart"><h3>Your Cart is Empty</h3></div>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p>₹ {item.price} × {item.quantity}</p>
              </div>
              <div className="cart-controls">
                <button onClick={() => increaseQuantity(item._id)}>+</button>
                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* CHECKOUT */}
      <section className="checkout-section">
        <h2>Checkout Details</h2>
        <div className="checkout-form">
          <input type="text" placeholder="Enter Full Name" value={customerName}
            onChange={(e) => setCustomerName(e.target.value)} />
          <input type="text" placeholder="Enter Address" value={address}
            onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder="Enter Phone Number" value={phone}
            onChange={(e) => setPhone(e.target.value)} />
          <button className="checkout-btn" onClick={placeOrder}>Place Order</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <h2>Khushboo Enterprises</h2>
        <p>Premium Shopping Experience For Everyone</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>

      {/* AI CHATBOT */}
      <Chatbot />

    </div>
  );
}

export default App;