import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const index = action.payload;
      const removedProduct = state.products[index];
      state.quantity -= removedProduct.quantity;
      state.total -= removedProduct.price * removedProduct.quantity;
      state.products.splice(index, 1);
    },
    cleanProduct: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, cleanProduct } = cartSlice.actions;
export default cartSlice.reducer;
