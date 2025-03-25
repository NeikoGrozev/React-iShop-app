import { createSlice } from "@reduxjs/toolkit";
interface initialStateProp {
    isShow: boolean,
    message: string
}

const initialState: initialStateProp = {
    isShow: false,
    message: ''
};

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        showMessage(state, action) {
            state.isShow = true;
            state.message = action.payload;
        },
        hiddenMessage(state) {
            state.isShow = false;
            state.message = '';
        }
    }
});

export const messageAction = messageSlice.actions;
export default messageSlice.reducer;