import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

function cart() {
  const {cart} = useContext(CartContext)
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    axios.post('/api/cart',cart).then((res) => {setCartProducts(res.data)})
  },[])
  console.log(cartProducts)
  return (
    <main className="p-6 container mx-auto space-y-6">
    <Header/>
    <table>
      <thead>
        <tr>
          <th>My Cart</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
    </main>
    );
}

export default cart;
