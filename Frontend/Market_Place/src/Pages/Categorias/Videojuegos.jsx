import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPages";

export default function VideoJuegos() {
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
          titulo="Videojuegos"
          descripcion="Explora los mejores títulos para todas las consolas y plataformas."
          categoria="VideoGames"
        />
      </main>
      <Footer />
    </div>
  );
}