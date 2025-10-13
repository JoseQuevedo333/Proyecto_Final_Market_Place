import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPage";

export default function Computadores() {
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
          titulo="Computadores y Accesorios"
          descripcion="Encuentra todo lo que necesitas para tu PC gamer o de oficina."
          categoria="PC"
        />
      </main>
      <Footer />
    </div>
  );
}