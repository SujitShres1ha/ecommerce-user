import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/Layout";

function cart() {
  const { cart } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/cart", cart).then((res) => {
      setCartProducts(res.data);
    });
  }, []);
  console.log(cartProducts);
  return (
    <Layout>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Layout>
  );
}

export default cart;
