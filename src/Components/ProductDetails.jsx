import React, { useEffect } from "react";
import { getProductDetails } from "../features/Products/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let params = useParams();

  const [mark, setMark] = useState(null);
  const productdetails = useSelector(
    (state) => state.product.data.productDetails
  );
  useEffect(() => {
    dispatch(getProductDetails({ id: params.productId }));
  }, []);
  console.log(productdetails);
  return (
    <div>
      <Header />
      <div className="bg-[#639fab]">
        <div className="h-[100px] min-h-[100vh] max-w-[1200px] mx-auto flex bg-[#e5d4ce]">
          <Carousel width="480px" dynamicHeight={true}>
            {productdetails?.images?.map((img, i) => {
              return (
                <div key={i}>
                  <img src={img} />
                  <p className="legend"></p>
                </div>
              );
            })}
          </Carousel>
          <div className="bg-[#bbcde5] p-10">
            <h1 className="text-3xl font-serif">{productdetails.brand}</h1>
            <h3 className="pt-5">{productdetails.overview}</h3>
            <h3 className="text-3xl pt-2 font-serif">
              {" "}
              &#8377;{productdetails.sellingPrice}
            </h3>
            <p className="line-through">&#8377;{productdetails.marketPrice}</p>
            <p>{productdetails.title}</p>
            {productdetails.sizes && (
              <div className="flex items-center gap-10 pt-10">
                <h1 className="text-2xl font-serif ">Sizes</h1>
                {productdetails.sizes.map((size, i) => {
                  return (
                    <div key={i}>
                      <button
                        style={{
                          backgroundColor: mark === i ? "Background" : "grey",
                        }}
                        className="border-1 rounded p-2 px-5 bg-gray-400"
                        onClick={() => setMark(i)}>
                        {Object.values(size.size)}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <table className=" mt-10 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  {productdetails?.prodDetails?.map((prod, i) => {
                    return (
                      <th
                        key={i}
                        scope="col"
                        className="px-6 py-3 rounded-l-lg">
                        {Object.keys(prod)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white dark:bg-gray-800">
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
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg
                aria-hidden="true"
                class="w-5 h-5 mr-2 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
