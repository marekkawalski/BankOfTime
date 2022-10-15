import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import "./Login.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { getCurrentTime } from "../utils/utils";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showA, setShowA] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AuthenticationService.logout();
  }, []);

  const toggleShowA = () => setShowA(!showA);

  const loginClicked = (): void => {
    AuthenticationService.executeBasicAuthenticationService(username, password)
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(username, password);
        console.log("Succeed");
        setShowSuccessMessage(true);
        setHasLoginFailed(false);
        navigate("/");
      })
      .catch(() => {
        console.log("Login failed");
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
        setShowA(true);
      });
  };

  return (
    <div className="login-component">
      <h1>Best Bank of time</h1>
      {hasLoginFailed && (
        <ToastContainer className="p-3" position="bottom-end">
          <Toast show={showA} onClose={toggleShowA} bg="danger">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Error</strong>
              <small>{getCurrentTime()}</small>
            </Toast.Header>
            <Toast.Body>Invalid credentials</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <div className="login-container">
        {showSuccessMessage && <div>Login Successful</div>}
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
