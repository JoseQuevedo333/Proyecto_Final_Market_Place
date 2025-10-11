import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ThemeToggleButton from "../UI/ThemeToggleButton"; // 👈 importar botón de tema

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "red",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div className="container-fluid">
        {/* Marca */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ fontSize: "1.5rem", color: "white" }}
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
                Inicio
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
                to="/Sobre_Nosotros"
                style={{ fontSize: "1.1rem", color: "white" }}
              >
                Sobre Nosotros
              </Link>
            </li>
          </ul>

          {/* Derecha: Carrito + Botón tema */}
          <div className="d-flex align-items-center">
            <Link to="/cart" className="btn btn-light">
              <span>Ir Hacia el Carrito</span>
              <FaShoppingCart size={22} />
            </Link>
            <ThemeToggleButton /> {/* 👈 aquí el botón de tema */}
          </div>
        </div>
      </div>
    </nav>
  );
}
