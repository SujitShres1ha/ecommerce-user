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
import Link from "next/link";
import { useRouter } from "next/router";


function ProductCard({product}) {
  const {addToCart} = useContext(CartContext)
  const router = useRouter()
  return (
    <Card className="md:w-56 md:h-56 h-48 w-48 hover:cursor-pointer"
    onClick={e => {
      if (!e.target.closest('button')){
        router.push(`/product/${product._id}`)
      }
    }}>
        <CardHeader className="h-2/3">
          <div className="w-full h-full">
            <img className="w-full h-full object-contain" src={product?.images?.[0]} alt={product.name} />
          </div>
        </CardHeader>
        <CardContent className="-mt-3 -mb-2">
          <span className="underline underline-offset-2 font-black text-lg inline-flex items-center justify-center w-full truncate">{product.name}</span>
          <div className="flex gap-2 items-center justify-center mt-2">
            <span className="text-xl font-bold">${product.price}</span>
            <Button variant='outline' size='sm' onClick={(e) => {e.stopPropagation; addToCart(product._id)}}>
              <IoCartOutline className="w-5 h-5" />
              Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    )
}

export default ProductCard;
