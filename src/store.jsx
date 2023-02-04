import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/Category/CategorySlice";
import productReducer from "./features/Products/ProductSlice";
import cartReducer from "./features/Cart/CartSlice";
import wishListReducer from "./features/Wishlist/WishListSlice";
import authReducer from "./features/Auth/AuthSlice";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
