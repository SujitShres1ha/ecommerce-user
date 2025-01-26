import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FeaturedCard from "./FeaturedCard";


function Featured({products}) {
  return (
    <Carousel className="">
      <CarouselContent className="">
        {products.map(product => {
          return (<CarouselItem><FeaturedCard key={product._id} product={product}/></CarouselItem>)
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    );
}

export default Featured;


