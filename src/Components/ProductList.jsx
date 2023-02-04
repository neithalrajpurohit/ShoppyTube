import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCategories from "../CustomHooks/useCategories";
import { useParams, useLocation } from "react-router-dom";
import {
  getProductsByCategory,
  getProductsBySearch,
} from "../features/Products/ProductSlice";
import ProductCard from "./ProductCard";
import Header from "./Header";

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.data.products);
  const location = useLocation();
  const [womenProduct, decorProduct, womenBrand] = useCategories();
  let params = useParams();

  useEffect(() => {
    if (location.state?.type == "search") {
      // getallproducts by search query
      dispatch(getProductsBySearch({ title: location.state.query }));
    } else {
      dispatch(getProductsByCategory({ id: params.categoryId }));
    }
  }, [location.state]);

  return (
    <div>
      <Header />
      <h2 className="p-5 text-3xl text-center items-center ">
        {" "}
        Happy Shopping
      </h2>
      {location.state?.type === "search" ? (
        <div className="text-center text-2xl font-serif">
          Search results for
          <span className="text-3xl font-serif"> : {location.state.query}</span>
        </div>
      ) : null}
      <div className=" pt-6 flex bg-[#ffd4ca]  justify-center flex-wrap gap-[15px] ">
        {productData.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              decorBrand={product.prodDetails[0].Brand}
              brand={product.brand}
              sP={product.sellingPrice}
              mP={product.marketPrice}
              title={product.title}
              image={product.images[0]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
