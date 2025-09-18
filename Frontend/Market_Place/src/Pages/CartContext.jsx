/* import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 🔹 Recalcular el total cada vez que cambie el carrito
  const updateTotal = (updatedCart) => {
    const newTotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  // 🔹 Agregar producto
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  // 🔹 Aumentar cantidad
  const increase = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  // 🔹 Disminuir cantidad
  const decrease = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  // 🔹 Eliminar producto
  const remove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, increase, decrease, remove }}
    >
      {children}
    </CartContext.Provider>
  );
}
 */