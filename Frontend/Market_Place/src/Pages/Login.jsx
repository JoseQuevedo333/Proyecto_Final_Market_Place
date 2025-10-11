import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { users } from "../assets/users";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError("Email o contraseña incorrecta.");
      return;
    }

    // TODO: call login API
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <>
      <Navbar />

      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="login-card shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4 login-title">📝 Inicie Sesión</h2>

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
                    <Button type="submit" className="btn btn-login btn-lg">
                      Iniciar Sesión
                    </Button>
                  </div>
                </Form>

                <p className="mt-4 text-center">
                  ¿No tienes una Cuenta?{" "}
                  <Link to="/register" className="login-link">
                    Registrate aquí
                  </Link>
                </p>
                <p className="text-center">
                  <Link to="/" className="login-link-muted">
                    ⬅ Volver al Home
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />

      {/* ===== Estilos del Login por tema (misma paleta que navbar/footer/carrusel) ===== */}
      <style>{`
        /* Variables específicas de la página (derivan de tus temas) */
        .light {
          --login-card-bg: var(--surface-1);
          --login-card-border: var(--border);
          --login-title: var(--carousel-title, #232608); /* negro en claro */
          --login-text: var(--text);
          --login-link: var(--link);
          --login-link-muted: #6b7280;
          --login-btn-bg: #232608;     /* igual que navbar/cart oscuro */
          --login-btn-text: #DAF222;
          --login-btn-hover: #898C23;
        }
        .dark {
          --login-card-bg: var(--surface-1);
          --login-card-border: var(--border);
          --login-title: var(--carousel-title, #DAF222); /* amarillo en oscuro */
          --login-text: var(--text);
          --login-link: var(--link);
          --login-link-muted: var(--muted);
          --login-btn-bg: #DAF222;     /* inversión en oscuro */
          --login-btn-text: #232608;
          --login-btn-hover: #F2E635;
        }

        /* Card */
        .login-card {
          background: var(--login-card-bg) !important;
          color: var(--login-text) !important;
          border: 1px solid var(--login-card-border) !important;
          border-radius: 12px;
        }

        .login-title {
          color: var(--login-title);
          font-weight: 800;
        }

        /* Botón principal */
        .btn-login {
          background-color: var(--login-btn-bg) !important;
          color: var(--login-btn-text) !important;
          border: none !important;
          font-weight: 700;
        }
        .btn-login:hover {
          background-color: var(--login-btn-hover) !important;
          color: var(--login-btn-text) !important;
        }

        /* Links */
        .login-link {
          color: var(--login-link) !important;
          font-weight: 700;
          text-decoration: none;
        }
        .login-link:hover { text-decoration: underline; }

        .login-link-muted {
          color: var(--login-link-muted) !important;
          text-decoration: none;
        }
        .login-link-muted:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}

export default Login;
