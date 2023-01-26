import { createSlice } from "@reduxjs/toolkit";
import productData from "../../data/products.json";

const initialState = {
  data: {
    products: [],
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
  },
});

export const { getProductsByCategory } = ProductSlice.actions;
export default ProductSlice.reducer;
