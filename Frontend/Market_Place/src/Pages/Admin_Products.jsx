import React, { useState } from "react";
import { Modal, Button, Form, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default function AdminProducts() {
  const [productos, setProductos] = useState([]);
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
    setProductos((prev) => [...prev, nuevo]);
    setNuevoProducto({ nombre: "", descripcion: "", precio: "", imagen: "", categoria: "" });
    handleClose();
  };

  const handleEliminar = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔧 Montar el Modal dentro del contenedor del tema (.light/.dark)
  const themeContainer =
    typeof document !== "undefined"
      ? document.querySelector("#root > .light, #root > .dark") || document.getElementById("root")
      : undefined;

  return (
    <>
      <Navbar />

      <Container fluid className="admin-products py-4">
        {/* Volver al perfil */}
        <div className="back-row mb-3">
          <Button as={Link} to="/profile" className="btn-back">
            ⬅ Volver al Perfil
          </Button>
        </div>

        {/* Header con botón agregar */}
        <div className="admin-header card-elev mb-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h2 className="m-0 admin-title">🖥️ Administrar Productos</h2>
              <p className="m-0 admin-subtitle">Agrega, edita o elimina productos fácilmente</p>
            </div>
            <div>
              <Button className="btn-add" onClick={handleShow}>
                + Agregar Producto
              </Button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="admin-card card-elev">
          <Table hover responsive className="admin-table m-0">
            <thead>
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
                  <td colSpan="6" className="text-center p-4 text-muted">
                    No hay productos disponibles
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id} className="row-elev">
                    <td>
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>{p.categoria}</td>
                    <td className="text-price">${parseFloat(p.precio).toFixed(2)}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2">Editar</Button>
                      <Button className="btn-delete" size="sm" onClick={() => handleEliminar(p.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        container={themeContainer}              /* 👈 clave */
        backdropClassName="mp-backdrop"
        contentClassName="modal-content-custom"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">Agregar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-custom">
          <Form>
            <Form.Group className="mb-3" controlId="mp-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="mp-descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
                placeholder="Descripción corta"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="mp-categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleChange}
                placeholder="Ej. Accesorios"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="mp-precio">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
                placeholder="0.00"
              />
            </Form.Group>

            <Form.Group className="mb-0" controlId="mp-imagen">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={nuevoProducto.imagen}
                onChange={handleChange}
                placeholder="https://..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button className="btn-form" onClick={handleAgregar}>Agregar Producto</Button>
        </Modal.Footer>
      </Modal>

      <Footer />

      <style>{`
        .light {
          --admin-bg: var(--main-bg, #f7f7f7);
          --admin-card-bg: var(--surface-1, #fff);
          --admin-card-border: var(--border, #e5e7eb);
          --admin-header-bg: #DAF222;
          --admin-header-text: #232608;

          --admin-accent: #232608;
          --admin-accent-contrast: #DAF222;
          --admin-accent-hover: #898C23;

          --admin-delete-bg: #E30613;
          --admin-delete-hover: #c30510;
          --admin-price: #E30613;

          --elev-1: 0 6px 18px rgba(0,0,0,.12);
          --elev-2: 0 16px 40px rgba(0,0,0,.18);

          /* Form / Modal */
          --form-card-bg: var(--surface-1, #fff);
          --form-card-border: var(--border, #e5e7eb);
          --form-title: var(--carousel-title, #232608);
          --form-text: var(--text, #213547);
          --form-input-bg: var(--input-bg, #fff);
          --form-input-border: var(--input-border, #d1d5db);
          --form-btn-bg: #232608;
          --form-btn-text: #DAF222;
          --form-btn-hover: #898C23;
        }
        .dark {
          --admin-bg: var(--main-bg, #151515);
          --admin-card-bg: var(--surface-1, #1a1a1a);
          --admin-card-border: var(--border, #2f333a);
          --admin-header-bg: #232608;
          --admin-header-text: #DAF222;

          --admin-accent: #DAF222;
          --admin-accent-contrast: #232608;
          --admin-accent-hover: #F2E635;

          --admin-delete-bg: #DAF222;
          --admin-delete-hover: #F2E635;
          --admin-price: #F2E635;

          --elev-1: 0 10px 24px rgba(0,0,0,.45);
          --elev-2: 0 24px 56px rgba(0,0,0,.55);

          --form-card-bg: var(--surface-1, #1a1a1a);
          --form-card-border: var(--border, #2f333a);
          --form-title: var(--carousel-title, #DAF222);
          --form-text: var(--text, #e6e6e6);
          --form-input-bg: var(--input-bg, #222);
          --form-input-border: var(--input-border, #2f333a);
          --form-btn-bg: #DAF222;
          --form-btn-text: #232608;
          --form-btn-hover: #F2E635;
        }

        .admin-products { background: var(--admin-bg); min-height: 80vh; }

        .card-elev {
          background: var(--admin-card-bg);
          border: 1px solid var(--admin-card-border);
          border-radius: 16px;
          box-shadow: var(--elev-2);
        }

        .back-row { display: flex; align-items: center; }
        .btn-back {
          background: transparent !important;
          border: 2px solid var(--admin-accent) !important;
          color: var(--admin-accent) !important;
          font-weight: 700 !important;
          padding: .45rem 1rem !important;
          border-radius: 999px !important;
          transition: all .2s ease;
          box-shadow: var(--elev-1);
        }
        .btn-back:hover { background: var(--admin-accent) !important; color: var(--admin-accent-contrast) !important; }

        .admin-header {
          background: var(--admin-header-bg);
          color: var(--admin-header-text);
          border: 1px solid var(--admin-card-border);
          box-shadow: var(--elev-1);
          padding: 1.25rem 1.5rem;
        }
        .admin-title { font-weight: 800; }
        .admin-subtitle { opacity: .9; }

        .admin-card { padding: 0.5rem; }

        .admin-table { background: var(--admin-card-bg); color: var(--text, #111); }
        .admin-table thead th {
          background: var(--admin-card-bg);
          color: var(--admin-header-text);
          border-bottom: 2px solid var(--admin-card-border);
          font-weight: 800;
        }
        .admin-table tbody tr { transition: transform .08s ease, background-color .12s ease, box-shadow .12s ease; }
        .admin-table tbody tr:hover { background: rgba(0,0,0,.04); box-shadow: var(--elev-1); transform: translateY(-1px); }
        .dark .admin-table tbody tr:hover { background: rgba(255,255,255,.05); }

        .text-price { color: var(--admin-price); font-weight: 800; }

        .btn-add {
          background: var(--admin-accent) !important;
          color: var(--admin-accent-contrast) !important;
          border: 1px solid transparent !important;
          font-weight: 800 !important;
          padding: .6rem 1.2rem !important;
          border-radius: 999px !important;
          box-shadow: var(--elev-1);
        }
        .btn-add:hover { background: var(--admin-accent-hover) !important; }

        .btn-delete {
          background: var(--admin-delete-bg) !important;
          border: none !important;
          color: #fff !important;
          font-weight: 700 !important;
          border-radius: 10px !important;
          padding: .35rem .8rem !important;
          box-shadow: var(--elev-1);
        }
        .btn-delete:hover { background: var(--admin-delete-hover) !important; }

        /* Backdrop del modal */
        .mp-backdrop { background-color: #000 !important; }
        .light .mp-backdrop.show { opacity: 0.25 !important; }
        .dark  .mp-backdrop.show { opacity: 0.40 !important; }

        /* Contenido del modal — con fallback explícito por si faltara la var */
        .modal-content-custom {
          background: var(--form-card-bg, #ffffff) !important;
          color: var(--form-text, #213547) !important;
          border: 1px solid var(--form-card-border, #e5e7eb) !important;
          border-radius: 14px !important;
          box-shadow: var(--elev-2) !important;
          overflow: hidden;
        }
        .modal-header-custom {
          background: var(--form-card-bg, #ffffff) !important;
          color: var(--form-text, #213547) !important;
          border-bottom: 1px solid var(--form-card-border, #e5e7eb) !important;
        }
        .modal-title-custom { color: var(--form-title, #232608) !important; font-weight: 800 !important; }
        .modal-body-custom { background: var(--form-card-bg, #ffffff) !important; }
        .modal-footer-custom { background: var(--form-card-bg, #ffffff) !important; border-top: 1px solid var(--form-card-border, #e5e7eb) !important; }

        .modal-body-custom .form-label { color: var(--form-text, #213547) !important; }
        .modal-body-custom .form-control {
          background: var(--form-input-bg, #ffffff) !important;
          color: var(--form-text, #213547) !important;
          border-color: var(--form-input-border, #d1d5db) !important;
        }
        .modal-body-custom .form-control::placeholder { opacity: .7; }

        .btn-form {
          background: var(--form-btn-bg, #232608) !important;
          color: var(--form-btn-text, #DAF222) !important;
          border: none !important;
          font-weight: 800 !important;
          padding: .55rem 1.2rem !important;
          border-radius: 10px !important;
          box-shadow: var(--elev-1) !important;
        }
        .btn-form:hover { background: var(--form-btn-hover, #898C23) !important; }
      `}</style>
    </>
  );
}
