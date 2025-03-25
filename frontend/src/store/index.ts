import { configureStore } from "@reduxjs/toolkit";
import plp from "./plp/slice";
import pdp from "./pdp/slice";
import cart from "./cart/slice";
import account from "./account/slice";
import message from "./message/slice";

const store = configureStore({
    reducer: {
        plp,
        pdp,
        cart,
        account,
        message
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;