import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";
import Cart_Page from "./Pages/Cart_Page";
import AdminProducts from "./Pages/Admin_Products";
import ResultsFound from "./Pages/ResultsFound";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/Notfound";
import Settings from "./Pages/Settings";
import Sobre_Nosotros from "./Pages/Sobre_Nosotros";
import CategoriaPage from "./components/Layout/CategoriaPages";
import Cables from "./Pages/Categorias/Cables";
import Computadores from "./Pages/Categorias/Computadores";
import Telefonos from "./Pages/Categorias/Telefonos";
import Videojuegos from "./Pages/Categorias/Videojuegos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart_Page />} />
      <Route path="/admin_products" element={<AdminProducts />} />
      <Route path="/productdetails" element={<ProductDetails />} />
      <Route path="/categoria/cables" element={<ResultsFound />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Sobre_Nosotros" element={<Sobre_Nosotros />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/categorias/cables" element={<Cables />} />
      <Route path="/categorias/computadores" element={<Computadores />} />
      <Route path="/categorias/telefonos" element={<Telefonos />} />
      <Route path="/categorias/videojuegos" element={<Videojuegos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
