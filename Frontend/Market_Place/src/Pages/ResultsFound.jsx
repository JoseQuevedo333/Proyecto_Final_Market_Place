// src/Pages/ResultsFound.jsx
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import SearchResultCard from "../components/UI/SearchResultCard";

export default function ResultsFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // 👈 asegura 100% pantalla
      }}
    >
      {/* Header */}
      <Navbar />

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Resultados de búsqueda</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {Array.from({ length: 75 }).map((_, i) => (
            <SearchResultCard key={`p-${i}`} />
          ))}
        </div>
      </section>



      {/* Footer fijo abajo si hay poco contenido */}
      <Footer />
    </div>
  );
}
