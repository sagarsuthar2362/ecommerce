import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { CiMenuFries } from "react-icons/ci";
import { setupListeners } from "@reduxjs/toolkit/query";

const Navbar = () => {
  const cartItems = useSelector((state) => state.product.cart);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  return (
    <div className="bg-gradient-to-r from-purple-700 to-black text-white flex items-center justify-between p-4">
      <h1 id="logo" className="text-xl font-semibold w-fit ">
        <Link to={"/"}> ShopVerse</Link>
      </h1>

      <ul id="menu" className="md:flex hidden gap-8 text-lg ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
        <li>
          <Link to="/cart" className="relative">
            <CiShoppingCart className="text-2xl" />
            <span className="absolute -top-4 -right-2">
              {cartItems.length || ""}
            </span>
          </Link>
        </li>
      </ul>

      {/* menu open button */}
      <CiMenuFries
        className="text-white text-2xl cursor-pointer md:hidden"
        onClick={() => setHamburgerMenu(!hamburgerMenu)}
      />

      {hamburgerMenu && (
        <ul
          id="menu_sm_screen"
          className="fixed w-[300px] bg-gray-200 text-black h-screen right-0 top-0 flex flex-col gap-8 text-lg transition px-5 py-20 z-99"
        >
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact us</Link>
          </li>

          <li>
            <Link to="/cart" className="relative">
              <CiShoppingCart className="text-2xl" />
              <span className="absolute -top-4 -right-2">
                {cartItems.length || ""}
              </span>
            </Link>
          </li>

          <button className="absolute top-2 right-4 cursor-pointer text-2xl " onClick={()=>setHamburgerMenu(!hamburgerMenu)}>X</button>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
