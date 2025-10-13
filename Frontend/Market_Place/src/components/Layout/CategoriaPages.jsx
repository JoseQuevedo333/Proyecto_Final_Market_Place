import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CategoriaPage({ titulo, descripcion, categoria }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch("https://backendmarketplace-h8yv.onrender.com/productos");
        const data = await res.json();

        const filtered = data
          .filter((p) => p.category?.toLowerCase() === categoria.toLowerCase()) // ✅ changed this
          .map((p) => ({
            ...p,
            name: p.nombre,
            price: Number(p.precio),
          }));

        setProducts(filtered);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    fetchCategoryProducts();
  }, [categoria]);

  return (
    <div className="container py-5 text-center">
      <h1 className="text-yellow-400 mb-3">{titulo}</h1>
      <p className="text-gray-400 mb-4">{descripcion}</p>

      <div
        className="grid"
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {products.length === 0 ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="card bg-dark border border-yellow-600 text-white"
            >
              <img
                src={product.image_url || product.img}
                alt={product.nombre}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5>{product.nombre}</h5>
                <p className="text-warning">${product.precio}</p>
                <button
                  className="btn btn-warning w-100"
                  onClick={() => addToCart(product)}
                >
                  Añadir al carrito 🛒
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}