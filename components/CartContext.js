import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});
export function CartContextProvider({ children }) {
  const ls = typeof window === "undefined" ? null : window.localStorage;
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (ls) {
      const storedCart = ls.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      ls?.setItem("cart", JSON.stringify(cart));
    } else {
      ls?.removeItem("cart");
    }
  }, [cart]);
  
  
 

  const checkInventory = async (productId) => {
    try {
      const response = await axios.get(`api/products/?id=${productId}`);
      if (response?.data){
        return response?.data?.stock
      }
    } catch (error) {
      console.error('Error retrieving the stock')
    }
    
    
  }
  const addToCart = async (productId, value) => {
    const parsedValue = parseInt(value)
    console.log(parsedValue)
    const stock = await checkInventory(productId) //check stock from db
    let demand;
    if (!parsedValue){
      demand = cart?.find(product => product.id === productId)?.quantity || 0
    }
    // const demand = cart?.find(product => product.id === productId)?.quantity || 0 
   
    (stock >= parsedValue || stock > demand) ? setCart((prev) => { //check if product stock is greater than the demand
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
    }) : alert('Item out of stock');
  };
  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updatedCart = prev.filter((product) => product.id !== productId);
      if (ls && updatedCart.length === 0){
        ls.removeItem('cart')
      }
      return updatedCart
    });

  };

  



  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
