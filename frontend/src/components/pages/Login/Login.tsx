import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import AuthenticationService from "../../../services/AuthenticationService";
import MyToastComponent from "../../Toast/MyToastComponent";
import { MyToast } from "../../../models/MyToast";
import useLogin from "../../../hooks/useLogin";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });

  useEffect(() => {
    AuthenticationService.logout();
  }, []);

  return (
    <div className="login-component">
      <MyToastComponent myToast={myToast} setMyToast={setMyToast} />
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
            <input
              type="submit"
              value="Login"
              onClick={useLogin(username, password, setMyToast)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
