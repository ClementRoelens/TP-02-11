import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "./Form";
import { useRef, useState } from "react";
import { Ingredient } from "../models/Ingredient";

function RecipeForm() {
    const [emptyInput, setEmptyInput] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const prepTimeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cookTimeRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [searchparams] = useSearchParams();
    const mode = searchparams.get("mode");
    const navigate = useNavigate();

    function recipeSubmitHandler() {
    }

    return (
        <>
            <Form submitFunction={recipeSubmitHandler}>
                <div>
                    <label htmlFor="name" className="form-label">Nom :</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="d-flex justify-content-around">
                    <div>
                        <label htmlFor="prepTime" className="form-label">Temps de préparation :</label>
                        <input type="number" className="form-control" id="prepTime" />
                    </div>
                    <div>
                        <label htmlFor="cookTime" className="form-label">Temps de cuisson :</label>
                        <input type="number" className="form-control" id="cookTime" />
                    </div>
                </div>
                <div>
                    <label className="form-label">Ingrédients : </label>
                    {ingredients.map((ingredient:Ingredient) => 
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nom" />
                            <span className="input-group-text">Quantité (en g)</span>
                            <input type="number" className="form-control" placeholder="Quantité" />
                            <i className="bi bi-dash-circle text-danger"></i>
                        </div>
                    )}
                    <button className="btn btn-outline-success"><i className="bi bi-plus-circle"></i> Ajouter</button>
                </div>
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input type="text" className="form-control" />
                </div>
            </Form>
        </>
    );
}

export default RecipeForm;