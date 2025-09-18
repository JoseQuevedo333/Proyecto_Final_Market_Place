import React from "react";
import "../../css/TechCart.css";
import { useCart } from "../../context/CartContext"; // 👈 importar hook

export default function Cart() {
  const { cart, addToCart, increase, decrease, remove, total } = useCart();

  const products = [
    {
      id: 1,
      name: "Laptop X200",
      price: 1200,
      img: "/img/laptop.png", // usando carpeta public
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 35,
      img: "/img/wireless_mouse.png",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 80,
      img: "/img/keyboard.png",
    },
  ];

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert(`Checkout successful! Total: $${total.toFixed(2)}`);
  };

  return (
    <main className="tech-cart-container d-flex flex-column min-vh-100">
      <h1 className="tech-cart-title">💻 SuperTech Store</h1>

      {/* Product Cards */}
      <div className="tech-product-list row mb-4 flex-grow-1">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 mb-3">
            <div className="card tech-product-card h-100">
              <img
                src={product.img}
                className="card-img-top tech-product-img"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title tech-product-name">{product.name}</h5>
                <p className="card-text tech-product-price">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  className="btn btn-tech-add mt-auto"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Offcanvas Button */}
      <button
        className="btn btn-tech-cart mb-4 align-self-center"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#techCartOffcanvas"
        aria-controls="techCartOffcanvas"
      >
        🛒 Open Cart ({cart.length})
      </button>

      {/* Cart Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="techCartOffcanvas"
      >
        <div className="offcanvas-header tech-cart-header">
          <h5 className="offcanvas-title">🛒 Your Cart</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p className="text-center text-muted">Your cart is empty</p>
          ) : (
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="tech-cart-item-img me-2"
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <p className="mb-0 text-danger">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => decrease(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => increase(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => remove(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <hr />
          <h5>
            Total: <span className="text-danger">${total.toFixed(2)}</span>
          </h5>
          <button
            className="btn btn-tech-checkout w-100 mt-2"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
