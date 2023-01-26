import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCategories from "../CustomHooks/useCategories";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../features/Products/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.data.products);

  const [womenProduct, decorProduct, womenBrand] = useCategories();
  let params = useParams();

  useEffect(() => {
    dispatch(getProductsByCategory({ id: params.categoryId }));
  }, []);

  return (
    <div>
      {productData.map((product) => {
        return (
          <div key={product.id}>
            {product.brand}
            <li>{product.sellingPrice}</li>
            <li>{product.marketPrice}</li>
            <h2>{product.title}</h2>
            <img src={product.images[0]} />
          </div>
        );
      })}
      ProductList
    </div>
  );
};

export default ProductList;
