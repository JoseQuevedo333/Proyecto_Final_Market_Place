import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { users } from "../assets/users";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      setError("Este email ya está registrado.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);

    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    navigate("/profile");
  };

  return (
    <>
      <Navbar />

      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="register-card shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4 register-title">📝 Registro</h2>

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
                    <Button type="submit" className="btn btn-register btn-lg">
                      Crear cuenta
                    </Button>
                  </div>
                </Form>

                <p className="mt-4 text-center">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="register-link">
                    Inicia sesión
                  </Link>
                </p>
                <p className="text-center">
                  <Link to="/" className="register-link-muted">
                    ⬅ Volver al Home
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />

      {/* ===== Estilos del Registro (siguen la misma paleta que login/navbar/footer) ===== */}
      <style>{`
        .light {
          --register-card-bg: var(--surface-1);
          --register-card-border: var(--border);
          --register-title: var(--carousel-title, #232608);
          --register-text: var(--text);
          --register-link: var(--link);
          --register-link-muted: #6b7280;
          --register-btn-bg: #232608;
          --register-btn-text: #DAF222;
          --register-btn-hover: #898C23;
        }
        .dark {
          --register-card-bg: var(--surface-1);
          --register-card-border: var(--border);
          --register-title: var(--carousel-title, #DAF222);
          --register-text: var(--text);
          --register-link: var(--link);
          --register-link-muted: var(--muted);
          --register-btn-bg: #DAF222;
          --register-btn-text: #232608;
          --register-btn-hover: #F2E635;
        }

        .register-card {
          background: var(--register-card-bg) !important;
          color: var(--register-text) !important;
          border: 1px solid var(--register-card-border) !important;
          border-radius: 12px;
          margin: 20px;
        }

        .register-title {
          color: var(--register-title);
          font-weight: 800;
        }

        .btn-register {
          background-color: var(--register-btn-bg) !important;
          color: var(--register-btn-text) !important;
          border: none !important;
          font-weight: 700;
        }
        .btn-register:hover {
          background-color: var(--register-btn-hover) !important;
          color: var(--register-btn-text) !important;
        }

        .register-link {
          color: var(--register-link) !important;
          font-weight: 700;
          text-decoration: none;
        }
        .register-link:hover { text-decoration: underline; }

        .register-link-muted {
          color: var(--register-link-muted) !important;
          text-decoration: none;
        }
        .register-link-muted:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}
