import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Ingredient } from "../models/Ingredient";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { createRecipe, getOneRecipe, updateRecipe } from "./recipeSlice";
import { Alert } from "antd";
import { Recipe } from "../models/Recipe";

function RecipeForm() {
    const dispatch = useAppDispatch();
    const recipe = useAppSelector(state => state.recipes.selectedRecipe);

    const [emptyInput, setEmptyInput] = useState(false);
    const [isFetchFailed, setIsFetchFailed] = useState(false);
    const [isRequestFailed, setIsRequestFailed] = useState(false);

    const [ingredients, setIngredients] = useState<{ ingredient: Ingredient, quantity: number }[]>([
        {
            ingredient: {
                name: "",
            },
            quantity: 0
        }
    ]);
    const [steps, setSteps] = useState<string[]>([""]);

    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const prepTimeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cookTimeRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const { id } = useParams();
    const navigate = useNavigate();

    async function fetchRecipe() {
        const response: any = await dispatch(getOneRecipe(id!));
        if (response.error) {
            setIsFetchFailed(true);
            setTimeout(() => {
                navigate("/");
            }, 2500);
        } else {
            setIngredients(recipe!.ingredients);
            setSteps(recipe!.steps);
        }
    }

    useEffect(() => {
        if (id) {
            fetchRecipe();
        }
    }, [id])

    async function recipeSubmitHandler() {
        setEmptyInput(false);
        if (nameRef.current.value !== "" && prepTimeRef.current.value !== "" && cookTimeRef.current.value !== ""){
            // On va aussi vérifier que chaque ingrédient a un nom et une quantité différente de 0
            ingredients.forEach((ingredientTotal:{ingredient:Ingredient, quantity:number}) => {
                if (ingredientTotal.ingredient.name === "" || ingredientTotal.quantity === 0){
                    setEmptyInput(true);
                } 
            });
            // Pareil avec les steps
            steps.forEach((step:string) => {
                if (step === ""){
                    setEmptyInput(true);
                }
            });
            if (!emptyInput){
                const newRecipe:Recipe = {
                    name:nameRef.current.value,
                    prepTime:+prepTimeRef.current.value,
                    cookTime:+cookTimeRef.current.value,
                    ingredients:ingredients,
                    steps:steps
                };
                let result:any;
                // Si un id est présent, on est en mode edit et donc on lance l'update
                if (id){
                    newRecipe.id = id;
                    result = await dispatch(updateRecipe(newRecipe))
                } 
                // Sinon, on est en create
                else {
                    result = await dispatch(createRecipe(newRecipe));
                }
                if (result.error){
                    setIsRequestFailed(true);
                }
            }
        }
    }

    function addIngredient(e: FormEvent) {
        e.preventDefault();
        setIngredients(prevIngredients => [...prevIngredients, {
            ingredient: { name: "" },
            quantity: 0
        }]);
    }

    function addStep(e: FormEvent) {
        e.preventDefault();
        setSteps(prevSteps => [...prevSteps, ""]);
    }

    function writeIngredientName(e: ChangeEvent<HTMLInputElement>, index: number) {
        setIngredients(prevIngredients => {
            const ingredientsCopy = [...prevIngredients];
            ingredientsCopy[index].ingredient.name = e.target.value;
            return ingredientsCopy;
        });
    }

    function writeIngredientQuantity(e: ChangeEvent<HTMLInputElement>, index: number) {
        setIngredients(prevIngredients => {
            const ingredientsCopy = [...prevIngredients];
            ingredientsCopy[index].quantity = +e.target.value;
            return ingredientsCopy;
        })
    }

    function writeStep(e: ChangeEvent<HTMLInputElement>, index: number) {
        setSteps(prevSteps => {
            const stepsCopy = [...prevSteps];
            stepsCopy[index] = e.target.value;
            return stepsCopy;
        })
    }

    function removeIngredient(e:FormEvent,index: number) {
        e.preventDefault();
        setIngredients(prevIngredients => {
            const ingredientsCopy = [...prevIngredients];
            ingredientsCopy.splice(index, 1);
            return ingredientsCopy;
        })
    }

    function removeStep(e:FormEvent,index: number) {
        e.preventDefault();
        setSteps(prevSteps => {
            const stepsCopy = [...prevSteps];
            stepsCopy.splice(index, 1);
            return stepsCopy;
        })
    }

    return (
        <>
            {isFetchFailed && <Alert type="error" description="Aucune recette trouvée" message="Aucune recette n'a été trouvée à partir de cet id" />}
            {isRequestFailed && <Alert type="error" description="Il y a eu un problème avec le serveur" message="Il y a eu un problème avec le serveur" />}
            {emptyInput && <Alert type="error" description="Un des champs est vide" message="Un des champs est vide"/>}
            <Form submitFunction={recipeSubmitHandler}>
                <div>
                    <label htmlFor="name" className="form-label">Nom :</label>
                    <input type="text" className="form-control" id="name" required defaultValue={recipe ? recipe.name : ""} ref={nameRef}/>
                </div>
                <div className="d-flex justify-content-around mt-3">
                    <div>
                        <label htmlFor="prepTime" className="form-label">Temps de préparation :</label>
                        <input type="number" className="form-control" id="prepTime" required defaultValue={recipe ? recipe.prepTime : 0} ref={prepTimeRef}/>
                    </div>
                    <div>
                        <label htmlFor="cookTime" className="form-label">Temps de cuisson :</label>
                        <input type="number" className="form-control" id="cookTime" required defaultValue={recipe ? recipe.cookTime : 0} ref={cookTimeRef} />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="form-label">Ingrédients : </label>
                    {ingredients.map((ingredientTotal: { ingredient: Ingredient, quantity: number }, index: number) =>
                        <div className="my-1 d-flex" key={index}>
                            <div className="input-group my-1">
                                <input type="text" className="form-control w-50" placeholder="Nom"
                                    required defaultValue={recipe ? ingredientTotal.ingredient.name : ""}
                                    onChange={e => writeIngredientName(e, index)} />
                                <span className="input-group-text">Quantité (en g)</span>
                                <input type="number" className="form-control rounded-end w-25" placeholder="Quantité"
                                    required defaultValue={recipe ? ingredientTotal.quantity : 0}
                                    onChange={e => writeIngredientQuantity(e, index)} />
                            </div>
                            <button className="btn" onClick={e => removeIngredient(e,index)}><i className="bi bi-dash-circle text-danger align-self-center ms-2"></i></button>
                        </div>
                    )}
                    <button className="btn btn-outline-success d-block ms-auto me-5 mt-2" onClick={addIngredient}><i className="bi bi-plus-circle"></i> Ajouter</button>
                </div>
                <div className="mt-3">
                    <label htmlFor="" className="form-label">Étapes :</label>
                    {steps.map((step: string, index: number) =>
                        <div className="my-1 d-flex" key={index}>
                            <input type="text" className="form-control" required defaultValue={recipe ? step : ""} onChange={e => writeStep(e, index)} />
                            <button className="btn" onClick={e => removeStep(e,index)}><i className="bi bi-dash-circle text-danger align-self-center ms-2"></i></button>
                        </div>
                    )}
                    <button className="btn btn-outline-success d-block ms-auto me-5 mt-2" onClick={addStep}><i className="bi bi-plus-circle"></i> Ajouter</button>
                </div>
            </Form>
        </>
    );
}

export default RecipeForm;