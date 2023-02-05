import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { v4 } from "uuid";
import {
  addToCart,
  removeFromCart,
  decrementQty,
} from "../features/Cart/CartSlice";
import { addToWishList } from "../features/Wishlist/WishListSlice";

import priceFormat from "../utils/priceFormat";
import Order from "./Order";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [mrp, setMRP] = useState(0);

  function deleteCartItems(id) {
    dispatch(removeFromCart({ id }));
  }
  const calculateTotalAmount = () => {
    let totalAmount = cartItems?.reduce(
      (prev, curr) => curr.sellingPrice * curr.qty + prev,
      0
    );
    setTotalPrice(totalAmount);
    let totalMRP = cartItems?.reduce(
      (prev, curr) => curr.marketPrice * curr.qty + prev,
      0
    );
    setMRP(totalMRP);
  };
  useEffect(() => {
    calculateTotalAmount();
  }, [cartItems]);
  const Razorpay = useRazorpay();

  console.log(process.env.REACT_APP_SERVER_URL);
  const handlePayment = async (params) => {
    //  Create order on your backend
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      let order = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/order`,
        {
          amount: totalPrice,
          name: user.name,
        },
        {
          "content-type": "application/json",
        }
      );
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEYS, // Enter the Key ID generated from the Dashboard
        amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: user.name,
        description: "shoppy tube Transaction",
        image: "https://example.com/your_logo",
        order_id: order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
          setShowModal(true);
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          name: user.name,
          email: user.email,
        },

        theme: {
          color: "#3399cc",
        },
      };
      console.log(order);
      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    }
  };

  return (
    <div
      style={{
        background: `linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)`,
      }}
      className="bg-[#639fab] min-h-[100vh]">
      <Header />
      {showModal && <Order setShowModal={setShowModal} />}

      {cartItems?.length >= 1 ? (
        <div
          className="bg-[#e6e6e6] rounded-2xl  w-full h-full  dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto "
          id="chec-div">
          {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout">
            <div
              className="flex items-end lg:flex-row flex-col justify-center"
              id="cart">
              <div
                style={{
                  background: `linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)`,
                }}
                className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4  bg-[#bbcde5] rounded-2xl dark:bg-gray-800  overflow-x-hidden lg:h-screen h-auto"
                id="scroll">
                <div className="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p
                    className="text-sm pl-2 leading-none dark:hover:text-gray-200"
                    onClick={() => navigate(-1)}>
                    Back
                  </p>
                </div>
                <p className="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">
                  Your Items
                </p>
                <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"></div>
                {cartItems?.map((cartProducts) => {
                  return (
                    <div
                      key={cartProducts.id}
                      className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                      <div className="md:w-4/12 2xl:w-1/4 w-full">
                        <img
                          src={cartProducts.images[0]}
                          alt="Gray Sneakers"
                          className="h-full object-center object-cover md:block hidden"
                        />
                        <img
                          src={cartProducts.images[0]}
                          alt="Gray Sneakers"
                          className="md:hidden w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4"></p>

                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base flex-1 font-black leading-none text-gray-800 dark:text-white">
                            {cartProducts.title}
                          </p>
                          <div className="flex flex-[.4] items-center justify-end gap-5  w-[50px] ">
                            <button
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    id: cartProducts.id,
                                  })
                                );
                              }}
                              className="active:scale-95 transition-transform duration-150 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                +
                              </span>
                            </button>

                            <p>{cartProducts.qty}</p>

                            <button
                              onClick={() => {
                                dispatch(
                                  decrementQty({
                                    id: cartProducts.id,
                                  })
                                );
                              }}
                              className="active:scale-95 transition-transform duration-150 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                -
                              </span>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">
                          Dimensions: {cartProducts?.prodDetails[4]?.Dimensions}
                        </p>
                        <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">
                          Color: {cartProducts?.prodDetails[6]?.Colour}
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">
                          Composition: 100% calf leather
                        </p>
                        <div className="flex items-center justify-between pt-5">
                          <div className="flex itemms-center">
                            <p
                              className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer"
                              onClick={() => {
                                dispatch(
                                  addToWishList({
                                    id: cartProducts.id,
                                  })
                                );
                                dispatch(
                                  removeFromCart({
                                    id: cartProducts.id,
                                  })
                                );
                                navigate("/wishlist");
                              }}>
                              Add to Wishlist
                            </p>
                            <p
                              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                              onClick={() => deleteCartItems(cartProducts.id)}>
                              Remove
                            </p>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                            {priceFormat.format(cartProducts.sellingPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  background: `linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)`,
                }}
                className="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
                <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                  <div>
                    <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base font-serif leading-none text-gray-800 dark:text-white">
                        Total MRP :
                      </p>
                      <p className=" text-base  leading-none text-gray-800 dark:text-white">
                        {priceFormat.format(mrp)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-6">
                      <p className="text-base font-serif leading-none text-gray-800 dark:text-white">
                        Selling Price :
                      </p>
                      <p className="text-base  leading-none text-gray-800 dark:text-white">
                        {priceFormat.format(totalPrice)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base font-serif leading-none text-gray-800 dark:text-white">
                        Shipping
                      </p>
                      <p className="text-base  leading-none text-gray-800 dark:text-white">
                        {totalPrice > 1000 ? (
                          "Free shipping"
                        ) : (
                          <span> {priceFormat.format(200)}</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base font-serif leading-none text-gray-800 dark:text-white">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl font-serif leading-normal text-gray-800 dark:text-white">
                        Total :
                      </p>
                      <p className="text-4xl font-serif leading-normal text-right text-gray-800 dark:text-white">
                        {totalPrice < 1000
                          ? priceFormat.format(totalPrice + 200)
                          : priceFormat.format(totalPrice)}
                      </p>
                    </div>
                    <button
                      className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => handlePayment()}>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-serif flex items-center justify-center h-[80vh] text-3xl text-center">
          Your Cart is Empty
        </div>
      )}
    </div>
  );
};

export default Cart;
