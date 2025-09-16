import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section style={{ padding: 20 }}>
      <h1>📝 Registro</h1>
      <form>
        <label>
          Nombre:
          <input type="text" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" />
        </label>
        <br />
        <button type="submit">Crear cuenta</button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
      <p>
        <Link to="/">⬅ Volver al Home</Link>
      </p>
    </section>
  );
}
