// src/Pages/SobreNosotros.jsx
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default function SobreNosotros() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Navbar />

      <main style={{ flex: 1, padding: "2rem 1rem", maxWidth: 1200, margin: "0 auto" }}>
        <h1 className="text-theme mb-4" style={{ textAlign: "center" }}>
          Sobre Nosotros
        </h1>

        <section style={{ marginBottom: 40 }}>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.7, textAlign: "justify" }}>
            Bienvenido a <strong> Avalon Market Place</strong>, una plataforma creada para conectar a 
            personas que buscan productos tecnológicos de calidad con vendedores confiables.  
            Nuestro objetivo es ofrecer una experiencia segura, rápida y transparente para 
            todos nuestros usuarios.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: "#b22222", marginBottom: 10 }}>Nuestra Misión</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, textAlign: "justify" }}>
            Facilitar el acceso a tecnología de última generación a precios justos, 
            creando un espacio donde tanto compradores como vendedores se beneficien 
            de una comunidad digital confiable.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: "#b22222", marginBottom: 10 }}>Nuestra Visión</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, textAlign: "justify" }}>
            Ser la plataforma líder en comercio electrónico de tecnología en Latinoamérica, 
            destacando por la innovación, el servicio al cliente y la responsabilidad digital.
          </p>
        </section>

        <section>
          <h2 style={{ color: "#b22222", marginBottom: 10 }}>Nuestro Equipo</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, textAlign: "justify" }}>
            Detrás de Avalon Market Place hay un equipo apasionado por la tecnología, 
            estar a la vanguardia y la satisfacción del cliente. Trabajamos día a día 
            para mejorar la experiencia de compra y venta online.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
