import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import Settings from "./Settings";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (loggedIn) {
      setUser(JSON.parse(loggedIn));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      {/* Contenido principal */}
      <Container fluid className="py-5 profile-wrap">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="mb-5 profile-title">
              Bienvenido, {user ? user.email : "Usuario"}!
            </h2>

            <div className="d-grid gap-4">
              <Card className="p-3 profile-card">
                <Button className="btn btn-profile" size="lg">
                  Historial de Pedidos y Compras
                </Button>
              </Card>

              <Card className="p-3 profile-card">
                <Button as={Link} to="/cart" className="btn btn-profile" size="lg">
                  Carrito
                </Button>
              </Card>

              <Card className="p-3 profile-card">
                <Button
                  className="btn btn-profile"
                  size="lg"
                  onClick={() => setShowSettings(true)}
                >
                  Abrir configuración
                </Button>

                <Settings
                  show={showSettings}
                  handleClose={() => setShowSettings(false)}
                />
              </Card>

              <Card className="p-3 profile-card">
                <Button
                  as={Link}
                  to="/admin_products"
                  className="btn btn-profile"
                  size="lg"
                >
                  Administrar productos
                </Button>
              </Card>

              <Card className="p-3 profile-card">
                <Button className="btn btn-logout btn-lg" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />

      {/* ===== Estilos por tema (misma paleta que navbar/login/registro) ===== */}
      <style>{`
        /* Variables específicas de Profile */
        .light {
          --profile-page-bg: var(--main-bg);
          --profile-title: var(--carousel-title, #232608);

          --profile-card-bg: #ffffff00;
          --profile-card-border: var(--border);

          /* Botones neutrales de acción */
          --profile-btn-bg: #232608;
          --profile-btn-text: #DAF222;
          --profile-btn-hover: #898C23;

          /* Botón de logout (contraste inverso) */
          --logout-btn-bg: #DAF222;
          --logout-btn-text: #232608;
          --logout-btn-hover: #F2E635;
        }
        .dark {
          --profile-page-bg: var(--main-bg);
          --profile-title: var(--carousel-title, #DAF222);

          --profile-card-bg: #ffffff00;
          --profile-card-border: var(--border);

          /* Invertimos en oscuro */
          --profile-btn-bg: #DAF222;
          --profile-btn-text: #232608;
          --profile-btn-hover: #F2E635;

          --logout-btn-bg: #232608;
          --logout-btn-text: #DAF222;
          --logout-btn-hover: #898C23;
        }

        .profile-wrap {
          background: var(--profile-page-bg);
          min-height: 80vh;
        }

        .profile-title {
          color: var(--profile-title);
          font-weight: 800;
        }

        .profile-card {
          background: var(--profile-card-bg) !important;
          border: 3px solid var(--profile-card-border) !important;
          color: var(--text) !important;
          border-radius: 12px;
        }

        .btn-profile {
          background-color: var(--profile-btn-bg) !important;
          color: var(--profile-btn-text) !important;
          border: none !important;
          font-weight: 700;
        }
        .btn-profile:hover {
          background-color: var(--profile-btn-hover) !important;
          color: var(--profile-btn-text) !important;
        }

        .btn-logout {
          background-color: var(--logout-btn-bg) !important;
          color: var(--logout-btn-text) !important;
          border: none !important;
          font-weight: 800;
        }
        .btn-logout:hover {
          background-color: var(--logout-btn-hover) !important;
          color: var(--logout-btn-text) !important;
        }
      `}</style>
    </>
  );
}

export default Profile;
