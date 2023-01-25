import { createSlice } from "@reduxjs/toolkit";
import categoryData from "../../data/categories.json";

const initialState = {
  data: {
    women: [],
    decor: [],
  },
};
const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state) => {
      let women = categoryData.filter((category) => category.type === "women");
      let decor = categoryData.filter((category) => category.type === "decor");
      state.data.women = women;
      state.data.decor = decor;
    },
  },
});
export const { getCategories } = CategorySlice.actions;
export default CategorySlice.reducer;
