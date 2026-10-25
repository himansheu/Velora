import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic Steel Watch",
    category: "Accessories",
    price: 4999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Studio Headphones",
    category: "Electronics",
    price: 3499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 2799,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Urban Backpack",
    category: "Bags",
    price: 1899,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Aviator Sunglasses",
    category: "Accessories",
    price: 1499,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Noir Eau de Parfum",
    category: "Fragrance",
    price: 3299,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
  },
];

const categories = ["All", "Accessories", "Electronics", "Footwear", "Bags", "Fragrance"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const found = cart.find((item) => item.id === product.id);
    if (found) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const filteredProducts = products.filter(
    (product) =>
      (category === "All" || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  let count = 0;
  let total = 0;
  cart.forEach((item) => {
    count = count + item.quantity;
    total = total + item.price * item.quantity;
  });

  return (
    <div>
      <header className="navbar">
        <div className="container">
          <a href="#top" className="logo">VELORA.</a>
          <a href="#cart">Cart ({count})</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container">
          <p className="tag">Our Collection</p>
          <h1>Discover VELORA.</h1>
          <p>
           A modern shopping experience for everyday essentials.
          </p>
          <a href="#products" className="btn btn-dark">Shop Now</a>
        </div>
      </section>

      <section id="products">
        <div className="container">
          <h2>Our Products</h2>

          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters">
            {categories.map((name) => (
              <button
                key={name}
                className={category === name ? "filter active" : "filter"}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p>No products found. Try a different search or category.</p>
          ) : (
            <div className="grid">
              {filteredProducts.map((product) => (
                <div className="card" key={product.id}>
                  <div className="card-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <div className="card-body">
                    <p className="category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <button className="btn btn-dark" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="cart" className="cart-section">
        <div className="container">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-box">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span>{item.name}</span>
                  <span>₹{item.price} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                  <button className="remove" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <strong>Total: ₹{total}</strong>
                <button className="btn btn-outline" onClick={() => setCart([])}>
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer>
        <p>VELORA © 2026 · By Himanshu Verma</p>
      </footer>
    </div>
  );
}

export default App;