import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../components/Layout/AppNavbar";
import AppFooter from "../components/Layout/AppFooter";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Registrando:", { name, email, password });

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(""); // limpiar errores previos
    console.log("Formulario enviado:", { name, email, password });
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <>
      {/* Navbar */}
      <AppNavbar />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <div className="p-4 border rounded bg-dark text-white shadow-lg">
              <h2 className="text-center mb-4">📝 Registro</h2>

              {/* Mostrar error si existe */}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Campo de confirmación */}
                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="success" size="lg">
                    Crear cuenta
                  </Button>
                </div>
              </Form>

              <p className="mt-4 text-center">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-info">
                  Inicia sesión
                </Link>
              </p>
              <p className="text-center">
                <Link to="/" className="text-light">
                  ⬅ Volver al Home
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <AppFooter />
    </>
  );
};