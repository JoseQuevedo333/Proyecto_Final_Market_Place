import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    //Validación básica
    if (!email || !password) {
      setError("Por favor ingrese su correo y contraseña.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingrese un correo válido.");
      return;
    }

    //  remplazar esto con llamada real de API
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Inicio de sesión enviado 🚀");
  };

  return (
    <Container className="mt-5 text-white bg-dark p-4 rounded">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="mt-2">
              Iniciar Sesión
            </Button>

            <div className="mt-4 d-grid">
              <Button as={Link} to="/home" variant="secondary">
                Regresar al Inicio
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;