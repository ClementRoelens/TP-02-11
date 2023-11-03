import { Recipe } from "../models/Recipe";

function RecipeThumb(props:RecipeThumbInterface) {
    return (
        <button className="btn btn-outline-light p-4">
            <h2>{props.recipe.name}</h2>
            <hr />
            <div className="d-flex justify-content-space-around px-4">
                <div className="me-5">Préparation : {props.recipe.prepTime}m</div>
                <div>Cuisson : {props.recipe.cookTime}m</div>
            </div>
        </button>
    );
}

interface RecipeThumbInterface {
    recipe:Recipe;
}

export default RecipeThumb;