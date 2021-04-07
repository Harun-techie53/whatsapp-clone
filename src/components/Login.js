import React from 'react';
import Button from '@material-ui/core/Button';
import { auth, provider } from "../firebase";
import { actionTypes } from "../Reducer";
import { useStateValue } from "../StateProvider";
import "./Login.css";

function Login() {
    const [ {}, dispatch ] = useStateValue();
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
            .then(result => dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            }))
            .catch(error => console.log(error));
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" />
                <h1>Sign In to Whatsapp</h1>
                <Button variant="contained" className="login__containerBtn" onClick={signInWithGoogle}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
