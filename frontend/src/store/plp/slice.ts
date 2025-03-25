import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../interfaces/ProductProps";

export interface initialStateProp {
    query: string,
    products: ProductProps[]
}

const initialState: initialStateProp = {
    query: 'shorts',
    products: []
}

const plpSlice = createSlice({
    name: 'plpSlice',
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        }
    }
});

export type PLPState = ReturnType<typeof plpSlice.reducer>;
export const plpAction = plpSlice.actions;
export default plpSlice.reducer;