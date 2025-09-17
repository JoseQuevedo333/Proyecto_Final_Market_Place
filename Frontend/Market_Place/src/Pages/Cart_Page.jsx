import React from "react";
import Cart from "../components/Layout/Cart";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

function CartPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Cart />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default CartPage;
