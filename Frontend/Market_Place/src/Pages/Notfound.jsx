import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="text-muted mb-4">
        La página que buscas no existe o fue movida.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFound;
