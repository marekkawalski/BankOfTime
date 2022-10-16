import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import AuthenticationService from "../../../services/AuthenticationService";
import MyToastComponent from "../../Toast/MyToastComponent";
import { MyToast } from "../../../models/MyToast";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
    title: "toast",
    background: "danger",
    message: "message",
  });

  useEffect(() => {
    AuthenticationService.logout();
  }, []);

  const loginClicked = async () => {
    try {
      const resp =
        await AuthenticationService.executeBasicAuthenticationService(
          username,
          password
        );
      console.log(resp);
      AuthenticationService.registerSuccessfulLogin(username, password);
      navigate("/");
    } catch (e: any) {
      console.log(e);
      setMyToast({
        background: "danger",
        message: e.message,
        title: "Error",
        show: true,
      });
    }
  };

  return (
    <div className="login-component">
      <MyToastComponent
        myToast={myToast}
        setMyToast={setMyToast}
      ></MyToastComponent>
      <h1>Bank of time</h1>
      <div className="login-container">
        <div className="box">
          <div className="form">
            <h2>SIGN IN</h2>
            <div className="inputBox">
              <input
                type="text"
                name="username"
                value={username}
                required
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <span>username</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <span>password</span>
              <i></i>
            </div>
            <div className="links">
              <Link to="/">Forget password</Link>
              <Link to="/register">SignUp</Link>
            </div>
            <input type="submit" value="Login" onClick={loginClicked} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
