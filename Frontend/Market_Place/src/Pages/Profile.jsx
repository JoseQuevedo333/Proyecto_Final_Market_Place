import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import AppNavbar from "../components/Layout/AppNavbar";
import AppFooter from "../components/Layout/AppFooter";

function Profile() {
  return (
    <>
      {/* Navbar */}
      <AppNavbar />

      {/* Main Content */}
      <Container fluid className="py-5" style={{ backgroundColor: "#7ED957", minHeight: "80vh" }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="mb-5">Bienvenido, Usuario!</h2>

            <div className="d-grid gap-4">
              <Card className="p-3">
                <Button variant="light" size="lg">
                  Historial de Pedidos y Compras
                </Button>
              </Card>

              <Card className="p-3">
                <Button variant="light" size="lg">
                  Carrito
                </Button>
              </Card>

              <Card className="p-3">
                <Button variant="light" size="lg">
                  Ajustes de Usuario
                </Button>
              </Card>

              <Card className="p-3">
                <Button variant="light" size="lg">
                  Ingresar Producto
                </Button>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <AppFooter />
    </>
  );
}

export default Profile;