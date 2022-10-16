import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button/Button";
import Navbar from "../../Nabvar/Navbar";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      Home
      <Button onClick={() => navigate("/logout")}>Logout</Button>
    </div>
  );
}

export default Home;
