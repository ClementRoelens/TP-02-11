import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { signout } from "./authSlice";

function Navbar() {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    function triggerSignout() {
        dispatch(signout());
    }

    return (
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/">EchecEtMat Cooking</Link>
                <ul className="navbar nav">
                    <li className="nav-item"><Link className="nav-link text-light" to="/add">Ajouter une recette</Link></li>
                    {user ?
                        <li className="nav-item"><Link className="nav-link text-light" to="/signin">Se connecter</Link></li>
                        :
                        <li className="nav-item"><button className="nav-link text-light" onClick={triggerSignout}>Se déconnecter</button></li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;