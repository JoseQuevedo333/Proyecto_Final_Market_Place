import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/Notfound";
import ComponentesFidel from "./Pages/ComponentesFidel";
import ResultsFound from "./Pages/ResultsFound";

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
    </Routes>
  );
}

export default App;
