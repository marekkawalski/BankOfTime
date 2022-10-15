import React from "react";
import "./App.css";
import LoginComponent from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LogoutComponent from "./components/Logout/Logout";
import Home from "./components/pages/Home/Home";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import AdminPage from "./components/AdminPage/AdminPage";
import Register from "./components/Register/Register";

function App() {
  enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL",
  }
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
