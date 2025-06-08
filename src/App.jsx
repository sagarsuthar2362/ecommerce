import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
