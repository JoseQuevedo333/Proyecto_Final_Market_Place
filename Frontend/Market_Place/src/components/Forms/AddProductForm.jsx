// AddProductForm.jsx
import React, { useMemo, useState } from "react";
import SearchResultCard from "../UI/SearchResultCard"; // ajusta la ruta si cambia

export default function AddProductForm({ onSubmit }) {
  const [form, setForm] = useState({
    imageUrl:
      "https://m.media-amazon.com/images/I/81jdmPo8pAL._AC_UL480_FMwebp_QL65_.jpg",
    title: "Título del producto",
    rating: 4.5,
    ratingsCount: "100",
    boughtRecently: "Comprado recientemente",
    price: "$0,00",
    listPrice: "",
    unitPriceNote: "",
    optionsNote: "",
    deliveryNote: "",
    extraNote: "",
    moreChoices: "",
    badge: "",
    productLink: "/product/1",
    linkType: "internal", // "internal" | "external"
  });

  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    const v = e?.target?.value ?? e;
    setForm((f) => ({ ...f, [field]: v }));
  };

  const setNumber = (field, clamp) => (e) => {
    let v = e.target.value;
    // Permite vacío mientras escribe
    if (v === "") return setForm((f) => ({ ...f, [field]: "" }));
    let n = Number(v);
    if (Number.isNaN(n)) n = 0;
    if (clamp) {
      const [min, max] = clamp;
      n = Math.max(min, Math.min(max, n));
    }
    setForm((f) => ({ ...f, [field]: n }));
  };

  const validate = useMemo(
    () => () => {
      const errs = {};
      if (!form.title?.trim()) errs.title = "El título es obligatorio";
      if (!form.price?.toString().trim())
        errs.price = "El precio es obligatorio (ej: $12,99)";
      const r = Number(form.rating);
      if (Number.isNaN(r) || r < 0 || r > 5)
        errs.rating = "El rating debe estar entre 0 y 5";
      if (form.linkType === "external" && !form.productLink?.startsWith("http"))
        errs.productLink =
          "Para link externo, use una URL absoluta (https://...)";
      return errs;
    },
    [form]
  );

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Normaliza vacíos a null para props opcionales
    const clean = (s) => (s?.toString().trim() ? s : null);

    const payload = {
      imageUrl: clean(form.imageUrl),
      title: form.title,
      rating: Number(form.rating) || 0,
      ratingsCount: clean(form.ratingsCount),
      boughtRecently: clean(form.boughtRecently),
      price: form.price, // lo dejas formateado como string
      listPrice: clean(form.listPrice),
      unitPriceNote: clean(form.unitPriceNote),
      optionsNote: clean(form.optionsNote),
      deliveryNote: clean(form.deliveryNote),
      extraNote: clean(form.extraNote),
      moreChoices: clean(form.moreChoices),
      badge: clean(form.badge),
      productLink: form.productLink || (form.linkType === "internal" ? "/product/1" : ""),
      linkType: form.linkType,
    };

    onSubmit?.(payload);
  };

  return (
    <div className="row g-4">
      {/* Formulario */}
      <div className="col-12 col-lg-6">
        <form onSubmit={handleSubmit} className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Agregar producto</h5>

            <div className="mb-3">
              <label className="form-label">Título *</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={form.title}
                onChange={set("title")}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen (URL)</label>
              <input
                type="url"
                className="form-control"
                value={form.imageUrl}
                onChange={set("imageUrl")}
                placeholder="https://..."
              />
            </div>

            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">Rating (0–5) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className={`form-control ${errors.rating ? "is-invalid" : ""}`}
                  value={form.rating}
                  onChange={setNumber("rating", [0, 5])}
                />
                {errors.rating && (
                  <div className="invalid-feedback">{errors.rating}</div>
                )}
              </div>
              <div className="col-6">
                <label className="form-label">N° valoraciones</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.ratingsCount}
                  onChange={set("ratingsCount")}
                  placeholder="111.209"
                />
              </div>
            </div>

            <div className="row g-3 mt-0">
              <div className="col-6">
                <label className="form-label">Precio *</label>
                <input
                  type="text"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  value={form.price}
                  onChange={set("price")}
                  placeholder="$12,78"
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="col-6">
                <label className="form-label">Precio lista</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.listPrice}
                  onChange={set("listPrice")}
                  placeholder="$15,99"
                />
              </div>
            </div>

            <div className="row g-3 mt-0">
              <div className="col-6">
                <label className="form-label">Nota precio por unidad</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.unitPriceNote}
                  onChange={set("unitPriceNote")}
                  placeholder="($0,17 / unidad)"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Compras recientes</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.boughtRecently}
                  onChange={set("boughtRecently")}
                  placeholder="Más de 100 mil compras..."
                />
              </div>
            </div>

            <div className="row g-3 mt-0">
              <div className="col-6">
                <label className="form-label">Nota de opciones</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.optionsNote}
                  onChange={set("optionsNote")}
                  placeholder="Otras opciones disponibles"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Entrega</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.deliveryNote}
                  onChange={set("deliveryNote")}
                  placeholder="Entrega mar., 30 de sep. a Chile"
                />
              </div>
            </div>

            <div className="row g-3 mt-0">
              <div className="col-6">
                <label className="form-label">Nota extra</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.extraNote}
                  onChange={set("extraNote")}
                  placeholder="Sin ofertas destacadas disponibles"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Más opciones</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.moreChoices}
                  onChange={set("moreChoices")}
                  placeholder="Más opciones de compra"
                />
              </div>
            </div>

            <div className="row g-3 mt-0">
              <div className="col-6">
                <label className="form-label">Badge</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.badge}
                  onChange={set("badge")}
                  placeholder="Pack 3 · 225 toallitas"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Tipo de enlace</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="linkType"
                      id="lt-int"
                      value="internal"
                      checked={form.linkType === "internal"}
                      onChange={() => setForm((f) => ({ ...f, linkType: "internal" }))}
                    />
                    <label className="form-check-label" htmlFor="lt-int">
                      Interno
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="linkType"
                      id="lt-ext"
                      value="external"
                      checked={form.linkType === "external"}
                      onChange={() => setForm((f) => ({ ...f, linkType: "external" }))}
                    />
                    <label className="form-check-label" htmlFor="lt-ext">
                      Externo
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">
                URL destino {form.linkType === "external" ? "(https://…)" : "(ruta interna)"}
              </label>
              <input
                type="text"
                className={`form-control ${errors.productLink ? "is-invalid" : ""}`}
                value={form.productLink}
                onChange={set("productLink")}
                placeholder={
                  form.linkType === "external"
                    ? "https://tu-sitio.com/producto/123"
                    : "/producto/123"
                }
              />
              {errors.productLink && (
                <div className="invalid-feedback">{errors.productLink}</div>
              )}
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Guardar producto
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setForm((f) => ({ ...f, title: "", price: "", rating: 0 }));
                  setErrors({});
                }}
              >
                Limpiar mínimos
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview con tu SearchResultCard */}
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Previsualización</h5>
            <SearchResultCard
              imageUrl={form.imageUrl}
              title={form.title || "—"}
              rating={Number(form.rating) || 0}
              ratingsCount={form.ratingsCount || null}
              boughtRecently={form.boughtRecently || null}
              price={form.price || "—"}
              listPrice={form.listPrice || null}
              unitPriceNote={form.unitPriceNote || null}
              optionsNote={form.optionsNote || null}
              deliveryNote={form.deliveryNote || null}
              extraNote={form.extraNote || null}
              moreChoices={form.moreChoices || null}
              badge={form.badge || null}
              productLink={form.productLink || "/product/1"}
              linkType={form.linkType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
