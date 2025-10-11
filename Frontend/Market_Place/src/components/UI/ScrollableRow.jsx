import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ScrollableRow (con hooks, scroll nativo + drag)
 * MISMA PALETA QUE EL CARRUSEL:
 *   --carousel-outer        (fondo contenedor)
 *   --carousel-ctrl-bg      (fondo flechas / bordes)
 *   --carousel-ctrl-icon    (texto / iconos)
 *   --carousel-dot          (no se usa aquí, pero queda disponible)
 *   --carousel-dot-active   (no se usa aquí, pero queda disponible)
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
  arrowColor = "red", // se mantiene por compatibilidad, pero se ignora (usamos variables del carrusel)
}) {
  const hostRef = useRef(null);
  const scrollerRef = useRef(null);
  const [hostWidth, setHostWidth] = useState(0);
  const [page, setPage] = useState(0);

  // ---- Observa el ancho del contenedor para saber cuántos caben ----
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const update = () => setHostWidth(el.clientWidth || 0);
    update();

    const ro = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    ro?.observe(el);

    window.addEventListener("resize", update, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const per = itemWidth + gap;
  const visibleCount = useMemo(() => {
    if (hostWidth <= 0) return 1;
    const inner = Math.max(0, hostWidth - 32); // margen por paddings internos
    const n = Math.max(1, Math.floor((inner + gap) / per));
    return n;
  }, [hostWidth, per, gap]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / visibleCount));
  }, [items.length, visibleCount]);

  // ---- Sincroniza página cuando se hace scroll manual (rueda, drag, etc.) ----
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const current = scroller.scrollLeft;
        const pg = Math.round(current / (visibleCount * per));
        setPage((p) => (p === pg ? p : Math.max(0, Math.min(pg, totalPages - 1))));
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [visibleCount, per, totalPages]);

  // ---- Función para hacer “paging” por cantidad visible ----
  const scrollToPage = (pg) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(pg, totalPages - 1));
    const targetLeft = clamped * visibleCount * per;
    scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
    setPage(clamped);
  };

  const go = (dir) => scrollToPage(page + dir);

  const atStart = page === 0;
  const atEnd = page >= totalPages - 1;

  // ---- Navegación por teclado en todo el host (card) ----
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft" && !atStart) {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight" && !atEnd) {
      e.preventDefault();
      go(1);
    }
  };

  // ---- Drag con mouse (click + mover) sobre el scroller ----
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const onPointerDown = (e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startScrollRef.current = scroller.scrollLeft;
    scroller.setPointerCapture?.(e.pointerId);
    // Evita seleccionar texto/imágenes durante drag
    scroller.style.cursor = "grabbing";
    scroller.style.userSelect = "none";
  };

  const onPointerMove = (e) => {
    const scroller = scrollerRef.current;
    if (!scroller || !isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    scroller.scrollLeft = startScrollRef.current - dx;
  };

  const endDrag = (e) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    isDraggingRef.current = false;
    scroller.releasePointerCapture?.(e.pointerId);
    scroller.style.cursor = "";
    scroller.style.userSelect = "";
  };

  return (
    <div
      ref={hostRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{
        maxWidth: "100%",
        overflow: "hidden",
        isolation: "isolate",
        outline: "none",
      }}
    >
      <div
        className="card shadow-sm"
        style={{
          position: "relative",
          borderRadius: 12,
          background: "var(--carousel-outer)", // MISMO fondo que el carrusel
          overflow: "hidden",
        }}
      >
        <div className="card-body" style={{ paddingBottom: 12 }}>
          <h5
            style={{
              fontWeight: 700,
              marginBottom: 12,
              color: "var(--carousel-title)", // 👈 nueva variable solo para títulos
            }}
          >
            {title}
          </h5>


          {/* SCROLLER: barra inferior visible + drag + snap */}
          <div
            ref={scrollerRef}
            style={{
              display: "flex",
              gap,
              padding: "4px 8px 12px",
              boxSizing: "border-box",
              overflowX: "auto", // 👈 habilita scroll horizontal
              overflowY: "hidden",
              scrollbarGutter: "stable both-edges",
              // Scroll snap para que “encajen” las tarjetas (opcional)
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: "grab",
              scrollbarWidth: "thin", // 👈 más delgada en Firefox
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={(e) => {
              if (isDraggingRef.current) endDrag(e);
            }}
          >
            {items.map((it) => (
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
                  background: "var(--surface-1)", // usa superficie del tema para el item
                  borderRadius: 54,
                  border: "1px solid var(--carousel-ctrl-bg)", // MISMO borde que control del carrusel
                  overflow: "hidden",
                  // cada tarjeta se alinea al inicio al hacer snap
                  scrollSnapAlign: "start",
                }}
              >
                <img
                  src={it.imageUrl}
                  alt={it.title}
                  loading="lazy"
                  draggable={false} // evita arrastrar la imagen en vez del scroller
                  style={{
                    maxWidth: "100%",
                    maxHeight: "90%",
                    objectFit: "contain",
                    display: "block",
                    pointerEvents: "none", // mejora la sensación de “drag”
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flechas superpuestas (no empujan layout) */}
        <ArrowButton
          side="left"
          disabled={atStart}
          onClick={() => go(-1)}
          ariaLabel="Anterior"
        />
        <ArrowButton
          side="right"
          disabled={atEnd}
          onClick={() => go(1)}
          ariaLabel="Siguiente"
        />
      </div>
    </div>
  );
}

/* ---------- Flechas ---------- */

function ArrowButton({ side = "left", disabled, onClick, ariaLabel }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={arrowStyle(side, disabled)}
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

function arrowStyle(side, disabled) {
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
    background: "var(--carousel-ctrl-bg)",     // MISMO fondo que el control del carrusel
    color: "var(--carousel-ctrl-icon)",        // MISMO color de icono
    opacity: disabled ? 0.35 : 1,              // estado deshabilitado (igual que hicimos antes)
    cursor: disabled ? "default" : "pointer",
    display: "grid",
    placeItems: "center",
    boxShadow: disabled
      ? "0 2px 6px rgba(0,0,0,.15)"
      : "0 4px 14px rgba(0,0,0,.25)",
    transition: "filter .15s ease, transform .15s ease",
  };
}
