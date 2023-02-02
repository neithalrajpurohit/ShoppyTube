import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../data/products.json";

const initialState = {
  cartItems: [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let productId = action.payload.id;
      let currentProduct = productsData.find((product) => {
        return product.id === productId;
      });
      let allCartItems = [];
      let prevCartItems = localStorage.getItem("cart");
      if (prevCartItems) {
        prevCartItems = JSON.parse(prevCartItems);
        allCartItems.push(...prevCartItems);
      }
      let existingItem = allCartItems.find((cartProduct) => {
        return cartProduct.id === currentProduct.id;
      });
      if (existingItem) {
        existingItem.qty++;
        let cartIndex = allCartItems.findIndex((cartItem) => {
          return cartItem.id === existingItem.id;
        });
        allCartItems.splice(cartIndex, 1);
        allCartItems.push(existingItem);
        localStorage.setItem("cart", JSON.stringify(allCartItems));
      } else {
        allCartItems.push({ ...currentProduct, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(allCartItems));
      }
      allCartItems.sort((a, b) => (a.title > b.title ? 1 : -1));
      state.cartItems = allCartItems;
    },
    getAllCartItems: (state) => {
      let prevCartItems = localStorage.getItem("cart");
      if (prevCartItems) {
        prevCartItems = JSON.parse(prevCartItems);
      }
      prevCartItems.sort((a, b) => (a.title > b.title ? 1 : -1));
      state.cartItems = prevCartItems;
    },
    decrementQty: (state, action) => {
      let allCartItems = [];
      let prevCartItems = localStorage.getItem("cart");

      if (prevCartItems) {
        prevCartItems = JSON.parse(prevCartItems);
        allCartItems.push(...prevCartItems);
      }

      let findExistingProduct = allCartItems.find((product) => {
        return product.id === action.payload.id;
      });
      if (findExistingProduct) {
        let index = allCartItems.findIndex((product) => {
          return product.id === action.payload.id;
        });
        if (findExistingProduct.qty <= 0) {
          allCartItems.splice(index, 1);
        } else {
          findExistingProduct.qty = findExistingProduct.qty - 1;
          allCartItems.splice(index, 1);
          allCartItems.push(findExistingProduct);

          console.log(findExistingProduct.qty);
        }
      }
      state.cartItems = allCartItems;
      localStorage.setItem("cart", JSON.stringify(allCartItems));
    },
    removeFromCart: (state, action) => {
      let allCartItems = [];
      let prevCartItems = localStorage.getItem("cart");
      if (prevCartItems) {
        prevCartItems = JSON.parse(prevCartItems);
        allCartItems.push(...prevCartItems);
      }
      let index = allCartItems.findIndex((product) => {
        return product.id === action.payload.id;
      });
      allCartItems.splice(index, 1);
      state.cartItems = allCartItems;
      localStorage.setItem("cart", JSON.stringify(allCartItems));
    },
  },
});
export const { addToCart, getAllCartItems, decrementQty, removeFromCart } =
  CartSlice.actions;

export default CartSlice.reducer;
