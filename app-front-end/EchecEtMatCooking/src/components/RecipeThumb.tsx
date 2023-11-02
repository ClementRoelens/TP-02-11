import { Recipe } from "../models/Recipe";

function RecipeThumb(props:RecipeThumbInterface) {
    return (
        <button className="btn btn-outline-light">
            <h2>{props.recipe.name}</h2>
            <hr />
            <div className="d-flex justify-content-space-around">
                <div>Temps de préparation : {props.recipe.prepTime}</div>
                <div>Temps de cuisson : {props.recipe.cookTime}</div>
            </div>
        </button>
    );
}

interface RecipeThumbInterface {
    recipe:Recipe;
}

export default RecipeThumb;