import "./login.css"
import { useRef } from "react"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {

    const email = useRef()
    const password = useRef()
    const { user, isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
        );
    };
    console.log(user)

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo"> Socialize</h3>
                    <span className="loginDesc">Connect with Friends and the worldaround you on Socialize.{" "}</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required="true" ref={email}/>
                        <input placeholder="Password" type="password" className="loginInput" minLength="6" required="true" ref={password} />
                        <button className="loginButton">{isFetching ? <CircularProgress style={{'color': 'white'}} /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password</span>
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress style={{'color': 'white'}} /> : "Create a new Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
