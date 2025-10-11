import React from "react";

export default function Footer() {
  return (
    <footer className="footer-avalon text-center py-4 mt-4">
      <div className="container">
        <ul className="nav justify-content-center mb-3 gap-3">
          <li className="nav-item">
            <a className="nav-link fw-bold" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link fw-bold" href="#">
              Contact
            </a>
          </li>
        </ul>

        <p className="mb-0 fw-bold footer-copy">
          © 2025 - Avalon Marketplace - Todos los derechos reservados
        </p>
      </div>

      {/* ===== Estilos del FOOTER (usa las mismas variables del navbar) ===== */}
      <style>{`
        /* Reutilizamos las variables de navbar para mantener consistencia */
        .light {
          --footer-bg:    var(--navbar-bg, #DAF222);
          --footer-text:  var(--navbar-text, #232608);
          --footer-link:  var(--navbar-text, #232608);
          --footer-hover: var(--navbar-hover, #898C23);
          --footer-border: rgba(0,0,0,.08);
        }
        .dark {
          --footer-bg:    var(--navbar-bg, #232608);
          --footer-text:  var(--navbar-text, #DAF222);
          --footer-link:  var(--navbar-text, #DAF222);
          --footer-hover: var(--navbar-hover, #F2E635);
          --footer-border: rgba(255,255,255,.08);
        }

        .footer-avalon {
          background-color: var(--footer-bg);
          color: var(--footer-text);
          border-top: 1px solid var(--footer-border);
        }

        .footer-avalon .nav-link {
          color: var(--footer-link) !important;
          text-decoration: none;
          padding: .25rem .5rem;
          border-radius: .5rem;
        }
        .footer-avalon .nav-link:hover {
          color: var(--footer-hover) !important;
          text-decoration: underline;
        }

        .footer-avalon .footer-copy {
          color: var(--footer-text);
          opacity: .9;
        }
      `}</style>
    </footer>
  );
}
