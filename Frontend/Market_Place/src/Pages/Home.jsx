// src/Pages/Home.jsx
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Carousel from "../components/Layout/Carousel";
import InfoOfferCard from "../components/UI/InfoOfferCard";
import ScrollableRow from "../components/UI/ScrollableRow";

export default function Home() {
  // Productos simulados (para el carrusel de recomendaciones)
  const carouselItems = Array.from({ length: 12 }).map((_, i) => ({
    id: `it-${i}`,
    title: `Producto ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/item${i}/200/150`,
  }));

  // Slides del carrusel principal
  const slides = [
    { src: "https://picsum.photos/1200/400?random=1", alt: "Slide 1" },
    { src: "https://picsum.photos/1200/400?random=2", alt: "Slide 2" },
    { src: "https://picsum.photos/1200/400?random=3", alt: "Slide 3" },
  ];

  // ✅ Solo las 4 categorías principales
  const categorias = [
    {
      titulo: "Cables",
      imageUrl: "https://cdn.pixabay.com/photo/2019/04/30/11/46/cable-4168398_1280.jpg",
      link: "/categorias/cables",
    },
    {
      titulo: "Computadores",
      imageUrl: "https://cdn.pixabay.com/photo/2022/07/20/19/11/laptop-7334774_1280.jpg",
      link: "/categorias/computadores",
    },
    {
      titulo: "Teléfonos",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/15/15874.png",
      link: "/categorias/telefonos",
    },
    {
      titulo: "Videojuegos",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/19/00/10/gamepad-1837422_1280.png",
      link: "/categorias/videojuegos",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#0c0c0c",
        color: "white",
      }}
    >
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🖼 Carrusel principal */}
      <main style={{ flex: 1 }}>
        <Carousel images={slides} interval={4000} autoPlay loop />

        {/* ⚡ Sección de Categorías */}
        <section
          className="container"
          style={{
            marginTop: 32,
            paddingInline: 16,
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              textAlign: "center",
              color: "#FFD700",
              marginBottom: 24,
            }}
          >
            Explora Nuestras Categorías
          </h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              justifyItems: "center",
            }}
          >
            {categorias.map((cat, i) => (
              <InfoOfferCard
                key={i}
                title={cat.titulo}
                imageUrl={cat.imageUrl}
                linkTo={cat.link}
                linkText="Ver productos"
              />
            ))}
          </div>
        </section>

        {/* 🎯 Recomendaciones */}
        <section
          className="container py-5"
          style={{
            marginTop: 48,
            backgroundColor: "#FFD700",
            padding: "40px 0",
          }}
        >
          <h2
            style={{
              color: "#000",
              textAlign: "center",
              marginBottom: 16,
              fontSize: "1.8rem",
              fontWeight: "bold",
            }}
          >
            Recomendaciones para ti
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

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
}
