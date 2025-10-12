// src/components/CategoriaPage.jsx
import { useEffect, useState } from "react";

const CategoriaPage = ({ categoria }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://backendmarketplace-h8yv.onrender.com/productos");
        const data = await res.json();
        const filtrados = data.filter(
          (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
        );
        setProductos(filtrados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  if (cargando)
    return <p className="text-center text-yellow-400 mt-10">Cargando productos...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
        {categoria}
      </h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay productos disponibles en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-gray-900 border border-yellow-600 rounded-2xl p-4 hover:scale-105 transition-transform shadow-lg"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="rounded-lg h-48 w-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold text-yellow-400">
                {producto.nombre}
              </h3>
              <p className="text-gray-300 mt-1">{producto.descripcion}</p>
              <p className="text-yellow-500 mt-2 font-bold">
                ${producto.precio}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriaPage;
