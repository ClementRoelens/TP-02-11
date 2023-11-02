import { useAppSelector } from "../config/hooks";
import { Recipe } from "../models/Recipe";
import RecipeThumb from "./RecipeThumb";

function RecipeList() {
    const recipes = useAppSelector(state => state.recipes.recipes);

    return (<>
        <h1>Tous les repas disponibles</h1>
        <ul className="list-group">
            {recipes.map((recipe: Recipe) =>
                <li key={recipe.id} className="list-group-item"><RecipeThumb recipe={recipe} /></li>
            )}
        </ul>
    </>
    );
}

export default RecipeList;