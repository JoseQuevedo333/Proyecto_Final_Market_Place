import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/Notfound";
import ComponentesFidel from "./Pages/ComponentesFidel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/componentesfidel" element={<ComponentesFidel />} />
    </Routes>
  );
}

export default App;
