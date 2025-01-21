import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});
export function CartContextProvider({ children }) {
  const ls = typeof window === "undefined" ? null : window.localStorage;
  const [cart, setCart] = useState([]);
  const addToCart = (productId, value) => {
    const parsedValue = parseInt(value);
    setCart((prev) => {
      const existingProduct = prev.find((product) => productId === product.id);
      if (existingProduct) {
        return prev?.map((product) =>
          product.id === productId
            ? {
                ...product,
                quantity: parsedValue ? parsedValue : product.quantity + 1,
              }
            : product
        );
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (productId) => {
    setCart((prev) => {
      return prev.filter((product) => product.id !== productId);
    });
  };

  useEffect(() => {
    if (cart.length > 0) {
      ls.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, removeFromCart]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCart(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
