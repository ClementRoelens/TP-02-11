import { Ingredient } from "./Ingredient";

export interface Recipe {
    id?: string;
    title: string;
    ingredients: { ingredient: Ingredient, quantity: number }[];
    steps:string[];
    cookTime:number;
    prepTime:number;
}