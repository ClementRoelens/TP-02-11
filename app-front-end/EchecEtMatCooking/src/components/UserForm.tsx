import { useRef, useState } from "react";
import { useAppDispatch } from "../config/hooks";
import Form from "./Form";
import { Alert } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signin, signup } from "./authSlice";

function UserForm() {
    const dispatch = useAppDispatch();
    
    const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [emptyInput, setEmptyInput] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);

    const navigate = useNavigate();
    const [searchparams] = useSearchParams();
    const mode = searchparams.get("mode");

    async function userSubmitHandler() {
        if (usernameRef.current.value !== "" && passwordRef.current.value !== "") {
            let response: any;
            if (mode === "signin") {
                response = await dispatch(signin({ username: usernameRef.current.value, password: passwordRef.current.value }));
            } else if (mode === "signup") {
                response = await dispatch(signup({ username: usernameRef.current.value, password: passwordRef.current.value }));
            } 
            // Les deux seuls modes autorisés sont signin et signup. On renvoie vers l'accueil si l'utilisateur tente de faire le malin
            else {
                navigate("/");
            }
            // S'il y a une erreur dans la réponse...
            if (response.error) {
                setRequestFailed(true);
            } else {
                navigate("/");
            }
        } 
        // Si un champ n'est pas rempli, on ne fait rien et on affiche un message d'erreur
        else {
            setEmptyInput(true);
        }
    }

    return (<>
        {emptyInput && <Alert message="Vous devez entrer un username et un password" type="error" description="Formulaire incomplet" />}
        {requestFailed && <Alert message="Problème avec le serveur" type="error" description="Problème avec le serveur" />}
        <Form submitFunction={userSubmitHandler}>
            <div className="mt-3">
                <label htmlFor="username" className="form-label mb-2">Username : </label>
                <input type="text" className="form-control" id="username" ref={usernameRef} required />
            </div>
            <div className="mt-3">
                <label htmlFor="password" className="form-label mb-2">Password :</label>
                <input type="password" className="form-control" id="password" ref={passwordRef} required />
            </div>
        </Form>
    </>
    );
}

export default UserForm;