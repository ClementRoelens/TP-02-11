import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../models/User";
import { RootState } from "../config/store";

const DB_URL = "";

export const signin = createAsyncThunk(
    "users/signin",
    async (credentials: { username: string, password: string }) => {
        const response = await axios.post<{ username: string, password: string }>(`${DB_URL}/signin`, credentials);
        return {
            username: response.data.username,
            password: response.data.password
        } as User;
    }
);

export const signup = createAsyncThunk(
    "users/signup",
    async (credentials: { username: string, password: string }) => {
        const response = await axios.post<{ username: string, password: string }>(`${DB_URL}/signup`, credentials);
        return {
            username: response.data.username,
            password: response.data.password
        } as User;
    }
);

export

    const initialState = {
        user: null
    } as {
        user: User | null
    };

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        signout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }),
            builder.addCase(signin.rejected, (state, action) => {
                console.error(action.error);
            }),
            builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
            }),
            builder.addCase(signup.rejected, (state, action) => {
                console.error(action.error);
            })
    }
});

export const { signout } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state: RootState) => state.auth;