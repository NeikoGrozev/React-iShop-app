import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const getCart = (state: RootState) => state.cart;

export const getProductInBasket = createSelector(
    [getCart],
    (cart) => cart.basket
)

export const getTotalQuantity = createSelector(
    [getCart],
    (cart) => cart.totalQuantity
)

export const getTotalPrice = createSelector(
    [getCart],
    (cart) => cart.totalPrice
)