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

  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
  "https://khushboo-enterprises-production.up.railway.app/api/products"
);

      setProducts(response.data.products);

    } catch (error) {

      console.log(error);

    }

  };

  // ADD TO CART

  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item) =>

        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item

      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };

  // INCREASE QUANTITY

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item

    );

    setCart(updatedCart);

  };

  // DECREASE QUANTITY

  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) =>

        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item

      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

  };

  // REMOVE PRODUCT

  const removeFromCart = (indexToRemove) => {

    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);

  };

  // PLACE ORDER

  const placeOrder = async () => {

  if (
    !customerName ||
    !address ||
    !phone
  ) {

    alert("Please fill all checkout details");

    return;

  }

  try {

    const { data } = await axios.post(
      "http://khushboo-enterprises-production.up.railway.app/api/payment/create-order",
      {
        amount: totalPrice
      }
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

      prefill: {

        name: customerName,

        contact: phone

      },

      theme: {

        color: "#2563eb"

      }

    };

    const razor = new window.Razorpay(
      options
    );

    razor.open();

  } catch (error) {

    console.log(error);

  }

};

  // LOGOUT

  const logoutUser = () => {

    localStorage.removeItem("token");

    alert("Logout Successful");

    window.location.reload();

  };

  // TOTAL PRICE

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (

    <div className={
      darkMode
      ? "app-container dark"
      : "app-container"
    }>

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo-section">

          <h1 className="logo">
            Khushboo Enterprises
          </h1>

          <p className="tagline">
            Fashion • Footwear • Cosmetics
          </p>

        </div>

        <div className="nav-links">

          <p>Home</p>
          <p>Shop</p>
          <p>Categories</p>
          <p>Offers</p>
          <p>Contact</p>

          <div className="cart-badge">
            🛒 {cart.length}
          </div>
          
          <button
  className="dark-btn"
  onClick={() =>
    setDarkMode(!darkMode)
  }
>
  {
    darkMode
      ? "☀ Light"
      : "🌙 Dark"
  }
</button>

          {
            token ? (

              <button
                className="logout-btn"
                onClick={logoutUser}
              >
                Logout
              </button>

            ) : (

              <>

                <a href="/login">
                  Login
                </a>

                <a href="/signup">
                  Signup
                </a>

              </>

            )
          }

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-overlay">

          <h1>
            Upgrade Your Style Today
          </h1>

          <p>
            Explore Premium Clothing,
            Footwear & Beauty Products
          </p>

          <button className="hero-btn">
            Explore Collection
          </button>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="products-section">

        <div className="section-header">

          <h2>Trending Products</h2>

          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="search-input"
          />

        </div>

        {/* FILTER BUTTONS */}

        <div className="filter-buttons">

          <button onClick={() => setSelectedCategory("All")}>
            All
          </button>

          <button onClick={() => setSelectedCategory("Clothing")}>
            Clothing
          </button>

          <button onClick={() => setSelectedCategory("Footwear")}>
            Footwear
          </button>

          <button onClick={() => setSelectedCategory("Cosmetics")}>
            Cosmetics
          </button>

        </div>

        {/* PRODUCTS GRID */}

        <div className="products-grid">

          {
            products
              .filter((product) => {

                const matchesCategory =
                  selectedCategory === "All" ||
                  product.category === selectedCategory;

                const matchesSearch =
                  product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                return matchesCategory && matchesSearch;

              })
              .map((product) => (

                <div
                  key={product._id}
                  className="product-card"
                >

                  <div className="image-container">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>

                  <div className="product-info">

                    <h3>{product.name}</h3>

                    <p className="product-category">
                      {product.category}
                    </p>

                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-footer">

                      <h2>
                        ₹ {product.price}
                      </h2>

                      <button
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))
          }

        </div>

      </section>

      {/* CART */}

      <section className="cart-section">

        <div className="cart-header">

          <h2>Shopping Cart</h2>

          <h2>
            Total: ₹ {totalPrice}
          </h2>

        </div>

        {
          cart.length === 0 ? (

            <div className="empty-cart">

              <h3>
                Your Cart is Empty
              </h3>

            </div>

          ) : (

            cart.map((item, index) => (

              <div
                key={index}
                className="cart-item"
              >

                <div>

                  <h3>{item.name}</h3>

                  <p>
                    ₹ {item.price} × {item.quantity}
                  </p>

                </div>

                <div className="cart-controls">

                  <button
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>

                  <button
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))

          )
        }

      </section>

      {/* CHECKOUT */}

      <section className="checkout-section">

        <h2>Checkout Details</h2>

        <div className="checkout-form">

          <input
            type="text"
            placeholder="Enter Full Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <button
            className="checkout-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <h2>
          Khushboo Enterprises
        </h2>

        <p>
          Premium Shopping Experience
          For Everyone
        </p>

        <p>
          © 2026 All Rights Reserved
        </p>

      </footer>

    </div>

  );

}

export default App;