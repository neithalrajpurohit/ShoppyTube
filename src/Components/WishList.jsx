import React, { useEffect } from "react";
import Header from "./Header";
import {
  getWishList,
  removeWishList,
} from "../features/Wishlist/WishListSlice";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/CartSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList.wishListItems);
  console.log(wishList);

  useEffect(() => {
    dispatch(getWishList());
  }, []);
  return (
    <div
      style={{
        background: `linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)`,
      }}
      className="bg-[#639fab] min-h-[100vh]">
      <Header />
      {wishList.length <= 0 ? (
        <div className="flex justify-center h-[100vh] w-full items-center">
          <h1 className="text-3xl text-center font-serif  ">
            Your Wishlist is empty
          </h1>
        </div>
      ) : (
        <div className="relative max-w-[1200px] mt-10  mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
              <tr
                style={{
                  background: `linear-gradient(-20deg, #fdd6bd 0%,  #f794a4 100%)`,
                }}
                className="bg-[#bbcde5] ">
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {wishList.map((product) => {
                return (
                  <tr
                    key={product.id}
                    style={{
                      background: `linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)`,
                    }}
                    className="bg-[#bbcde5]  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#6790c5]  dark:hover:bg-gray-600">
                    <td className="w-32 p-4">
                      <img src={product.images[0]} alt="Apple Watch" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      &#8377;{product.sellingPrice}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-7">
                        <a
                          href="#"
                          className=" font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => {
                            dispatch(
                              addToCart({
                                id: product.id,
                              })
                            );
                            dispatch(
                              removeWishList({
                                id: product.id,
                              })
                            );
                          }}>
                          Move To Cart
                        </a>
                        <a
                          href="#"
                          className="font-medium text-r(ed-600 dark:text-red-500 hover:underline"
                          onClick={() =>
                            dispatch(
                              removeWishList({
                                id: product.id,
                              })
                            )
                          }>
                          Remove
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishList;
