import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useSelector } from "react-redux";

const Sidebar = ({
  sidebar,
  setSidebar,
  selectedCategory,
  setSelectedCategory,
}) => {
  const products = useSelector((state) => state.product.products);
  const uniqueCategories = [...new Set(products.map((item) => item.category))];

  return (
    <div
      style={{ width: sidebar ? "300px" : "50px" }}
      className="bg-gray-200 md:flex flex-col hidden h-screen fixed top-[60px] left-0 transition duration-300"
    >
      <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
        <CiFilter className="text-3xl" />
      </div>

      {sidebar && (
        <div className="p-4">
          <div id="categories">
            <h1 className="text-2xl">Categories</h1>
            <hr className="my-2" />
            {uniqueCategories.map((category, index) => (
              <div
                className="flex items-center gap-2 text-lg"
                key={`cat-${index}`}
              >
                <input
                  type="checkbox"
                  value={category}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategory([...selectedCategory, category]);
                    } else {
                      setSelectedCategory(
                        selectedCategory.filter((cat) => cat !== category)
                      );
                    }
                  }}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>

          <button className="w-full bg-purple-600 text-white rounded-md mt-8 py-2 cursor-pointer">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
