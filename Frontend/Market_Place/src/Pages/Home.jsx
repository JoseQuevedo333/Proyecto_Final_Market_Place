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

  const slides = [
    { src: "https://picsum.photos/1200/400?random=1", alt: "Uno" },
    { src: "https://picsum.photos/1200/400?random=2", alt: "Dos" },
    { src: "https://picsum.photos/1200/400?random=3", alt: "Tres" },
  ];

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
        minHeight: "100vh",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Header */}
      <Navbar />

      {/* Main content */}
      <main style={{ flex: 1 }}>
        <Carousel images={slides} interval={4000} autoPlay loop />

        {/* Categorías */}
        <section
          className="container"
          style={{
            marginTop: 32,
            paddingInline: 16,
          }}
        >
          <h2
            className="text-theme mb-3"
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Explora categorías / Ofertas
          </h2>

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              justifyItems: "center",
            }}
          >
            {categorias.map((titulo, i) => (
              <InfoOfferCard
                key={i}
                title={titulo}
                imageUrl={`https://picsum.photos/seed/cat${i}/300/220`}
                linkTo={`/categoria/${titulo.toLowerCase()}`}
                linkText="Ver más"
              />
            ))}
          </div>
        </section>

        {/* Recomendaciones */}
        <section
          className="container py-5"
          style={{
            marginTop: 32,
            maxWidth: "100%",
            overflow: "hidden",
            backgroundColor: "#898C23",
          }}
        >
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: 16,
              fontSize: "1.5rem",
            }}
          >
            Recomendaciones
          </h2>
          <ScrollableRow
            title=""
            items={carouselItems}
            itemWidth={160}
            itemHeight={140}
            gap={12}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
