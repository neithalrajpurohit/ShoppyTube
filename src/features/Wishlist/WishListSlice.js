import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../data/products.json";

const initialState = {
  wishListItems: [],
};
const WishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishList: (state, action) => {
      let allWishlistItems = [];
      let prevItems = localStorage.getItem("wishlist");
      if (prevItems) {
        prevItems = JSON.parse(prevItems);
        allWishlistItems.push(...prevItems);
        state.wishListItems = allWishlistItems;
      }
    },
    addToWishList: (state, action) => {
      let allWishlistItems = [];
      let prevItems = localStorage.getItem("wishlist");
      if (prevItems) {
        prevItems = JSON.parse(prevItems);
        allWishlistItems.push(...prevItems);
      }
      let currentProduct = productsData.find((product) => {
        return product.id === action.payload.id;
      });
      allWishlistItems.push(currentProduct);
      localStorage.setItem("wishlist", JSON.stringify(allWishlistItems));
      state.wishListItems = allWishlistItems;
    },
    removeWishList: (state, action) => {
      let allWishlistItems = [];
      let addedProduct = localStorage.getItem("wishlist");
      if (addedProduct) {
        addedProduct = JSON.parse(addedProduct);
        allWishlistItems.push(...addedProduct);
      }
      let index = allWishlistItems.findIndex((product) => {
        return product.id === action.payload.id;
      });
      allWishlistItems.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(allWishlistItems));
      state.wishListItems = allWishlistItems;
    },
  },
});
export const { getWishList, addToWishList, removeWishList } =
  WishListSlice.actions;

export default WishListSlice.reducer;
