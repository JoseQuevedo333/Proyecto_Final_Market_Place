import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(""); // se limpian errores previos
    console.log("Formulario enviado:", { email, name, password });
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 border rounded bg-white">
            <h2 className="mb-4">Crear cuenta</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>
                  Ingresa un número de celular o correo electrónico
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Tu nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombres y apellidos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Contraseña (al menos 6 caracteres)</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-muted">
                  La contraseña debe contener al menos seis caracteres.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Vuelve a escribir la contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repite la contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: "#FFD814",
                  borderColor: "#FFD814",
                  color: "black",
                }}
              >
                Verificar correo electrónico
              </Button>
            </Form>

            <hr className="my-4" />

            <p>
              ¿Ya eres cliente?{" "}
              <Link to="/login">De lo contrario, inicia sesión</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
