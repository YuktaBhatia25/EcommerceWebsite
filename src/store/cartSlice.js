import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  totalAmount: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: function(state, action) {
      // add the product to cartList
      // add the amount in totalAmount
      return {
        ...state,
        cartList: state.cartList.concat(action.payload.product),
        totalAmount: state.totalAmount + action.payload.product.price
      };
      
    },
    removeFromCart: function(state, action) {
      // Subtract the product's amount from totalAmount
      // Make sure that totalAmount is never -ve
      return {
        ...state,
        cartList: state.cartList.filter(product => product.id !== action.payload.product.id),
        totalAmount: state.totalAmount - action.payload.product.price
      };
    },

    clearCart: function(state, action) {
      return initialState;
    }
  }
  
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;