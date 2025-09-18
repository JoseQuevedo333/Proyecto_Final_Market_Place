import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";


export default function Settings({ show, handleClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
   const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "medium");

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("bg-dark", !darkMode);
    document.body.classList.toggle("text-light", !darkMode);
  };


   useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "large" ? "20px" : "16px";
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Preferencias</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="switch"
            id="dark-mode-switch"
            label="Modo oscuro"
            checked={darkMode}
            onChange={toggleTheme}
          />

          <Form.Check
  type="switch"
  id="email-notifications-switch"
  label="Notificaciones por correo"
  checked={notifications}
  onChange={() => setNotifications(!notifications)}
/>

 <Form.Label>Tamaño de fuente</Form.Label>
          <Form.Select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </Form.Select>


        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
