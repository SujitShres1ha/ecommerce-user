import React from "react";
import ProductCard from "./ProductCard";

function LatestProducts({newProducts}) {
  return (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">New Arrivals</h1>
    <div className="flex gap-8 flex-wrap items-start justify-normal">
      {newProducts.map((product) => <ProductCard key={product._id} product={product}/>)}
    </div>
  </div>
  );
}

export default LatestProducts;
