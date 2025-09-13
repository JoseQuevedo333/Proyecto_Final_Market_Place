import React from "react";
import { Link } from "react-router-dom";

/**
 * Tarjeta de resultado de búsqueda (estilo Amazon), en español.
 * - Imagen y título clickeables
 * - Badge con colores propios (texto oscuro sobre fondo claro)
 */
export default function SearchResultCard({
  imageUrl = "https://m.media-amazon.com/images/I/81jdmPo8pAL._AC_UL480_FMwebp_QL65_.jpg",
  title = "Toallitas desinfectantes Clorox, pack de 3, 75 unidades c/u",
  rating = 4.6,
  ratingsCount = "111.209",
  boughtRecently = "Más de 100 mil compras el último mes",
  price = "$12,78",
  listPrice = null,
  unitPriceNote = null,
  optionsNote = null,
  deliveryNote = "Entrega mar., 30 de sep. a Chile",
  extraNote = "Sin ofertas destacadas disponibles",
  moreChoices = null,
  badge = "Pack 3 · 225 toallitas",

  // Navegación
  productLink = "/product/1",
  linkType = "internal", // "internal" | "external"
}) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  const Clickable = ({ children, className }) =>
    linkType === "external" ? (
      <a
        href={productLink}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {children}
      </a>
    ) : (
      <Link
        to={productLink}
        className={className}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {children}
      </Link>
    );

  return (
    <div className="card h-100 shadow-sm text-body" style={{ borderRadius: 12 }}>
      {/* Imagen clickeable */}
      <Clickable
        className="p-3 d-flex align-items-center justify-content-center"
        aria-label={`Ir a ${title}`}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ maxHeight: 200, objectFit: "contain" }}
          className="img-fluid"
        />
      </Clickable>

      <div className="card-body pt-0">
        {/* Badge con estilos propios (texto oscuro + fondo claro) */}
        {badge && (
          <div className="mb-2">
            <span
              className="badge"
              style={{
                backgroundColor: "#fff3cd",   // amarillo claro
                color: "#5c3d00",              // texto oscuro (alta legibilidad)
                border: "1px solid #ffe69c",
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: 8,
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Título clickeable (máx 2 líneas) */}
        <Clickable aria-label={`Abrir ${title}`}>
          <h6
            className="card-title mb-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              margin: 0,
            }}
          >
            {title}
          </h6>
        </Clickable>

        {/* Rating */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <div aria-label={`Calificación ${rating} de 5`}>
            {"★".repeat(fullStars)}
            {halfStar ? "½" : ""}
            {"☆".repeat(5 - fullStars - (halfStar ? 1 : 0))}
          </div>
          <small className="text-muted">{ratingsCount}</small>
        </div>

        {boughtRecently && (
          <small className="text-muted d-block mb-2">{boughtRecently}</small>
        )}

        {/* Precio */}
        <div className="mb-2">
          <div className="d-flex align-items-baseline gap-2">
            <span className="fs-4 fw-semibold">{price}</span>
            {unitPriceNote && <small className="text-muted">{unitPriceNote}</small>}
            {listPrice && (
              <small className="text-decoration-line-through text-muted">
                Precio lista: {listPrice}
              </small>
            )}
          </div>
        </div>

        {/* Info adicional */}
        {optionsNote && (
          <div className="mb-1">
            <small className="text-muted">{optionsNote}</small>
          </div>
        )}
        {deliveryNote && (
          <div className="mb-1">
            <small className="text-muted">{deliveryNote}</small>
          </div>
        )}
        {extraNote && (
          <div className="mb-1">
            <small className="text-muted">{extraNote}</small>
          </div>
        )}
        {moreChoices && (
          <div className="mb-2">
            <small className="text-primary">{moreChoices}</small>
          </div>
        )}

        {/* Botón (lleva al mismo destino del título/imagen) */}
        <Clickable>
          <button className="btn btn-outline-primary w-100">Ver detalles</button>
        </Clickable>
      </div>
    </div>
  );
}
