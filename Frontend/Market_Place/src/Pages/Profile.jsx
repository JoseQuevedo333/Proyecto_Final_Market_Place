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
      // if no user is logged in, redirect to login
      navigate("/login");
    }
  }, [navigate]);

   const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Container
        fluid
        className="py-5"
        style={{ backgroundColor: "#7ED957", minHeight: "80vh" }}
      >
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="mb-5">
              Bienvenido, {user ? user.email : "Usuario"}!
            </h2>

            <div className="d-grid gap-4">
              <Card className="p-3">
                <Button variant="light" size="lg">
                  Historial de Pedidos y Compras
                </Button>
              </Card>

              <Card className="p-3">
                <Button  as={Link} 
                to="/Cart"
                variant="light"
                size="lg"
                className="text-dark">
                   
                  Carrito
                  
                </Button>
              </Card>

              <Card className="p-3">

                 <Button variant="light" size="lg" onClick={() => setShowSettings(true)}>
                  Abrir configuración
                  </Button>

                  <Settings
        show={showSettings}
        handleClose={() => setShowSettings(false)}
      />

              </Card>

              <Card className="p-3">
                <Button  as={Link} to="/add-product" variant="light" size="lg">
                Agregar producto 
                </Button>
              </Card>

               <Card className="p-3">
                <Button  className="btn btn-lg custom-red" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Card>

            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Profile;