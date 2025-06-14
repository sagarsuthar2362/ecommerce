import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";
import Navbar from "../components/Navbar";
import { fetchProducts } from "../redux/slice/productSlice";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/productSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const productsPerPage = 20;
  const start = (page - 1) * productsPerPage;
  const end = page * productsPerPage;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filteredProducts =
    selectedCategory.length > 0
      ? products.filter((item) => selectedCategory.includes(item.category))
      : products;

  const totalPages = filteredProducts.length / productsPerPage;
  const setPageHandler = (pg) => {
    if (pg > 0 && pg <= totalPages) {
      setPage(pg);
    }
  };

  return (
    <div>
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div
        className="flex flex-wrap justify-center gap-4 py-20 md:ml-0"
        style={{ marginLeft: sidebar && "300px" }}
      >
        {loading ? (
          <div className="flex flex-wrap justify-center gap-4 ">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-[22rem] h-[300px] bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          filteredProducts.slice(start, end).map((products) => (
            <div
              key={products.id}
              className="border border-slate-300 w-[22rem]"
            >
              <img src={products.thumbnail} alt={products.title} />

              <div id="product-dets" className="p-2">
                <h2 className="text-xl font-semibold truncate">
                  {products.title}
                </h2>
                <p className="truncate text-slate-600">
                  {products.description}
                </p>
                <div id="price" className="flex items-center gap-5">
                  <span className="text-2xl font-light text-red-500">
                    -{products.discountPercentage}%
                  </span>

                  <span className="text-xl">
                    {(
                      products.price -
                      (products.price * products.discountPercentage) / 100
                    ).toFixed(2)}
                    $
                  </span>

                  <span className="line-through text-slate-500">
                    {products.price}$
                  </span>
                </div>
              </div>

              <div className="p-2 ">
                <button
                  className="w-full bg-purple-600 text-white p-3 rounded flex itens-center justify-center gap-2 cursor-pointer hover:bg-purple-700"
                  onClick={() => dispatch(addToCart(products))}
                >
                  Add to Cart <CiShoppingCart className="text-2xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* pagination code */}
      <div
        className="flex justify-center gap-4 text-xl"
        style={{ marginLeft: sidebar ? "350px" : "0" }}
      >
        <button
          onClick={() => setPageHandler(page - 1)}
          className="cursor-pointer"
        >
          prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <h1
            onClick={() => setPageHandler(i + 1)}
            className={`${
              page === i + 1 ? "bg-purple-500" : ""
            } border border-gray-200 px-4 py-2 cursor-pointer`}
          >
            {i + 1}
          </h1>
        ))}
        <button
          onClick={() => setPageHandler(page + 1)}
          className="cursor-pointer"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Home;
