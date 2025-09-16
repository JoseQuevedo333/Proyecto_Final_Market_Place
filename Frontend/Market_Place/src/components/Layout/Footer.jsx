import React from "react";

function Footer() {
  return (
    <footer
      className="text-white py-4 mt-4"
      style={{ backgroundColor: "red" }} // 👈 fondo rojo
    >
      <div className="container text-center">
        <ul className="nav justify-content-center mb-3">
          <li className="nav-item">
            <a className="nav-link text-white fw-bold" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white fw-bold" href="#">
              Contact
            </a>
          </li>
        </ul>
        <p className="mb-0 fw-bold">
          © 2025 - Avalon Marketplace - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
