import { FormEvent, ReactNode } from "react";

function Form(props:FormInterface) {

    function submitHandler(e:FormEvent){
        e.preventDefault();
        props.submitFunction();
    }

    return (
        <form action="" onSubmit={submitHandler}>
            {props.children}
            <button type="submit" className="btn btn-outline-light d-block mx-auto">Valider</button>
        </form>
    );
}

interface FormInterface {
    children:ReactNode;
    submitFunction : () => void;
}

export default Form;