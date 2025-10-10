import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // REEMPLAZANDO con la url de la api..
        const response = await fetch(`https://backendmarketplace-h8yv.onrender.com/productos/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center mt-5">
        <h3>Producto no encontrado</h3>
        <Link to="/">⬅ Volver al Home</Link>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6 text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px" }}
          />
        </div>

        {/* Información */}
        <div className="col-md-6">
          <h1 className="mb-3">{producto.nombre}</h1>
          <p className="text-muted mb-1">
            Categoría: <b>{producto.categoria}</b>
          </p>
          <h3 className="text-danger mb-3">${producto.precio.toFixed(2)}</h3>
          <p>{producto.descripcion}</p>

          {/* Botón de carrito ahora solo visual, sin lógica */}
          <button className="btn btn-success btn-lg mt-3" disabled>
            🛒 Añadir al carrito (deshabilitado)
          </button>

          <div className="mt-4">
            <Link to="/">⬅ Volver al Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
