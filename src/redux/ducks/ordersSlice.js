import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        makingOrder() {},
        createOrder(state, action) {
            state.push(action.payload)
        }
    }
})

export const { makingOrder, createOrder } = ordersSlice.actions;
export default ordersSlice.reducer;