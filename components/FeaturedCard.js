import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "./CartContext";

function FeaturedCard({ product }) {
  const { addToCart } = useContext(CartContext);
  console.log(product);
  return (
    <Card className="flex flex-col lg:flex-row justify-between pt-2">
      <div className="flex lg:items-center w-full lg:w-1/3 lg:justify-between mt-4 lg:mt-0 lg:mr-[-10px] mr-2">
        <img
          className="object-contain w-full md:h-44 h-36"
          src={product.images}
          alt={product.name}
        ></img>
      </div>
      <div className="w-full lg:w-2/3">
        <CardHeader className="">
          <CardTitle className="text-2xl lg:text-4xl inline-flex">{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="hidden">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="space-x-4 mt-4 lg:mt-0">
          <Button variant="secondary" size="sm">
            View Product
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToCart(product._id)}
          >
            <IoCartOutline className="w-5 h-5" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default FeaturedCard;
