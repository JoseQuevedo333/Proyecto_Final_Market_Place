import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function Settings({ show, handleClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");

  // --- Helpers para leer/cambiar el tema real (.light/.dark en #root) ---
  const getThemeRoot = () =>
    typeof document !== "undefined"
      ? document.querySelector("#root > .light, #root > .dark") ||
        document.getElementById("root")
      : null;

  const getCurrentTheme = () => {
    const root = getThemeRoot();
    if (!root) return "light";
    return root.classList.contains("dark") ? "dark" : "light";
  };

  const setTheme = (t) => {
    const root = getThemeRoot();
    if (!root) return;
    root.classList.remove("light", "dark");
    root.classList.add(t);
    localStorage.setItem("theme", t);
  };

  // Sincroniza el estado del switch con el tema actual al abrir
  useEffect(() => {
    setDarkMode(getCurrentTheme() === "dark");
  }, [show]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      setTheme(next ? "dark" : "light");
      return next;
    });
  };

  // Tamaño de fuente
  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "large" ? "20px" : "16px";
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Monta el modal dentro del contenedor del tema para heredar variables
  const themeContainer =
    typeof document !== "undefined"
      ? document.querySelector("#root > .light, #root > .dark") ||
        document.getElementById("root")
      : undefined;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        container={themeContainer}
        backdropClassName="mp-backdrop"
        contentClassName="modal-content-custom"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">Preferencias</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-custom">
          <Form>
            <Form.Check
              type="switch"
              id="dark-mode-switch"
              label="Modo oscuro"
              checked={darkMode}
              onChange={toggleTheme}
              className="mb-3"
            />

            <Form.Check
              type="switch"
              id="email-notifications-switch"
              label="Notificaciones por correo"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="mb-3"
            />

            <Form.Group>
              <Form.Label>Tamaño de fuente</Form.Label>
              <Form.Select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Estilos: mismo modal + switches visibles y con color por tema */}
      <style>{`
        /* Backdrop coherente con el de AdminProducts */
        .mp-backdrop { background-color: #000 !important; }
        .light .mp-backdrop.show { opacity: 0.25 !important; }
        .dark  .mp-backdrop.show { opacity: 0.40 !important; }

        /* Fondo sólido del modal */
        .modal-content-custom {
          background: var(--form-card-bg, #ffffff) !important;
          color: var(--form-text, #213547) !important;
          border: 1px solid var(--form-card-border, #e5e7eb) !important;
          border-radius: 14px !important;
          box-shadow: var(--elev-2, 0 16px 40px rgba(0,0,0,.18)) !important;
          overflow: hidden;
        }
        .modal-header-custom {
          background: var(--form-card-bg, #ffffff) !important;
          color: var(--form-text, #213547) !important;
          border-bottom: 1px solid var(--form-card-border, #e5e7eb) !important;
        }
        .modal-title-custom { color: var(--form-title, #232608) !important; font-weight: 800 !important; }
        .modal-body-custom  { background: var(--form-card-bg, #ffffff) !important; }
        .modal-footer-custom {
          background: var(--form-card-bg, #ffffff) !important;
          border-top: 1px solid var(--form-card-border, #e5e7eb) !important;
        }

        /* Inputs / selects */
        .modal-body-custom .form-label,
        .modal-body-custom .form-check-label { color: var(--form-text, #213547) !important; }
        .modal-body-custom .form-control,
        .modal-body-custom .form-select {
          background: var(--form-input-bg, #ffffff) !important;
          color: var(--form-text, #213547) !important;
          border-color: var(--form-input-border, #d1d5db) !important;
          border-radius: 8px !important;
          box-shadow: var(--elev-1, 0 6px 18px rgba(0,0,0,.12));
        }
        .modal-body-custom .form-control:focus,
        .modal-body-custom .form-select:focus {
          border-color: var(--form-btn-bg, #232608) !important;
          box-shadow: 0 0 0 0.25rem rgba(35,38,8,.25);
        }

        /* ===== Switch (visible en ambos temas) ===== */
        .light { --switch-on: #DAF222; --switch-off: var(--surface-2, #f7f7f8); }
        .dark  { --switch-on: #DAF222; --switch-off: var(--surface-2, #222222); }

        .form-switch .form-check-input {
          width: 2.8rem; height: 1.4rem;
          background-color: var(--switch-off) !important;
          border-color: var(--form-input-border, #d1d5db) !important;
          cursor: pointer;
        }
        .form-check-input:focus {
          box-shadow: 0 0 0 0.25rem rgba(218,242,34,.35) !important;
        }
        .form-check-input:checked {
          background-color: var(--switch-on) !important;
          border-color: var(--switch-on) !important;
        }

        /* Botón cerrar */
        .btn-secondary {
          background: var(--form-btn-bg, #232608) !important;
          color: var(--form-btn-text, #DAF222) !important;
          border: none !important;
          font-weight: 700 !important;
          border-radius: 10px !important;
          padding: .5rem 1.2rem !important;
          box-shadow: var(--elev-1, 0 6px 18px rgba(0,0,0,.12)) !important;
        }
        .btn-secondary:hover {
          background: var(--form-btn-hover, #898C23) !important;
        }
      `}</style>
    </>
  );
}
