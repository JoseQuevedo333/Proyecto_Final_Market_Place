import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * CarouselHook.jsx (con paleta por tema)
 * - Colores toman variables CSS definidas en .light y .dark:
 *   --carousel-outer, --carousel-ctrl-bg, --carousel-ctrl-icon,
 *   --carousel-dot, --carousel-dot-active
 */
export default function Carousel({
  images = [
    { src: "https://picsum.photos/1200/400?random=1", alt: "Imagen 1" },
    { src: "https://picsum.photos/1200/400?random=2", alt: "Imagen 2" },
    { src: "https://picsum.photos/1200/400?random=3", alt: "Imagen 3" },
  ],
  autoPlay = true,
  interval = 4000,
  loop = true,
  aspectRatio = "21 / 7",
  borderRadius = 12,
  padding = 24,
}) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const total = images.length;
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );

  const paused = hover || focused || reducedMotion;

  // Auto-play
  useEffect(() => {
    if (!autoPlay || paused || total <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, Math.max(1500, interval));
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, total]);

  // Navegación
  const goTo = (i) => setIndex(((i % total) + total) % total);
  const next = () => (loop || index < total - 1 ? goTo(index + 1) : null);
  const prev = () => (loop || index > 0 ? goTo(index - 1) : null);

  // Teclado
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight": e.preventDefault(); next(); break;
      case "ArrowLeft":  e.preventDefault(); prev(); break;
      case "Home":       e.preventDefault(); goTo(0); break;
      case "End":        e.preventDefault(); goTo(total - 1); break;
      default: break;
    }
  };

  // Gestos
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const dx = touchDeltaX.current;
    const THRESHOLD = 40;
    if (Math.abs(dx) > THRESHOLD) dx < 0 ? next() : prev();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Estilos (solo cambiamos colores a variables)
  const wrapperStyle = {
    backgroundColor: "var(--carousel-outer)",
    padding,
    borderRadius,
  };
  const frameStyle = {
    width: "100%",
    aspectRatio,
    position: "relative",
    backgroundColor: "transparent",
    borderRadius,
    overflow: "hidden",
    outline: "none",
  };
  const slideBase = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    transition: reducedMotion ? "none" : "opacity 500ms ease",
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Carrusel de imágenes principales"
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={frameStyle}
      >
        {/* Slides */}
        {images.map((img, i) => (
          <img
            key={img.src + i}
            src={img.src}
            alt={img.alt ?? `Imagen ${i + 1}`}
            loading="lazy"
            style={{ ...slideBase, opacity: i === index ? 1 : 0 }}
          />
        ))}

        {/* Controles */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              style={controlButtonStyle("left")}
            >
              <span style={chevronStyle("left")} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              style={controlButtonStyle("right")}
            >
              <span style={chevronStyle("right")} aria-hidden="true" />
            </button>
          </>
        )}

        {/* Indicadores */}
        {total > 1 && (
          <div style={indicatorsBarStyle}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === index}
                style={dotStyle(i === index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- utilidades de estilo (con variables del tema) ---------- */
const controlButtonStyle = (side) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: 8,
  zIndex: 2,
  border: "none",
  borderRadius: 999,
  width: 40,
  height: 40,
  background: "var(--carousel-ctrl-bg)",
  color: "var(--carousel-ctrl-icon)",
  display: "grid",
  justifyContent: "center",
  placeItems: "center",
  cursor: "pointer",
  outlineOffset: 2,
  boxShadow: "0 4px 14px rgba(0,0,0,.25)",
});

const chevronStyle = (dir) => ({
  display: "inline-block",
  width: 12,
  height: 12,
  borderTop: "2px solid currentColor",
  borderRight: "2px solid currentColor",
  transform: dir === "left" ? "rotate(-135deg)" : "rotate(45deg)",
});

const indicatorsBarStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 8,
  display: "flex",
  justifyContent: "center",
  gap: 8,
};

const dotStyle = (active) => ({
  width: 8,
  height: 8,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.8)",
  background: active ? "var(--carousel-dot-active)" : "var(--carousel-dot)",
  cursor: "pointer",
});
