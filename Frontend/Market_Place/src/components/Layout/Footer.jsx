import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <div className="container text-center">
        <ul className="nav justify-content-center mb-3">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Contact</a>
          </li>
        </ul>
        <p className="mb-0">© 2025 - Avalon Marketplace - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;