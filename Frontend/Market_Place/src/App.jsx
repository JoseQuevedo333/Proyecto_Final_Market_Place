import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";
import Cart_Page from "./Pages/Cart_Page";
import AdminProducts from "./Pages/Admin_Products";
import ComponentesFidel from "./Pages/ComponentesFidel";
import ResultsFound from "./Pages/ResultsFound";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";
import AddProductForm from "./components/Forms/AddProductForm";
import Settings from "./Pages/Settings";
import Sobre_Nosotros from "./Pages/Sobre_Nosotros";

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
      <Route path="/componentesfidel" element={<ComponentesFidel />} />
      <Route path="/categoria/cables" element={<ResultsFound />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Sobre_Nosotros" element={<Sobre_Nosotros />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/add-product"
        element={
          <AddProductForm
            onSubmit={(data) => {
              console.log("Producto guardado:", data); // Aquí se podria manejar el envío del formulario, como enviarlo a una API
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
