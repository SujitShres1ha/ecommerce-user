import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

function Header() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className="bg-white text-black">
      <div className="container mx-auto flex justify-between items-center md:p-4">
        <button
          onClick={() => setNavOpen(true)}
          aria-label="Open navigation"
          className="md:hidden"
        >
          <FiAlignJustify className="w-6 h-6" />
        </button>

        <div className="text-lg font-bold inline-flex w-full justify-center md:w-auto">
          <Link href="/">MyStore</Link>
        </div>

        <nav className="hidden md:flex space-x-6 justify-evenly">
          <Link
            href="/"
            className={`${
              router.pathname === "/"
                ? "border-b-[1px] font-medium border-gray-600"
                : ""
            }`}
          >
            All Products
          </Link>
          <Link
            href="/categories"
            className={`${
              router.pathname === "/categories"
                ? "border-b-[1px] font-medium border-gray-600"
                : ""
            }`}
          >
            Categories
          </Link>
          <Link
            href="/account"
            className={`${
              router.pathname === "/account"
                ? "border-b-[1px] font-medium border-gray-600"
                : ""
            }`}
          >
            Account
          </Link>
          <Link
            href="/cart"
            className={`${
              router.pathname === "/cart"
                ? "border-b-[1px] font-medium border-gray-600"
                : ""
            }`}
          >
            Cart
              {cart?.length > 0 && `(${cart?.reduce((acc, product) => acc + product.quantity, 0)})`}
          </Link>
        </nav>
      </div>

      {/* Sidebar for Small Screens */}
      {navOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setNavOpen(false)}
          ></div>
          <aside className="relative w-56 bg-white h-full flex flex-col p-6 space-y-4 shadow-lg text-sm">
            <button
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation"
              className="self-end text-black"
            >
              ✕
            </button>
            <Link
              href="/products"
              onClick={() => setNavOpen(false)}
              className={`${
                router.pathname === "/"
                  ? "inline-block self-start border-b-[1px] font-semibold border-gray-600"
                  : ""
              }`}
            >
              All Products
            </Link>
            <Link
              href="/categories"
              onClick={() => setNavOpen(false)}
              className={`${
                router.pathname === "/categories"
                  ? "inline-block self-start border-b-[1px] border-gray-600"
                  : ""
              }`}
            >
              Categories
            </Link>
            <Link
              href="/account"
              onClick={() => setNavOpen(false)}
              className={`${
                router.pathname === "/account"
                  ? "inline-block self-start border-b-[1px] border-gray-600"
                  : ""
              }`}
            >
              Account
            </Link>
            <Link
              href="/cart"
              onClick={() => setNavOpen(false)}
              className={`${
                router.pathname === "/cart"
                  ? "inline-block self-start border-b-[1px] border-gray-600"
                  : ""
              }`}
            >
              Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
          </aside>
        </div>
      )}
      <hr className="md: mx-4"/>
    </header>
  );
}

export default Header;
