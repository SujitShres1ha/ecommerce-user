import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MdAdd } from "react-icons/md";
import { HiMinus } from "react-icons/hi";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .post(`/api/cart/`, { ids: id })
        .then((response) => setProduct(response.data[0]))
        .catch((error) => {
          console.error('Failed to fetch product data from cart:', error);
        });
    }
  }, [id, cart]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      setItemCount(cart.find(cartProduct => cartProduct.id == id)?.quantity);
    } else {
      setItemCount(0);
    }
  }, [cart]);

  useEffect(() => {
    if (product && product.images?.length > 0) {
      setSelectedImage(product.images[0])
    }
  },[product])

  const handleSubtract = () => {
    if (itemCount == 1) {
      removeFromCart(id);
    } else if (itemCount > 1) {
      addToCart(id, itemCount - 1);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full h-full justify-center p-4">
        <div className="flex flex-col md:flex-row h-full justify-center gap-8 w-full max-w-4xl">
          <div className="flex flex-col gap-2 h-[425px] overflow-y-auto w-32 px-4 py-4">
            {product?.images?.length && product.images.map((image, index) => {
              return (
                <div key={index} className="w-full h-24 outline outline-gray-300 px-2 py-1 rounded-md hover:outline-black hover:outline-2" onClick={() => setSelectedImage(image)}>
                  <Image src={image} className="object-contain w-full h-full" width={70} height={70} />
                </div>
              );
            })}
          </div>
          <div className="p-4 flex items-center justify-center md:justify-start h-[300px] w-[200px] md:h-[400px] md:w-[300px] overflow-hidden relative">
            {selectedImage && (
              <Image
                src={`${selectedImage}`}
                className="object-contain h-full w-full"
                quality="100"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Main product image"
              />
            )}
          </div>
          <div className="justify-end w-full md:w-2/3 space-y-1 py-2 h-full">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl md:text-4xl w-full font-playfair">{product.name}</h1>
              <h1 className="font-bold text-2xl md:text-4xl">${product.price}</h1>
              <p className="text-gray-600 text-sm md:text-base">{product.title}</p>
              {isDescriptionOpen && (
                <p className="text-gray-600 text-sm md:text-base">{product.description}</p>
              )}
              <button
                onClick={() => setIsDescriptionOpen((prev) => !prev)}
                className="text-gray-500 text-sm md:text-base font-semibold underline underline-offset-4 text-left"
              >
                {!isDescriptionOpen ? "More Info +" : "Less Info -"}
              </button>
            </div>
            <div className="flex gap-5 items-center pt-5">
              <div className="flex items-center space-x-5 outline outline-gray-500 h-11">
                <button className="px-2" onClick={handleSubtract}>
                  <HiMinus size={17} />
                </button>
                <span className="max-w-1">{itemCount ? itemCount : 0}</span>
                <button className="px-3" onClick={() => addToCart(id, itemCount + 1)}>
                  <MdAdd size={20} />
                </button>
              </div>
              <button onClick={() => router.push('/cart')} className="bg-black text-white h-[46px] px-4 py-1">Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}