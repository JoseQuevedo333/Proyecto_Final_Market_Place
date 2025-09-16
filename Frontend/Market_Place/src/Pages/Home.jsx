// src/Pages/Home.jsx
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Carousel from "../components/Layout/Carousel";
import InfoOfferCard from "../components/UI/InfoOfferCard";
import ScrollableRow from "../components/UI/ScrollableRow";

export default function Home() {
  const carouselItems = Array.from({ length: 12 }).map((_, i) => ({
    id: `it-${i}`,
    title: `Producto ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/item${i}/200/150`,
  }));

  // Categorías que quieres mostrar
  const categorias = [
    "Cables",
    "Computadores",
    "Teléfonos",
    "Videojuegos",
    "Descuentos",
    "Ver nuevamente",
    "Historial",
    "Noticias",
  ];

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

      {/* Contenido principal (crece para llenar espacio) */}
      <main style={{ flex: 1 }}>
        <Carousel />

        {/* Sección de categorías */}
        <section className="container" style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 12 }}>Explora categorías / Ofertas</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {categorias.map((titulo, i) => (
              <InfoOfferCard
                key={i}
                title={titulo}
                imageUrl={`https://picsum.photos/seed/cat${i}/300/220`} // 👈 opcional: imagen distinta
                linkTo={`/categoria/${titulo.toLowerCase()}`} // 👈 opcional: link distinto
                linkText="Ver más"
              />
            ))}
          </div>
        </section>

        {/* Sección de recomendaciones */}
        <section
          className="container bg-navbar-red py-5"
          style={{ marginTop: 32, maxWidth: "100%", overflow: "hidden" }}
        >
          <ScrollableRow
            title="Recomendaciones"
            items={carouselItems}
            itemWidth={180}
            itemHeight={150}
            gap={16}
          />
        </section>
      </main>

      {/* Footer fijo abajo si hay poco contenido */}
      <Footer />
    </div>
  );
}
