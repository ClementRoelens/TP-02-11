import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getOneRecipe, removeRecipe } from "./recipeSlice";
import { Alert } from "antd";
import { Ingredient } from "../models/Ingredient";

function RecipeDetail() {
    const recipe = useAppSelector(state => state.recipes.selectedRecipe);
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const navigate = useNavigate();

    const [isFetchFailed, setIsFetchFailed] = useState(false);

    async function fetchRecipe() {
        const response: any = await dispatch(getOneRecipe(id!));
        if (response.error) {
            setIsFetchFailed(true);
            setTimeout(() => {
                navigate("/");
            }, 2500);
        }
    }

    async function triggerRemove() {
        await dispatch(removeRecipe(id!));
    }

    useEffect(() => {
        if (id) {
            fetchRecipe();
        }
    }, [id])

    return (
        <>
            {isFetchFailed && <Alert type="error" message="Aucune recette trouvée avec cet id" description="Aucune recette" />}
            {recipe &&
                <div className="p-3">
                    <h1 className="text-center mb-4">{recipe.name}</h1>
                    <div className="d-flex justify-content-around mb-3">
                        <div>Temps de préparation : {recipe.prepTime}</div>
                        <div>Temps de cuisson : {recipe.cookTime}</div>
                    </div>
                    <hr />
                    <div className="row py-3 px-4">
                        <div className="col-3 border-end">
                            <h3>Ingrédients : </h3>
                            <ul>
                                {recipe.ingredients.map((ingredientTotal: { ingredient: Ingredient, quantity: number }) =>
                                    <li key={ingredientTotal.ingredient.id}>{ingredientTotal.ingredient.name} ({ingredientTotal.quantity}g)</li>
                                )}
                            </ul>
                        </div>
                        <div className="col-9 ps-5">
                            <h3>Étapes :</h3>
                            <ul>
                                {recipe.steps.map((step: string) =>
                                    <li>{step}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="buttons d-flex justify-content-around pt-3 w-50 mx-auto">
                        <button className="btn btn-warning" onClick={() => navigate("/edit/" + id)}><i className="bi bi-pencil-square"></i> Editer</button>
                        <button className="btn btn-danger" onClick={triggerRemove}><i className="bi bi-trash"></i> Supprimer</button>
                    </div>
                </div>
            }
        </>
    );
}

export default RecipeDetail;