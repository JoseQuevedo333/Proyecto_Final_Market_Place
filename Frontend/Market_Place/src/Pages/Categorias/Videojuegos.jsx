import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPages";

export default function Videojuegos() {
  return (
    <div style={{ backgroundColor: "#0c0c0c", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <CategoriaPage
          titulo="Videojuegos"
          descripcion="Consolas, controles y los últimos títulos del mercado gamer."
          categoria="Videojuegos"
        />
      </main>
      <Footer />
    </div>
  );
}
