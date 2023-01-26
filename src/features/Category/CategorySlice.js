import { createSlice } from "@reduxjs/toolkit";
import categoryData from "../../data/categories.json";
import productData from "../../data/products.json";

const initialState = {
  data: {
    women: [],
    decor: [],
    brands: [],
  },
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state) => {
      let women = categoryData.filter((category) => category.type === "women");
      let decor = categoryData.filter((category) => category.type === "Decor");
      state.data.women = women;
      state.data.decor = decor;
    },
    getWomenBrands: (state) => {
      let womenBrands = productData
        .filter((product) => product.categoryID === 2)
        .map((product) => {
          return product.brand;
        });
      let uniqueBrands = [];
      for (let elem of womenBrands) {
        if (!uniqueBrands.includes(elem)) {
          uniqueBrands.push(elem);
        }
      }

      state.data.brands = uniqueBrands;
    },
  },
});
export const { getCategories, getWomenBrands } = CategorySlice.actions;
export default CategorySlice.reducer;
