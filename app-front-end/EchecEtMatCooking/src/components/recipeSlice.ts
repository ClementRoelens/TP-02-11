import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../models/Recipe";
import axios from "axios";
import { RootState } from "../config/store";

const DB_URL = "";

export const getAllRecipes = createAsyncThunk(
    "recipes/getAll",
    async () => {
        const response = await axios.get<Recipe[]>(DB_URL);
        return response.data;
    }
);

export const getOneRecipe = createAsyncThunk(
    "recipes/getOne",
    async (id:string) => {
        const response = await axios.get<Recipe>(`${DB_URL}/${id}`);
        return response.data;
    }
);

export const createRecipe = createAsyncThunk(
    "recipes/create",
    async (newRecipe:Recipe) => {
        const response = await axios.post<Recipe>(DB_URL);
        return response.data;
    }
);
export const updateRecipe = createAsyncThunk(
    "recipes/update",
    async (updatedRecipe:Recipe) => {
        const response = await axios.put<Recipe>(`${DB_URL}/${updatedRecipe.id}`);
        return response.data;
    }
);

export const removeRecipes = createAsyncThunk(
    "recipes/getAll",
    async (id:string) => {
        const response = await axios.delete<Recipe[]>(`${DB_URL}/${id}`);
        return response.data;
    }
);


const initialState = {
    recipes:[],
    selectedRecipe:null
} as {
    recipes : Recipe[],
    selectedRecipe : Recipe | null
};

const recipeSlice = createSlice({
    name : "recipes",
    initialState:initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getAllRecipes.fulfilled, (state,action:PayloadAction<Recipe[]>) => {
            state.recipes = action.payload;
            state.selectedRecipe = null;
        }),
        builder.addCase(getAllRecipes.rejected, (state,action) => {
            console.error(action.error);
        }),
        builder.addCase(getOneRecipe.fulfilled, (state,action:PayloadAction<Recipe>) => {
            state.selectedRecipe = action.payload;
        }),
        builder.addCase(getOneRecipe.rejected, (state,action) => {
            console.error(action.error);
        }),
        builder.addCase(createRecipe.fulfilled, (state,action:PayloadAction<Recipe>) => {
            state.recipes.push(action.payload);
            state.selectedRecipe = null;
        }),
        builder.addCase(createRecipe.rejected, (state,action) => {
            console.error(action.error);
        }),
        builder.addCase(updateRecipe.fulfilled, (state,action:PayloadAction<Recipe>) => {
            state.recipes.map((recipe:Recipe) => recipe.id === action.payload.id ? action.payload : recipe);
            state.selectedRecipe = action.payload;
        }),
        builder.addCase(updateRecipe.rejected, (state,action) => {
            console.error(action.error);
        }),
        builder.addCase(removeRecipes.fulfilled, (state,action:PayloadAction<Recipe[]>) => {
            state.recipes = action.payload;
            state.selectedRecipe = null;
        }),
        builder.addCase(getAllRecipes.rejected, (state,action) => {
            console.error(action.error);
        })
    },
});

export default recipeSlice.reducer;
export const recipeSelector = (state:RootState) => state.recipes;

