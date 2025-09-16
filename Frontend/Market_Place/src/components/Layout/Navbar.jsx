import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "red",   // 👈 fondo rojo
        paddingTop: "1rem",       // 👈 más alto
        paddingBottom: "1rem",
      }}
    >
      <div className="container-fluid">
        {/* Marca */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ fontSize: "1.5rem", color: "white" }} // 👈 letras blancas
        >
          Avalon Marketplace
        </Link>

        {/* Botón hamburguesa responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link fw-bold"
                to="/"
                style={{ fontSize: "1.1rem", color: "white" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold"
                to="/login"
                style={{ fontSize: "1.1rem", color: "white" }}
              >
                Ingresar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold"
                to="/register"
                style={{ fontSize: "1.1rem", color: "white" }}
              >
                Registrar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold"
                to="/profile"
                style={{ fontSize: "1.1rem", color: "white" }}
              >
                Perfil
              </Link>
            </li>
          </ul>

          {/* Derecha: Carrito */}
          <div className="d-flex">
            <Link to="/cart" className="btn btn-light">
              <FaShoppingCart size={22} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
