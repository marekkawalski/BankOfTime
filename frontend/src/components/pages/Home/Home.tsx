import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      Home
      <Button onClick={() => navigate("/logout")}>Logout</Button>
    </div>
  );
}

export default Home;
