// src/components/UI/ScrollableRow.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Carrusel por páginas:
 * - Calcula cuántas tarjetas caben en el ancho visible (visibleCount)
 * - Muestra SOLO esa "página" de items (sin scroll horizontal)
 * - Flechas avanzan/retroceden de página
 * - Sin transform, sin overflow, sin barras horizontales
 * - Soporta teclas ← → y focus accesible
 */
export default function ScrollableRow({
  title = "International top sellers in Home",
  items = Array.from({ length: 16 }).map((_, i) => ({
    id: `it-${i}`,
    title: `Producto ${i + 1}`,
    imageUrl:
      "https://m.media-amazon.com/images/I/81jdmPo8pAL._AC_UL480_FMwebp_QL65_.jpg",
  })),
  itemWidth = 140,
  itemHeight = 150,
  gap = 16,
  // Opcional: personalizar el color de las flechas (por defecto mismo rojo del navbar)
  arrowColor = "red",
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
      tabIndex={0} // permite foco para usar teclas
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" && !atStart) go(-1);
        if (e.key === "ArrowRight" && !atEnd) go(1);
      }}
      style={{
        maxWidth: "100%",
        overflow: "hidden", // Blindaje para no afectar el layout externo
        isolation: "isolate",
        outline: "none",
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

          {/* Renderiza solo los items de la página actual */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap,
              padding: "4px 8px",
              overflow: "hidden", // sin scroll, sin transform
              minHeight: itemHeight + 20,
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",              
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
                  borderRadius: 54,
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
                    maxHeight: "90%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ))}

            {/* Relleno invisible para que la fila quede estable */}
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
        <ArrowButton
          side="left"
          disabled={atStart}
          onClick={() => go(-1)}
          ariaLabel="Anterior"
          color={arrowColor}
        />
        <ArrowButton
          side="right"
          disabled={atEnd}
          onClick={() => go(1)}
          ariaLabel="Siguiente"
          color={arrowColor}
        />

        {/* Indicadores de página */}
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
              aria-hidden="true"
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

/* ---------- Flechas ---------- */

function ArrowButton({ side = "left", disabled, onClick, ariaLabel, color = "red" }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={arrowStyle(side, disabled, color)}
      onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ transform: isLeft ? "none" : "scaleX(-1)" }}
      >
        <path
          d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

const ARROW_SIZE = 80; // diámetro del botón (px)
const ARROW_FG = "#fff";

function arrowStyle(side, disabled, color) {
  return {
    position: "absolute",
    [side]: 10,
    top: "55%",
    transform: "translateY(-50%)",
    zIndex: 5,
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    borderRadius: "50%",
    border: "none",
    background: disabled ? rgba(color, 0.35) : color,
    color: ARROW_FG,
    cursor: disabled ? "default" : "pointer",
    display: "grid",
    placeItems: "center",
    boxShadow: disabled
      ? "0 2px 6px rgba(0,0,0,.15)"
      : "0 4px 14px rgba(0,0,0,.25)",
    transition: "filter .15s ease, transform .15s ease",
  };
}

/* Util para generar rgba desde hex o palabra clave */
function rgba(baseColor, alpha) {
  // Soporta "red" o hex #rrggbb / #rgb
  if (baseColor === "red") return `rgba(255,0,0,${alpha})`;
  if (baseColor.startsWith("#")) {
    const c = hexToRgb(baseColor);
    if (!c) return baseColor;
    const { r, g, b } = c;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  // fallback: color tal cual
  return baseColor;
}

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((x) => x + x).join("");
  }
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
