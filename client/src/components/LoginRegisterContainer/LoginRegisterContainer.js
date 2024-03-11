// import logo from "./logo.svg";
import "./LoginRegisterContainer.scss";
import Login from "../Login/Login"
import logo from "../../E-Cart.png"
import Register from "../Register/Register";
import { useState } from "react";

function LoginRegisterContainer(props) {
    const [isRegisterUser, setRegisteredUser] = useState(true)
    const navigateToLoginPage = () => {
        setRegisteredUser(true);
    };

    const navigateToRegisterPage = () => {
        setRegisteredUser(false);
    };
    return (
        <div className="login-Register-container">
            <div className="form-container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                {isRegisterUser ? (
                    <Login navigateToRegisterPage={navigateToRegisterPage} setUserAuthenticatedStatus={props.setUserAuthenticatedStatus} />
                ) : (
                    <Register navigateToLoginPage={navigateToLoginPage} />
                )}
            </div>
        </div>
    );
}

export default LoginRegisterContainer;
