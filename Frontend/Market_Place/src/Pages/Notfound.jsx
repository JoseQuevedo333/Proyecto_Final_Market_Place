import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import "../css/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar-fixed">
        <Navbar />
      </div>

      <div className="notfound-page">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe o fue movida.</p>
        <Button className="btn-superzoo" onClick={() => navigate("/")}>
          ⬅ Volver al inicio
        </Button>
      </div>

      <div className="footer-fixed">
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
