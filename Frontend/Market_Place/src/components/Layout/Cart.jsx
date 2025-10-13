import React, { useEffect, useState } from "react";
import "../../css/TechCart.css";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, addToCart, increase, decrease, remove, total } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://backendmarketplace-h8yv.onrender.com/productos");
        const data = await res.json();

        const formattedProducts = data.map((product) => ({
          ...product,
          name: product.nombre,
          price: Number(product.precio),
          image_url: product.image_url,
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío!");
    alert(`Compra realizada con éxito! Total: $${total.toFixed(2)}`);
  };

  return (
    <main
      className="tech-cart-container d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#232608", color: "#F2E635" }}
    >
      <h1
        className="tech-cart-title text-center py-4"
        style={{ color: "#DAF222", fontWeight: "bold" }}
      >
        💻 Avalon Marketplace
      </h1>

      {/* 🔹 Lista de productos */}
      <div className="tech-product-list row mb-4 flex-grow-1 px-4">
        {products.length === 0 ? (
          <p className="text-center text-muted">Cargando productos...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-12 col-md-6 mb-3">
              <div
                className="card h-100 tech-product-card"
                style={{
                  backgroundColor: "#1b1e05",
                  border: "2px solid #F2E635",
                  color: "#DAF222",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image_url || product.img}
                  alt={product.nombre}
                  className="tech-product-img"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "contain", // ✅ mantiene proporción sin recortar
                    backgroundColor: "#fff",
                    borderBottom: "2px solid #F2E635",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p
                    className="card-text"
                    style={{ color: "#F2E635", fontWeight: "bold" }}
                  >
                    ${product.precio ? Number(product.precio).toFixed(2) : "0.00"}
                  </p>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: "#DAF222",
                      color: "#232608",
                      fontWeight: "bold",
                      border: "none",
                    }}
                    onClick={() => addToCart(product)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Botón para abrir carrito */}
      <button
        className="btn mb-4 align-self-center"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#techCartOffcanvas"
        aria-controls="techCartOffcanvas"
        style={{
          backgroundColor: "#DAF222",
          color: "#232608",
          fontWeight: "bold",
          padding: "20px 50px",
          fontSize: "1.4rem",
          borderRadius: "15px",
          boxShadow: "0 0 15px #F2E635",
          transition: "transform 0.2s ease, background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#F2E635")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#DAF222")}
      >
        🛒 Abrir carrito ({cart.length})
      </button>

      {/* 🔹 Offcanvas del carrito */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="techCartOffcanvas"
        style={{ backgroundColor: "#1b1e05", color: "#F2E635" }}
      >
        <div
          className="offcanvas-header"
          style={{ backgroundColor: "#232608", color: "#DAF222" }}
        >
          <h5 className="offcanvas-title">🛒 Tu carrito</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p className="text-center text-muted">Tu carrito está vacío</p>
          ) : (
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: "#232608",
                    color: "#DAF222",
                    borderColor: "#F2E635",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image_url || item.img}
                      alt={item.name}
                      className="me-2"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <p className="mb-0 text-warning">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#F2E635",
                        color: "#232608",
                        fontWeight: "bold",
                      }}
                      onClick={() => decrease(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#F2E635",
                        color: "#232608",
                        fontWeight: "bold",
                      }}
                      onClick={() => increase(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
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
            Total:{" "}
            <span style={{ color: "#DAF222", fontWeight: "bold" }}>
              ${total.toFixed(2)}
            </span>
          </h5>
          <button
            className="btn w-100 mt-2"
            onClick={handleCheckout}
            disabled={cart.length === 0}
            style={{
              backgroundColor: "#DAF222",
              color: "#232608",
              fontWeight: "bold",
              border: "none",
              padding: "12px",
            }}
          >
            Ir a pagar
          </button>
        </div>
      </div>
    </main>
  );
}
