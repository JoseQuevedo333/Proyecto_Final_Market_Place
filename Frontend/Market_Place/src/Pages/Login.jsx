import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section style={{ padding: 20 }}>
      <h1>🔑 Login</h1>
      <form>
        <label>
          Usuario:
          <input type="text" />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" />
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
      <p>
        <Link to="/">⬅ Volver al Home</Link>
      </p>
    </section>
  );
}
