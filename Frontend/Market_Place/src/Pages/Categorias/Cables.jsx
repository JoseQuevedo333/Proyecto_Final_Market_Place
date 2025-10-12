// src/Pages/Categorias/Cables.jsx
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPages";

export default function Cables() {
  return (
    <div
      style={{
        backgroundColor: "#0c0c0c",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main style={{ flex: 1 }}>
        <CategoriaPage
          titulo="Cables"
          descripcion="Encuentra cables HDMI, USB, de red y más, con la mejor calidad y precio."
          categoria="Cables"
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
