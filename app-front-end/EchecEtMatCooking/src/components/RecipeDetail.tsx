import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getOneRecipe } from "./recipeSlice";
import { Alert } from "antd";
import { Ingredient } from "../models/Ingredient";

function RecipeDetail() {
    const recipe = useAppSelector(state => state.recipes.selectedRecipe);
    const dispatch = useAppDispatch();

    const {id} = useParams();
    const navigate = useNavigate();

    const [isFetchFailed,setIsFetchFailed] = useState(false);

    async function fetchRecipe(){
        const response:any = await dispatch(getOneRecipe(id!));
        if (response.error){
            setIsFetchFailed(true);
            setTimeout(() => {
                navigate("/");
            },2500);
        }
    }

    useEffect(() => {
        if (id){
            fetchRecipe();
        }
    },[id])

    return (
        <>
        {isFetchFailed && <Alert type="error" message="Aucune recette trouvée avec cet id" description="Aucune recette"/>}
        {recipe && 
        <>
        <h1>{recipe.name}</h1>
        <div className="d-flex justify-content-around">
            <div>Temps de préparation : {recipe.prepTime}</div>
            <div>Temps de cuisson : {recipe.cookTime}</div>
        </div>
        <hr />
        <div className="row">
            <div className="col-4">
                <h3>Ingrédients : </h3>
                <ul>
                {recipe.ingredients.map((ingredientTotal:{ingredient : Ingredient, quantity : number}) => 
                    <li key={ingredientTotal.ingredient.id}>{ingredientTotal.ingredient.name} ({ingredientTotal.quantity}g)</li>
                )}
                </ul>
            </div>
            <div className="col-8">
                <h3>Étapes :</h3>
                <ul>
                    {recipe.steps.map((step:string) => 
                    <li>{step}</li>
                    )}
                </ul>
            </div>
        </div>
        </>
        }
        </>
    );
}

export default RecipeDetail;