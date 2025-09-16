// src/components/Layout/Carousel.jsx
export default function Carousel() {
  return (
    <div
      style={{
        backgroundColor: "red",   // 👈 fondo rojo alrededor
        paddingTop: "1.5rem",     // 👈 espacio arriba
        paddingBottom: "1.5rem",  // 👈 espacio abajo
        paddingLeft: "1.5rem",    // 👈 espacio a la izquierda
        paddingRight: "1.5rem",   // 👈 espacio a la derecha
      }}
    >
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{
          width: "100%",
          aspectRatio: "21 / 7", // ajusta a tu preferencia (16/9, 3/1, etc.)
          position: "relative",
          backgroundColor: "red", // 👈 fondo rojo también en el carrusel
          borderRadius: "12px",   // opcional: esquinas redondeadas para diferenciar
          overflow: "hidden",
        }}
      >
        <div className="carousel-inner" style={{ height: "100%" }}>
          <div className="carousel-item active" style={{ height: "100%" }}>
            <img
              src="https://picsum.photos/1200/400?random=1"
              alt="Imagen 1"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>

          <div className="carousel-item" style={{ height: "100%" }}>
            <img
              src="https://picsum.photos/1200/400?random=2"
              alt="Imagen 2"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>

          <div className="carousel-item" style={{ height: "100%" }}>
            <img
              src="https://picsum.photos/1200/400?random=3"
              alt="Imagen 3"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
          style={{ zIndex: 2 }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
          style={{ zIndex: 2 }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
}
