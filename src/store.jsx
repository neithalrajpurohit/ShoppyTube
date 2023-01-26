import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/Category/CategorySlice";
import productReducer from "./features/Products/ProductSlice";
export const store = configureStore({
  reducer: { category: categoryReducer, product: productReducer },
});
