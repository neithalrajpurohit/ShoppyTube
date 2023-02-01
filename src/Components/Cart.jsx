import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  getAllCartItems,
  removeFromCart,
  decrementQty,
} from "../features/Cart/CartSlice";
import { addToWishList } from "../features/Wishlist/WishListSlice";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  function deleteCartItems(id) {
    dispatch(removeFromCart({ id }));
    // console.log(id);
  }
  return (
    <div>
      <Header />
      {/* {cartItems.map(cartProducts)} */}
      <div
        className=" bg-[#bbcde5]  w-full h-full  dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto "
        id="chec-div">
        {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
        <div
          className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="checkout">
          <div
            className="flex items-end lg:flex-row flex-col justify-center"
            id="cart">
            <div
              className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4  bg-[#bbcde5] dark:bg-gray-800  overflow-x-hidden lg:h-screen h-auto"
              id="scroll">
              <div
                className="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer"
                onclick="checkoutHandler(false)">
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
              {cartItems.map((cartProducts) => {
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
                        <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                          {cartProducts.title}
                        </p>
                        <div className="flex items-center gap-5  w-[50px] ">
                          <button
                            className=" flex px-1 py-1 justify-content items-center bg-[#2176ff] border-1 rounded border-gray-600"
                            onClick={() => {
                              dispatch(addToCart({ id: cartProducts.id }));
                            }}>
                            +
                          </button>
                          <p>
                            {cartItems?.find((item) => {
                              return item.id === cartProducts.id;
                            })?.qty || 0}
                          </p>

                          <button
                            className=" flex px-1 py-1 justify-content items-center bg-[#2176ff] border-1 rounded border-gray-600"
                            onClick={() => {
                              dispatch(decrementQty({ id: cartProducts.id }));
                            }}>
                            -
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
                              dispatch(addToWishList({ id: cartProducts.id }));
                              dispatch(removeFromCart({ id: cartProducts.id }));
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
                          &#8377; {cartProducts.sellingPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
              <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                <div>
                  <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">
                    Summary
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800 dark:text-white">
                      Subtotal
                    </p>
                    <p className="text-base leading-none text-gray-800 dark:text-white">
                      ,000
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800 dark:text-white">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800 dark:text-white" />
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800 dark:text-white">
                      Tax
                    </p>
                    <p className="text-base leading-none text-gray-800 dark:text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800 dark:text-white">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">
                      ,240
                    </p>
                  </div>
                  <button
                    onclick="checkoutHandler1(true)"
                    className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
