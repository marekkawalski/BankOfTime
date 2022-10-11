import React from "react";
import "./App.css";
import LoginComponent from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LogoutComponent from "./components/Logout/Logout";
import Home from "./components/pages/Home/Home";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn/AlreadyLoggedIn";
import AuthenticationService from "./services/AuthenticationService";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** Public Routes */}
        {AuthenticationService.isUserLoggedIn() ? (
          <Route path="login" element={<AlreadyLoggedIn />} />
        ) : (
          <Route path="login" element={<LoginComponent />} />
        )}
        {/** Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/logout" element={<LogoutComponent />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
