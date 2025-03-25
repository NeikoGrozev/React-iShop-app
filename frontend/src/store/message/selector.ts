import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

const getMessageState = (state: RootState) => state.message;

export const isShowMessage = createSelector(
    [getMessageState],
    (messageState) => messageState.isShow
)

export const getMessage = createSelector(
    [getMessageState],
    (messageState) => messageState.message
)
