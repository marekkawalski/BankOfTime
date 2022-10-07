import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  function loginClicked() {
    AuthenticationService.executeBasicAuthenticationService(username, password)
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(username, password);
        console.log("Succeed");
        setShowSuccessMessage(true);
        setHasLoginFailed(false);
        navigate("/home");
      })
      .catch(() => {
        console.log("Login failed");
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        {hasLoginFailed && (
          <div className="alert alert-warning">Invalid Credentials</div>
        )}
        {showSuccessMessage && <div>Login Successful</div>}
        User Name:{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="btn btn-success" onClick={loginClicked}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginComponent;
