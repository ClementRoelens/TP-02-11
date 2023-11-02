import { Ingredient } from "./Ingredient";

export interface Recipe {
    id?: string;
    name: string;
    ingredients: { ingredient: Ingredient, quantity: number }[];
    steps : string[];
    cookTime:number;
    prepTime:number;
}
