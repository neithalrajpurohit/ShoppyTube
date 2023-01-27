import { createSlice } from "@reduxjs/toolkit";
import productData from "../../data/products.json";

const initialState = {
  data: {
    products: [],
    productDetails: {},
  },
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsByCategory: (state, action) => {
      let allProducts = productData.filter(
        (product) => product.categoryID === Number(action.payload.id)
      );
      state.data.products = allProducts;
      console.log(action);
    },
    getProductDetails: (state, action) => {
      let productDetails = productData.find((product) => {
        return product.id === action.payload.id;
      });
      state.data.productDetails = productDetails;
    },
  },
});

export const { getProductsByCategory, getProductDetails } =
  ProductSlice.actions;
export default ProductSlice.reducer;
