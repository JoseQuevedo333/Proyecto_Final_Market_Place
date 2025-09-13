import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section style={{ padding: 20 }}>
      <h1>🏠 Home</h1>
      <p>Bienvenido a la página principal.</p>

      <nav>
        <Link to="/login">Ir a Login</Link> |{" "}
        <Link to="/register">Ir a Registro</Link> |{" "}
        <Link to="/notfound">Ir a No encontrado</Link> |{" "}
        <Link to="/product/1">Ver producto 1</Link> |{" "}
        <Link to="/componentesfidel">Ver componentes fidel</Link>
      </nav>
    </section>
  );
}
