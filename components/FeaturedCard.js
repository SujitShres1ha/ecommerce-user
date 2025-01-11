import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "./CartContext";


function FeaturedCard({product}) {
  const {addToCart} = useContext(CartContext)
  console.log(product)
  return (
    <Card className="flex justify-between">
      <div className="w-2/3">
        <CardHeader className="">
          <CardTitle className="text-4xl">{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="hidden">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button variant='secondary' size='sm'>View Product</Button>
          <Button variant='outline' size='sm' onClick={() => addToCart(product._id)}>
            <IoCartOutline className="w-5 h-5"/>
            Add to Cart
          </Button>
        </CardFooter>
      </div>
      <div className="flex items-center w-1/3 justify-center lg:mr-[-10px] mr-2">
        <img className="object-contain w-full h-44" src={product.images}></img>
      </div>
    </Card>
    )
}

export default FeaturedCard;
