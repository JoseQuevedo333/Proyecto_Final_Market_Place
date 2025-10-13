import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPage";

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
      <Navbar />
      <main style={{ flex: 1 }}>
        <CategoriaPage
          titulo="Cables y Conectividad"
          descripcion="Descubre cables, adaptadores y accesorios para mantener todo conectado."
          categoria="Cables"
        />
      </main>
      <Footer />
    </div>
  );
}
