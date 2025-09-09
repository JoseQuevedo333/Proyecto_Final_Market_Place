import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <section style={{ padding: 20 }}>
      <h1>📦 Detalle de Producto</h1>
      <p>Mostrando información del producto con ID: <b>{id}</b></p>

      <p>
        <Link to="/">⬅ Volver al Home</Link>
      </p>
    </section>
  );
}
