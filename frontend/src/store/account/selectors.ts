import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";


export const getAccount = (state: RootState) => state.account;

export const getUser = createSelector(
    [getAccount],
    (account) => account.user
) 

export const isLoggedIn = createSelector(
    [getAccount],
    (account) => Boolean(account.user)
)