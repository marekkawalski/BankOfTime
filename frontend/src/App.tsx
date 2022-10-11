import React from "react";
import "./App.css";
import LoginComponent from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LogoutComponent from "./components/Logout/Logout";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/** Protected Routes */}
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route path="" element={<LogoutComponent />} />
        </Route>
        <Route path="/home" element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        {/** Public Routes */}
        <Route path="/" element={<LoginComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
