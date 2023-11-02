import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RecipeList from "../components/RecipeList";
import RecipeForm from "../components/RecipeForm";
import RecipeDetail from "../components/RecipeDetail";
import UserForm from "../components/UserForm";

const router = createBrowserRouter([
    {path:"/" , element : <App/>, children : [
        {path:"/", element : <RecipeList/>},
        {path : "/:id", element : <RecipeDetail/>},
        {path:"/add", element : <RecipeForm/>},
        {path:"edit/:id", element:<RecipeForm/>},
        {path:"/signin", element : <UserForm/>},
        // {path:"/signup", element : <UserForm/>}
    ]}
]);

export default router;