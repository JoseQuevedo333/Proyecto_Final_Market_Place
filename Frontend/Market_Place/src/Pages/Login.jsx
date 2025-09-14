import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../components/Layout/AppNavbar";
import AppFooter from "../components/Layout/AppFooter";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    console.log("Iniciando Sesion:", { email, password });

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    // TODO: call login API
  };

  return (
    <>
      <AppNavbar />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 bg-dark text-white shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4">📝 Inicie Sesión</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
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
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="success" size="lg">
                      Iniciar Sesión
                    </Button>
                  </div>
                </Form>

                <p className="mt-4 text-center">
                  ¿No tienes una Cuenta?{" "}
                  <Link to="/register" className="text-info">
                    Registrate aquí
                  </Link>
                </p>
                <p className="text-center">
                  <Link to="/" className="text-light">
                    ⬅ Volver al Home
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <AppFooter />
    </>
  );
}

export default Login;