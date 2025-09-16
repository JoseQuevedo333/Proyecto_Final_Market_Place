import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";
import Cart_Page from "./Pages/Cart_Page";
import AdminProducts from "./Pages/Admin_Products";
import ComponentesFidel from "./Pages/ComponentesFidel";

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
    </Routes>
  );
}

export default App;
