import React from "react";
import SearchResultCard from "../components/UI/SearchResultCard";
import InfoOfferCard from "../components/UI/InfoOfferCard";
import ScrollableRow from "../components/UI/ScrollableRow";
import AddProductForm from "../components/Forms/AddProductForm";

export default function ComponentesFidel() {
// Lista de imágenes que se alternan (corregí un enlace que venía pegado a otro)
const IMG_POOL = [
  "https://m.media-amazon.com/images/I/71CXIa3POML._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/51drH2GQkZL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/71Yk6yF+UsL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/714rrcSCYgL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/51fSHzJV5dL._AC_SY200_.jpg",
];

const carouselItems = Array.from({ length: 18 }).map((_, i) => ({
  id: `prod-${i}`,
  title: `Producto ${i + 1}`,
  imageUrl: IMG_POOL[i % IMG_POOL.length],  // alterna cíclicamente
  to: `/producto/${i + 1}`,
}));


  return (
    <div style={{ padding: 16 }}>
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
          {Array.from({ length: 8 }).map((_, i) => (
            <SearchResultCard key={`p-${i}`} />
          ))}
        </div>
      </section>

      <hr />

      <section style={{ marginTop: 32 }}>
        <h2 className="text-theme mb-3">Explora categorías / Ofertas</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <InfoOfferCard key={`o-${i}`} />
          ))}
        </div>
      </section>

      {/* Carrusel */}
      <section style={{ marginTop: 32, maxWidth: "100%", overflow: "hidden" }}>
        <ScrollableRow
          title="International top sellers in Home"
          items={carouselItems}
          itemWidth={180}
          itemHeight={150}
          gap={16}
        />
      </section>

      <section style={{ marginTop: 32 }}>
        <AddProductForm
          onSubmit={(data) => {
            console.log("Producto a guardar:", data);
          }}
        />

      </section>


    </div>
  );
}
