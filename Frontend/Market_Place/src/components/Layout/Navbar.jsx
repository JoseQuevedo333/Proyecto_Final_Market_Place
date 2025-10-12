import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ThemeToggleButton from "../UI/ThemeToggleButton";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-avalon">
      <div className="container-fluid">
        {/* Marca */}
        <Link to="/" className="navbar-brand fw-bold">
          Avalon Marketplace
        </Link>

        {/* Botón hamburguesa */}
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
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : ""}`
                }
                style={{ fontSize: "1.1rem" }}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : ""}`
                }
                style={{ fontSize: "1.1rem" }}
              >
                Ingresar
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : ""}`
                }
                style={{ fontSize: "1.1rem" }}
              >
                Registrar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Sobre_Nosotros"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : ""}`
                }
                style={{ fontSize: "1.1rem" }}
              >
                Sobre Nosotros
              </NavLink>
            </li>
          </ul>

          {/* Derecha: Carrito + Botón tema */}
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/cart"
              className="btn btn-cart d-inline-flex align-items-center gap-2"
            >
              <span>Ir Hacia el Carrito</span>
              <FaShoppingCart size={20} />
            </Link>

            {/* Envoltorio para poder forzar el estilo del botón interno */}
            <div className="btn-theme-toggle">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Estilos del NAVBAR y del toggle por TEMA ===== */}
      <style>{`
        /* -------- Variables por tema (usadas por el navbar y el carrito) -------- */
        .light {
          /* Navbar */
          --navbar-bg:    #DAF222;  /* fondo día */
          --navbar-text:  #232608;  /* texto día */
          --navbar-hover: #898C23;  /* hover día */

          /* Carrito (para que contraste sobre navbar claro) */
          --cart-bg:         #232608;
          --cart-text:       #DAF222;
          --cart-hover-bg:   #898C23;
        }
        .dark {
          /* Navbar */
          --navbar-bg:    #232608;  /* fondo noche */
          --navbar-text:  #DAF222;  /* texto noche */
          --navbar-hover: #F2E635;  /* hover noche */

          /* Carrito (contraste sobre navbar oscuro) */
          --cart-bg:         #DAF222;
          --cart-text:       #232608;
          --cart-hover-bg:   #F2E635;
        }

        /* -------- Navbar -------- */
        .navbar-avalon {
          background-color: var(--navbar-bg) !important;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        /* Marca */
        .navbar-avalon .navbar-brand {
          color: var(--navbar-text) !important;
          font-size: 1.5rem;
        }
        .navbar-avalon .navbar-brand:hover {
          color: var(--navbar-hover) !important;
        }

        /* Links */
        .navbar-avalon .nav-link {
          color: var(--navbar-text) !important;
          text-decoration: none;
        }
        .navbar-avalon .nav-link:hover {
          color: var(--navbar-hover) !important;
        }
        .navbar-avalon .nav-link.active {
          color: #ffffff !important;
          background-color: transparent !important;
          border-bottom: 2px solid var(--navbar-hover);
        }

        /* Botón carrito: colores por tema */
        .navbar-avalon .btn-cart {
          background-color: var(--cart-bg) !important;
          color: var(--cart-text) !important;
          border: none;
          font-weight: 700;
        }
        .navbar-avalon .btn-cart:hover {
          background-color: var(--cart-hover-bg) !important;
          color: var(--cart-text) !important;
        }

        /* Toggler */
        .navbar-avalon .navbar-toggler {
          border-color: rgba(0,0,0,0.2);
        }

        /* -------- Botón de cambio de tema (forzado por tema) -------- */
        .light .btn-theme-toggle button {
          background:#DAF222 !important;
          color:#232608 !important;
          border:2px solid #898C23 !important;
          width:44px;height:44px;border-radius:999px;
        }
        .light .btn-theme-toggle button:hover { background:#F2E635 !important; }

        .dark .btn-theme-toggle button {
          background:#232608 !important;
          color:#DAF222 !important;
          border:2px solid #DAF222 !important;
          width:44px;height:44px;border-radius:999px;
        }
        .dark .btn-theme-toggle button:hover { background:#898C23 !important; }
      `}</style>
    </nav>
  );
}
