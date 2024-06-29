import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products : [],
        quantity : 0,
        total : 0,
    },
    reducers : {
        addProduct : (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeSingleProduct: (state, action) => {
            const indexToRemove = state.products.findIndex((product) => product._id === action.payload._id);
            if (indexToRemove !== -1) {
                const removedProduct = state.products[indexToRemove];
                state.quantity -= removedProduct.quantity;
                state.total -= removedProduct.price * removedProduct.quantity;
                state.products.splice(indexToRemove, 1);
            }
        },
        removeProduct: (state) => {
            state.quantity = null;
            state.products = [];
            state.total = 0;
        },
        updateProductQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const product = state.products.find(product => product._id === productId);
            if (product) {
              const quantityDifference = quantity - product.quantity;
              state.quantity += quantityDifference;
              state.total += quantityDifference * product.price;
              product.quantity = quantity;
            }
        },
    },
});

export const { addProduct, removeSingleProduct, removeProduct, updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;