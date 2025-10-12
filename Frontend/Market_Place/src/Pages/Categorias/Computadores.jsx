import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPages";

export default function Computadores() {
  return (
    <div style={{ backgroundColor: "#0c0c0c", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <CategoriaPage
          titulo="Computadores"
          descripcion="PCs, notebooks y accesorios para trabajo, estudio o gaming."
          categoria="Computadores"
        />
      </main>
      <Footer />
    </div>
  );
}
