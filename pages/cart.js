import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function cart() {
  const { cart: cartProducts, addToCart } = useContext(CartContext);
  const [products, setProdcuts] = useState([]);
  console.log(cartProducts);
  console.log(products);

  useEffect(() => {
    cartProducts.length &&
      axios
        .post("/api/cart", {
          ids: [...cartProducts.map((cartProduct) => cartProduct.id)],
        })
        .then((res) => {
          setProdcuts(res.data);
        });
  }, [cartProducts]);

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col gap-4 w-full">
        <div className="lg:w-2/3 px-4 w-full">
          <Table>
            <TableCaption>
              {!products.length ? "No items in the cart" : ""}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 &&
                products.map((product) => {
                  return (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium text-base text-center space-y-1 flex flex-col items-center">
                        <img
                          src={product.images[0]}
                          className="object-contain w-28 h-28"
                        />
                        <p>{product.name}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="number"
                          defaultValue={
                            cartProducts.find(
                              (cartProduct) => cartProduct.id == product._id
                            ).quantity
                          }
                          className="text-center"
                          onChange={(e) =>
                            addToCart(product._id, e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        $
                        {product.price *
                          cartProducts.find(
                            (cartProduct) => cartProduct.id == product._id
                          ).quantity}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="text-center font-bold text-lg">Total</TableCell>
                <TableCell className="text-right font-bold text-lg">
                  $
                  {cartProducts.length > 0 &&
                    products.length > 0 &&
                    cartProducts?.reduce(
                      (acc, cartProduct) =>
                        acc +
                        cartProduct.quantity *
                          products?.find(
                            (product) => cartProduct.id == product._id
                          ).price,
                      0
                    )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <form className="lg:w-1/3 w-full border border-gray-200 rounded-lg lg:p-5 p-10 space-y-4 h-fit">
          <h1 className="text-center font-bold text-xl pb-1">
            Order Information
          </h1>
          <div className="space-y-1">
            <Label htmlFor="name">Full Name (First and Last Name)</Label>
            <Input type="text" placeholder="" id="name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="" id="email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address1">Address Line 1</Label>
            <Input
              type="text"
              placeholder="Street address, P.O. box, company name, c/o"
              id="address1"
              className=""
            />
            <Input
              type="text"
              placeholder="Apartment, suite, unit, building, floor"
              id="address2"
            />
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-[55%] space-y-1">
              <Label htmlFor="city">City</Label>
              <Input type="text" id="city" />
            </div>
            <div className="w-[45%] space-y-1">
              <Label htmlFor="state">State</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AL">Alabama</SelectItem>
                  <SelectItem value="AK">Alaska</SelectItem>
                  <SelectItem value="AZ">Arizona</SelectItem>
                  <SelectItem value="AR">Arkansas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="CO">Colorado</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                  <SelectItem value="DE">Delaware</SelectItem>
                  <SelectItem value="DC">District Of Columbia</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="GA">Georgia</SelectItem>
                  <SelectItem value="HI">Hawaii</SelectItem>
                  <SelectItem value="ID">Idaho</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="IN">Indiana</SelectItem>
                  <SelectItem value="IA">Iowa</SelectItem>
                  <SelectItem value="KS">Kansas</SelectItem>
                  <SelectItem value="KY">Kentucky</SelectItem>
                  <SelectItem value="LA">Louisiana</SelectItem>
                  <SelectItem value="ME">Maine</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="MI">Michigan</SelectItem>
                  <SelectItem value="MN">Minnesota</SelectItem>
                  <SelectItem value="MS">Mississippi</SelectItem>
                  <SelectItem value="MO">Missouri</SelectItem>
                  <SelectItem value="MT">Montana</SelectItem>
                  <SelectItem value="NE">Nebraska</SelectItem>
                  <SelectItem value="NV">Nevada</SelectItem>
                  <SelectItem value="NH">New Hampshire</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="NM">New Mexico</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NC">North Carolina</SelectItem>
                  <SelectItem value="ND">North Dakota</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                  <SelectItem value="OK">Oklahoma</SelectItem>
                  <SelectItem value="OR">Oregon</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                  <SelectItem value="RI">Rhode Island</SelectItem>
                  <SelectItem value="SC">South Carolina</SelectItem>
                  <SelectItem value="SD">South Dakota</SelectItem>
                  <SelectItem value="TN">Tennessee</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="UT">Utah</SelectItem>
                  <SelectItem value="VT">Vermont</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="WA">Washington</SelectItem>
                  <SelectItem value="WV">West Virginia</SelectItem>
                  <SelectItem value="WI">Wisconsin</SelectItem>
                  <SelectItem value="WY">Wyoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="pt-1">
            <Button className="w-full">Continue to payment</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default cart;
