// ScrollableRow.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Carrusel por páginas:
 * - Calcula cuántas tarjetas caben en el ancho visible (visibleCount)
 * - Muestra SOLO esa "página" de items (sin scroll horizontal)
 * - Flechas avanzan/retroceden de página
 * - Sin transform, sin overflow, sin barras horizontales
 */
export default function ScrollableRow({
  title = "International top sellers in Home",
  items = Array.from({ length: 16 }).map((_, i) => ({
    id: `it-${i}`,
    title: `Producto ${i + 1}`,
    imageUrl:
      "https://m.media-amazon.com/images/I/81jdmPo8pAL._AC_UL480_FMwebp_QL65_.jpg",
  })),
  itemWidth = 180,
  itemHeight = 150,
  gap = 16,
}) {
  const hostRef = useRef(null);
  const [hostWidth, setHostWidth] = useState(0);
  const [page, setPage] = useState(0);

  // Observa el ancho del contenedor para recalcular la capacidad visible
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const update = () => setHostWidth(el.clientWidth || 0);
    update();

    // ResizeObserver para cambios de tamaño reales del contenedor
    const ro = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    ro?.observe(el);

    // Fallback por si el navegador no soporta ResizeObserver
    window.addEventListener("resize", update, { passive: true });

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // ¿Cuántas tarjetas caben por página?
  const per = itemWidth + gap;
  const visibleCount = useMemo(() => {
    if (hostWidth <= 0) return 1;
    // margen de seguridad para paddings internos
    const inner = Math.max(0, hostWidth - 32);
    const n = Math.max(1, Math.floor((inner + gap) / per));
    return n;
  }, [hostWidth, per, gap]);

  // Total de páginas
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / visibleCount));
  }, [items.length, visibleCount]);

  // Asegura que la página actual exista si cambia el tamaño
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  // Slice de la página actual
  const start = page * visibleCount;
  const end = start + visibleCount;
  const pageItems = items.slice(start, end);

  const atStart = page === 0;
  const atEnd = page >= totalPages - 1;

  const go = (dir) => {
    setPage((p) => {
      const next = p + dir;
      if (next < 0) return 0;
      if (next > totalPages - 1) return totalPages - 1;
      return next;
    });
  };

  return (
    <div
      ref={hostRef}
      style={{
        maxWidth: "100%",
        // Blindaje para no afectar el layout externo
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        className="card shadow-sm"
        style={{
          position: "relative",
          borderRadius: 12,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <div className="card-body" style={{ paddingBottom: 12 }}>
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>{title}</h5>

          {/* PISTA: renderiza solo los items de la página actual */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap,
              padding: "4px 8px",
              // Sin scroll, sin transform, altura fija visible
              overflow: "hidden",
              minHeight: itemHeight + 20,
              boxSizing: "border-box",
            }}
          >
            {pageItems.map((it) => (
              <div
                key={it.id}
                title={it.title}
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f3f3f3",
                  borderRadius: 8,
                  border: "1px solid #eee",
                  overflow: "hidden",
                }}
              >
                <img
                  src={it.imageUrl}
                  alt={it.title}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ))}

            {/* Rellena con placeholders invisibles para que la fila quede estable */}
            {pageItems.length < visibleCount &&
              Array.from({ length: visibleCount - pageItems.length }).map(
                (_, i) => (
                  <div
                    key={`ph-${i}`}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                      flex: "0 0 auto",
                      visibility: "hidden",
                    }}
                  />
                )
              )}
          </div>
        </div>

        {/* Flechas (no empujan layout) */}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Anterior"
          style={arrow("left", atStart)}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Siguiente"
          style={arrow("right", atEnd)}
        >
          ›
        </button>

        {/* Indicadores simples de página (opcional) */}
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
          }}
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === page ? "#333" : "#cfcfcf",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function arrow(side, disabled) {
  return {
    position: "absolute",
    [side]: 8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5,
    border: "none",
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: disabled ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.7)",
    color: "#fff",
    cursor: disabled ? "default" : "pointer",
    display: "grid",
    placeItems: "center",
    lineHeight: 1,
    fontSize: 22,
    boxShadow: "0 2px 8px rgba(0,0,0,.25)",
  };
}
