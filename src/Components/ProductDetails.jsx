import React, { useState, useEffect } from "react";
import { getProductDetails } from "../features/Products/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import Header from "./Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  addToCart,
  getAllCartItems,
  decrementQty,
} from "../features/Cart/CartSlice";
import priceFormat from "../utils/priceFormat";
import { sizeMapper } from "../utils/productSizeMapper";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let params = useParams();
  const [mark, setMark] = useState(null);

  const productdetails = useSelector(
    (state) => state.product.data.productDetails
  );

  const cartItems = useSelector((state) => state.cart.cartItems);

  // console.log(cartItems);

  useEffect(() => {
    dispatch(getProductDetails({ id: params.productId }));
    dispatch(getAllCartItems());
  }, []);

  let toggleButton = cartItems?.find((cartId) => {
    return cartId.id === productdetails.id;
  });

  return (
    <div
      className="min-h-[100vh]"
      style={{
        background: `linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)`,
      }}>
      <Header />
      <div
        className="rounded-lg max-w-[1200px] mx-auto flex gap-10 min-h-[100vh] bg-[#FFFFFF]"
        style={{
          background: `linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)`,

          // background: `linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)`,
        }}>
        {/* {product images} */}
        <div className="w-[530px] mr-4 relative overflow-x-hidden">
          <Carousel
            width="530px"
            renderItem={({ props }) => {
              return (
                <div className="w-[520px] h-[600px]">
                  <img
                    src={props.children[0].props.src}
                    alt="photo"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              );
            }}
            renderArrowNext={(props) => {
              return (
                <div
                  className="absolute right-2 z-10 top-[40%] flex justify-center items-center w-[55px] h-[55px] cursor-pointer hover:bg-[rgba(0,0,0,.4)] bg-[rgba(0,0,0,.2)] transition-bg duration-150 rounded-full"
                  onClick={props}>
                  <MdOutlineNavigateNext className="text-[40px] text-white" />
                </div>
              );
            }}
            renderArrowPrev={(props) => {
              return (
                <div
                  className="absolute left-2 z-10 top-[40%] flex justify-center items-center w-[55px] h-[55px] cursor-pointer hover:bg-[rgba(0,0,0,.4)] bg-[rgba(0,0,0,.2)] transition-bg duration-150 rounded-full"
                  onClick={props}>
                  <MdOutlineNavigateBefore className="text-[40px] text-white" />
                </div>
              );
            }}
            renderIndicator={(click, isSelected, index, label) => {
              return (
                <span
                  onClick={click}
                  style={{
                    border: isSelected
                      ? "1px solid #34b3d5"
                      : "1px solid #e6e6e6",
                    backgroundColor: isSelected ? "#34b3d5" : "transparent",
                  }}
                  className="h-[10px] w-[10px] rounded-full inline-block mr-2 cursor-pointer"></span>
              );
            }}
            renderThumbs={(props) => {
              return props.map((thumb, i) => {
                return (
                  <div key={i}>
                    <img
                      className="w-full h-full object-contain"
                      src={thumb.props.children[0].props.src}
                    />
                  </div>
                );
              });
            }}>
            {productdetails?.images?.map((img, i) => {
              return (
                <div key={i}>
                  <img src={img} />
                  <p className="legend"></p>
                </div>
              );
            })}
          </Carousel>
        </div>

        {/* {product details} */}
        <div className="  pt-5 max-w-[700px]">
          <h1 className="text-3xl font-serif font-semibold">
            {productdetails.brand ||
              (productdetails?.prodDetails &&
                productdetails?.prodDetails[0].Brand)}
          </h1>
          <p className="text-slate-500">{productdetails.title}</p>
          <h3 className="pt-5 text-gray-600 text-[14px]">
            {productdetails.overview}
          </h3>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl pt-2 font-serif">
              {priceFormat.format(productdetails.sellingPrice)}
            </h3>
            <p className="line-through text-gray-500">
              {priceFormat.format(productdetails.marketPrice)}
            </p>
            <span className="text-[#ffad0a]">(20% OFF)</span>
          </div>
          <p className="text-green-400 mb-5">Inclusive of all taxes</p>

          {/* {Product Sizes} */}
          {productdetails.sizes && (
            <h1 className="text-2xl font-serif text-slate-600 font-semibold">
              Sizes
            </h1>
          )}
          {productdetails.sizes && (
            <div className="flex items-center gap-4 pt-4">
              {productdetails.sizes.map((size, i) => {
                return (
                  <div key={i}>
                    <button
                      style={{
                        background:
                          mark === i
                            ? "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)"
                            : "white",
                        border:
                          Number(size.stock) >= 1
                            ? "1px solid #fdd6bd"
                            : "1px solid #c1c1c1",
                        opacity: Number(size.stock) >= 1 ? 1 : 0.2,
                        cursor:
                          Number(size.stock) >= 1 ? "pointer" : "not-allowed",
                      }}
                      className="border-1 rounded-full w-[50px] h-[50px] flex justify-center items-center border border-[#fdd6bd]"
                      onClick={() => setMark(i)}>
                      {isNaN(size.size) ? sizeMapper(size.size) : size.size}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex items-center m-5 gap-8 mt-8">
            {!toggleButton ? (
              <button
                onClick={() => dispatch(addToCart({ id: productdetails.id }))}
                className="inline-flex items-center  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="inline-flex items-center  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-md text-sm px-7 py-3 text-center mr-2 mb-2">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Go to Cart
              </button>
            )}
            <div className="flex items-center gap-5 ">
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: productdetails.id,
                    })
                  );
                }}
                className="active:scale-95 transition-transform duration-150 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  +
                </span>
              </button>

              <p>
                {cartItems?.find((item) => {
                  return item.id === productdetails.id;
                })?.qty || 0}
              </p>

              <button
                onClick={() => {
                  dispatch(
                    decrementQty({
                      id: productdetails.id,
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

          {/* {More product details} */}
          <h2 className="text-slate-600 text-3xl mt-[60px]">Product Details</h2>
          <div className="p-4 overflow-x-auto w-[690px]">
            <table className="mt-7 text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {productdetails?.prodDetails?.map((prod, i) => {
                    return (
                      <th
                        key={i}
                        scope="col"
                        className="px-6 py-3 rounded-l-lg"
                        style={{
                          width: "200px",
                        }}>
                        {Object.keys(prod)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  {productdetails?.prodDetails?.map((prod, i) => {
                    return (
                      <td key={i} className="px-6 py-4">
                        {Object.values(prod)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            {/* 
                        {productdetails.prodDetails?.map((prod, i) => {
                            const keys = Object.keys(prod);
                            return (
                                <div
                                    key={i}
                                    className="flex items-center py-1 border-b border-slate-100 justify-between"
                                >
                                    <p className="text-slate-500">{keys[0]}</p>
                                    <p className="text-slate-500">
                                        {prod[keys[0]]}
                                    </p>
                                </div>
                            );
                        })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
