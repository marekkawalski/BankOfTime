import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

function AlreadyLoggedIn() {
  const navigate = useNavigate();
  return (
    <div>
      Already logged in
      <Button onClick={() => navigate("/")}>Home</Button>
    </div>
  );
}

export default AlreadyLoggedIn;
