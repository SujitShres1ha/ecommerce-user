import Link from "next/link";

function Header() {
  const router = useRouter()
  const {cart} = useContext(CartContext)
  return (
    <header className="bg-white text-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">MyStore</Link>
        </div>
        <nav className="flex space-x-4">
          <Link href="/products" className={` ${router.pathname === '/' ? 'border-b-[1px] font-medium border-gray-600' : ''}`}>All Products</Link>
          <Link href="/categories" className={`${router.pathname === '/categories' ? 'border-b-[1px] font-medium border-gray-600' : ''}`}>Categories</Link>
          <Link href="/account" className={` ${router.pathname === '/account' ? 'border-b-[1px] font-medium border-gray-600' : ''}`}>Account</Link>
          <Link href="/cart" className={` ${router.pathname === '/cart' ? 'border-b-[1px] font-medium border-gray-600' : ''}`}>Cart ({cart.length})</Link>
        </nav>
      </div>
    </header>
  );
}
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default Header;
