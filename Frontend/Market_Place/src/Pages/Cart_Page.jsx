import React from "react";
import Cart from "../components/Layout/Cart";
import AppNavbar from "../components/Layout/AppNavbar";
import AppFooter from "../components/Layout/AppFooter";

function CartPage() {
  return (
    <>
      <AppNavbar />
      <Cart />
      <AppFooter />
    </>
  );
}

export default CartPage;
