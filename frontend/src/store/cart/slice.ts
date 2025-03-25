import { createSlice } from "@reduxjs/toolkit";

interface initialStateProp {
    basket: basketProductProps[],
    totalQuantity: number,
    totalPrice: number
}

interface basketProductProps {
    productId: string,
    name: string,
    smallImage: string,
    colorId?: string,
    colorName?: string,
    sizeId?: string,
    sizeName?: string,
    price: number,
    quantity: number,
    totalPrice: number,
}

const initialState: initialStateProp = {
    basket: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addProduct(state, action) {
            if (action.payload) {
                const newProduct = action.payload;
                const existingProduct = state.basket.find((product: basketProductProps) => product.productId === newProduct.productId 
                    && product.colorId === newProduct.colorId && product.sizeId === newProduct.sizeId);
                
                if (!existingProduct) {
                    state.basket.push({
                        productId: newProduct.productId,
                        name: newProduct.name,
                        smallImage: newProduct.smallImage,
                        price: Number(newProduct.price),
                        colorId: newProduct.colorId,
                        colorName: newProduct.colorName,
                        sizeId: newProduct.sizeId,
                        sizeName: newProduct.sizeName,
                        quantity: 1,
                        totalPrice: Number(newProduct.price),
                    });
                    state.totalQuantity++;
                    state.totalPrice += Number(newProduct.price);
                } else {
                    existingProduct.quantity++;
                    existingProduct.totalPrice += Number(newProduct.price);
                    state.totalPrice += Number(newProduct.price);
                }

            }
        },
        removeProduct(state, action) {
            const id = action.payload;
            const existingProduct = state.basket.find(product => product.productId === id);
            if (!existingProduct) {
                return;
            }

            if (existingProduct?.quantity === 1) {
                state.basket = state.basket.filter(product => product.productId !== id);
                state.totalPrice -= existingProduct.price;
                state.totalQuantity--;
            } else {
                existingProduct.quantity--;
                existingProduct.totalPrice -= existingProduct.price;
                state.totalPrice -= existingProduct.price;
            }
        },
        removeBasket(state) {
            state.basket = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;