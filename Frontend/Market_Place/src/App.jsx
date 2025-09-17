import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/Notfound";
import ComponentesFidel from "./Pages/ComponentesFidel";
import ResultsFound from "./Pages/ResultsFound";
import Profile from "./Pages/Profile";
import AddProductForm from "./components/Forms/AddProductForm";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/componentesfidel" element={<ComponentesFidel />} />
      <Route path="/categoria/cables" element={<ResultsFound />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-product" element={<AddProductForm onSubmit={(data) => {
    console.log("Producto guardado:", data); // Aquí se podria manejar el envío del formulario, como enviarlo a una API
}} />} />
    </Routes>
  );
}

export default App;
