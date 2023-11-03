import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../config/hooks";
import { Recipe } from "../models/Recipe";
import RecipeThumb from "./RecipeThumb";

function RecipeList() {
    const recipes = useAppSelector(state => state.recipes.recipes);
    const navigate = useNavigate();

    return (<>
        <h1>Tous les repas disponibles</h1>
        <ul className="d-flex flex-wrap">
            {recipes.map((recipe: Recipe) =>
                <li key={recipe.id} className="li bg-dark m-2" onClick={() => navigate("/"+recipe.id)}><RecipeThumb recipe={recipe} /></li>
            )}
        </ul>
    </>
    );
}

export default RecipeList;