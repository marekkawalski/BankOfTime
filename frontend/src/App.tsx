import React from "react";
import "./App.scss";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./components/pages/Home/Home";
import Layout from "./components/Layout/Layout";
import AdminPage from "./components/pages/AdminPage/AdminPage";
import LoginComponent from "./components/pages/Login/Login";
import LogoutComponent from "./components/pages/Logout/Logout";
import NotFound from "./components/pages/NotFound/NotFound";
import Register from "./components/pages/Register/Register";
import { Role } from "./enums/Role";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** Public Routes */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<Register />} />
        {/** Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/logout" element={<LogoutComponent />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole={Role.ADMIN} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
