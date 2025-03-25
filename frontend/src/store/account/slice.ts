import { createSlice } from "@reduxjs/toolkit";
const Cookies = require('js-cookie');

interface initialStateProp {
    user?: {
        username: string,
        token: string
    }
}

const initialState: initialStateProp = {};

const accountSlice = createSlice({
    name: 'accountSlice',
    initialState,
    reducers: {
        loginOrSignUp(state, action) {
            state.user = action.payload;

            if (action.payload.token) {
                Cookies.set('authToken', action.payload.token, { expires: 0.1 });
                Cookies.set('username', action.payload.username, { expires: 0.1 });
            }
        },
        logout(state) {
            state.user = undefined;
            Cookies.remove('authToken');
            Cookies.remove('username');
        }
    }
});

export const accountAction = accountSlice.actions;
export default accountSlice.reducer;