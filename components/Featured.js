import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FeaturedCard from "./FeaturedCard";


function Featured({product}) {
  return (
    <Carousel className="">
      <CarouselContent className="">
        <CarouselItem><FeaturedCard product={product}/></CarouselItem>
        <CarouselItem>2</CarouselItem>
        <CarouselItem>3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    );
}

export default Featured;


