import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import CategoriaPage from "../../components/Layout/CategoriaPages";

export default function Telefonos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          "https://backendmarketplace-h8yv.onrender.com/productos?category=Phones"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching phones:", err);
      }
    };

    fetchCategoryProducts();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0c0c0c",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <CategoriaPage
          titulo="Teléfonos"
          descripcion="Explora nuestra selección de smartphones y accesorios."
          categoria="Phones"
          productos={products} 
        />
      </main>
      <Footer />
    </div>
  );
}