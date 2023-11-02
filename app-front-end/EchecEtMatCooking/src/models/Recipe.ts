import { Ingredient } from "./Ingredient";

export interface Recipe {
    id?: string;
    title: string;
    ingredients: { ingredientName: Ingredient, quantity: number }[];
    
}