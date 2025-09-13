import React from "react";
import { Link } from "react-router-dom";

/**
 * Tarjeta informativa/oferta (imagen y link de texto clickeables)
 * FIX: <img> simple como en SearchResultCard, sin onError ni referrerPolicy.
 */
export default function InfoOfferCard({
  title = "FREE Shipping to Chile",
  // MISMA URL que ya te funciona en SearchResultCard
  imageUrl = "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/1460058_2528408_us_gw_pc_single_category_card_1x_379x304_us-en._SY304_CB794776999_.jpg",
  linkText = "Learn more",
  linkTo = "/ofertas/envio",
  linkType = "internal", // "internal" | "external"
}) {
  const Click = ({ children, className, ariaLabel }) =>
    linkType === "external" ? (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {children}
      </a>
    ) : (
      <Link
        to={linkTo}
        className={className}
        aria-label={ariaLabel}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {children}
      </Link>
    );

  return (
    <div className="card shadow-sm text-body" style={{ borderRadius: 12 }}>
      <div className="card-body">
        {/* Título (no clickeable) */}
        <h5 className="mb-3" style={{ fontWeight: 700 }}>{title}</h5>

        {/* IMAGEN CLICKEABLE — EXACTO como en SearchResultCard */}
        <Click ariaLabel={`Ir a ${title}`} className="d-block">
          <img
            src={imageUrl}
            alt={title}
            className="img-fluid"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              borderRadius: 8,
              display: "block",
            }}
          />
        </Click>

        {/* Enlace inferior CLICKEABLE */}
        <div className="mt-2">
          <Click ariaLabel={`Abrir: ${linkText}`}>
            <span className="fw-semibold" style={{ color: "#0d6efd" }}>
              {linkText}
            </span>
          </Click>
        </div>
      </div>
    </div>
  );
}
