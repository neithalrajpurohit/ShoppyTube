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
      state.cartItems = allCartItems;
    },
  },
});
export const { addToCart } = CartSlice.actions;

export default CartSlice.reducer;
