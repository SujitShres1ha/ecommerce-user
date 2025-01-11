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


function ProductCard({product}) {
  const {addToCart} = useContext(CartContext)
  return (
    <Card className="w-52 h-56">
      <CardHeader className="h-2/3">
        <div className="w-full h-full">
          <img className="w-full h-full object-contain" src={product.images} alt={product.name} />
        </div>
      </CardHeader>
      <CardContent className="-mt-3 -mb-2">
        <span className="underline underline-offset-2 font-black text-lg inline-flex items-center justify-center w-full">{product.name}</span>
        <div className="flex gap-2 items-center justify-center mt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <Button variant='outline' size='sm' onClick={() => addToCart(product._id)}>
            <IoCartOutline className="w-5 h-5" />
            Cart
          </Button>
        </div>
      </CardContent>
    </Card>
    )
}

export default ProductCard;
