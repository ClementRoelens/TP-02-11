import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/authSlice";
import recipeSlice from "../components/recipeSlice";

export const store = configureStore({
    reducer : {
        auth : authSlice,
        recipes : recipeSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;