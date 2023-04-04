import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItemCart(state: any, action: any) {
        state.cartItems = [...state.cartItems, action.payload];
    },
    removeItem(state: any, action: any) {
      state.cartItems = state.cartItems.filter((item: any) => item.id != action.payload)
  },
  updateCartItemQuantity: (state: any, action: any) => {
    const { itemId, newQuantity } = action.payload;
   
    const updatedCartItems = state.cartItems.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, qtd: newQuantity};
      }
      return item;
    })
    return { ...state, cartItems: updatedCartItems };
  },
  removeCartItem: (state: any, action: any)  => {
    const itemIdToRemove = action.payload;
    
    const updateCartItems = state.cartItems.filter((item: any) => item.id !== itemIdToRemove );
    return { ...state, cartItems: updateCartItems };
  }
  }
});

export default cartSlice.reducer;

export const { addItemCart, removeItem, updateCartItemQuantity, removeCartItem} = cartSlice.actions;