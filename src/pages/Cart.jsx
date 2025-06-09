import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/slice/productSlice";
import { BiAccessibility } from "react-icons/bi";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.cart);
  // console.log(cartItems);

  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((acc, item) => {
    const discountedPrice =
      item.price - (item.price * item.discountPercentage) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  const deliveryCharges = totalAmount * 0.05;

  return (
    <div className="p-4">
      <div id="heading">
        <h1 className="text-4xl ">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div
            id="itemAndSummary"
            className="flex flex-col lg:flex-row justify-between px-10"
          >
            <div id="items" className="md:min-w-[65vw] space-y-4 ">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-md shadow-md flex justify-between md:gap-32"
                >
                  <div className="left flex md:flex-row flex-col ">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="md:h-[12rem] h-44 w-44 object-cover"
                    />

                    <div className="left-text md:py-5 p-4">
                      <h1 className="text-xl font-semibold">{item.title}</h1>
                      <p className="text-slate-500">
                        {item.description.slice(0, 100)}...
                      </p>

                      <div id="counter" className="mt-12">
                        <button
                          className="h-10 w-10 bg-purple-500 cursor-pointer"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          -
                        </button>
                        <span className="mx-5">{item.quantity}</span>
                        <button
                          className="h-10 w-10 bg-purple-500 cursor-pointer"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="right flex flex-col justify-between items-end p-3">
                    <button
                      className="text-4xl cursor-pointer"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      x
                    </button>
                    <span>
                      {item.quantity *
                        (
                          item.price -
                          (item.price * item.discountPercentage) / 100
                        ).toFixed(2)}
                      $
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              id="summary"
              className="bg-gradient-to-br from-purple-600 to-purple-300 flex-grow md:ml-4 text-white p-5 h-fit"
            >
              <h1 className="text-2xl font-semibold">Total </h1>

              <div className="price-box">
                <div className="flex justify-between ">
                  <h1 className="text-lg"> Sub-Total </h1>
                  <span className="font-semibold">
                    {totalAmount.toFixed(2)}$
                  </span>
                </div>
                <div className="flex justify-between ">
                  <h1 className="text-lg"> Delivery Charges </h1>
                  <span className="font-semibold">
                    {totalAmount > 500 ? "Free" : deliveryCharges.toFixed(2)} $
                  </span>
                </div>

                <hr />
                <span className="float-end">
                  {totalAmount > 500
                    ? totalAmount.toFixed(2)
                    : (totalAmount + deliveryCharges).toFixed(2)}
                  $
                </span>
              </div>

              <button className=" w-full cursor-pointer py-2 rounded-md bg-white text-black mt-4">Check Out</button>
            </div>
                    
          </div>
        ) : (
          <h1 className="text-xl text-slate-500 absolute left-1/2 top-1/2 -translate-1/2">
            No Items to display
          </h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
