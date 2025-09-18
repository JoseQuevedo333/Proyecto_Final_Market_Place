import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

function AdminProducts() {
  const [productos, setProductos] = useState([]); // lista vacía al inicio
  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleAgregar = () => {
    const nuevo = { ...nuevoProducto, id: productos.length + 1 };
    setProductos([...productos, nuevo]);
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
      categoria: "",
    });
    handleClose();
  };

  const handleEliminar = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div
        className="p-3 mb-4"
        style={{ backgroundColor: "#222", color: "white", borderRadius: "6px" }}
      >
        <h2>🖥️ Administrar Productos - Tienda de Tecnología</h2>
        <p style={{ color: "#FFD700" }}>
          Agrega, edita o elimina productos fácilmente
        </p>
      </div>

      {/* Botón Agregar */}
      <Button
        style={{ backgroundColor: "#E30613", border: "none" }}
        className="mb-3"
        onClick={handleShow}
      >
        + Agregar Producto
      </Button>

      {/* Tabla de productos */}
      <Table
        hover
        responsive
        style={{ backgroundColor: "#fff", borderRadius: "6px" }}
      >
        <thead style={{ backgroundColor: "#222", color: "#fff" }}>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio ($)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-3 text-muted">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.categoria}</td>
                <td style={{ color: "#E30613", fontWeight: "bold" }}>
                  {producto.precio.toFixed(2)}
                </td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">
                    Editar
                  </Button>
                  <Button
                    style={{ backgroundColor: "#E30613", border: "none" }}
                    size="sm"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para agregar producto */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#222", color: "#fff" }}
        >
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={nuevoProducto.imagen}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: "#E30613", border: "none" }}
            onClick={handleAgregar}
          >
            Agregar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminProducts;
