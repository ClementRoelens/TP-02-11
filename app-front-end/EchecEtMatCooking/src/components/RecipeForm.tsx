import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Form from "./Form";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Ingredient } from "../models/Ingredient";
import { useAppDispatch } from "../config/hooks";
import { getOneRecipe } from "./recipeSlice";
import { Alert } from "antd";
import { Recipe } from "../models/Recipe";

function RecipeForm() {
    const dispatch = useAppDispatch();

    const [emptyInput, setEmptyInput] = useState(false);
    const [isFetchFailed, setIsFetchFailed] = useState(false);
    const [isRequestFailed, setIsRequestFailed] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    const [ingredients, setIngredients] = useState<{ ingredient: Ingredient, quantity: number }[]>([
        {
            ingredient : {
                name:"",
            },
            quantity:0
        }
    ]);
    const [steps, setSteps] = useState<string[]>([""]);

    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const prepTimeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cookTimeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    // const ingredientNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    // const ingredientQuantityRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    // const stepRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const { id } = useParams();
    const navigate = useNavigate();

    async function fetchRecipe() {
        const response: any = await dispatch(getOneRecipe(id!));
        if (response.error) {
            setTimeout(() => {
                navigate("/");
            }, 2500);
        }
    }

    useEffect(() => {
        if (id) {

        }
    }, [id])

    function recipeSubmitHandler() {
    }

    function addIngredient(){
        setIngredients(prevIngredients => [...prevIngredients,{
            ingredient : {name:""},
            quantity:0
        }]);
    }

    function writeIngredientName(e:FormEvent){
        console.log(e);
    }

    function writeIngredientQuantity(e:FormEvent){

    }

    function writeStep(e:FormEvent){

    }

    return (
        <>
            {isFetchFailed && <Alert type="error" description="Aucune recette trouvée" message="Aucune recette n'a été trouvée à partir de cet id" />}
            {isRequestFailed && <Alert type="error" description="Aucune recette trouvée" message="Aucune recette n'a été trouvée à partir de cet id" />}
            <Form submitFunction={recipeSubmitHandler}>
                <div>
                    <label htmlFor="name" className="form-label">Nom :</label>
                    <input type="text" className="form-control" id="name" required defaultValue={recipe ? recipe.name : ""} />
                </div>
                <div className="d-flex justify-content-around">
                    <div>
                        <label htmlFor="prepTime" className="form-label">Temps de préparation :</label>
                        <input type="number" className="form-control" id="prepTime" required defaultValue={recipe ? recipe.prepTime : 0} />
                    </div>
                    <div>
                        <label htmlFor="cookTime" className="form-label">Temps de cuisson :</label>
                        <input type="number" className="form-control" id="cookTime" required defaultValue={recipe ? recipe.cookTime : 0} />
                    </div>
                </div>
                <div>
                    <label className="form-label">Ingrédients : </label>
                    {ingredients.map((ingredientTotal: { ingredient: Ingredient, quantity: number }, index:number) =>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nom" 
                                required defaultValue={recipe ? ingredientTotal.ingredient.name : ""} 
                                onInput={writeIngredientName}/>
                            <span className="input-group-text">Quantité (en g)</span>
                            <input type="number" className="form-control" placeholder="Quantité" 
                                required defaultValue={recipe ? ingredientTotal.quantity : 0} 
                                onInput={writeIngredientQuantity}/>
                            <i className="bi bi-dash-circle text-danger"></i>
                        </div>
                    )}
                    <button className="btn btn-outline-success" onClick={addIngredient}><i className="bi bi-plus-circle"></i> Ajouter</button>
                </div>
                <div>
                    <label htmlFor="" className="form-label">Étapes :</label>
                    {steps.map((step: string , index:number) =>
                        <>
                            <div className="input-group">
                                <input type="text" className="form-control" required defaultValue={recipe ? step : ""} onInput={writeStep}/>
                                <i className="bi bi-dash-circle text-danger"></i>
                            </div>
                            <button className="btn btn-outline-success"><i className="bi bi-plus-circle"></i> Ajouter</button>
                        </>
                    )}
                </div>
            </Form>
        </>
    );
}

export default RecipeForm;