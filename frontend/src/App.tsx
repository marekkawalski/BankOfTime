import React from "react";
import "./App.scss";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginComponent from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import { Role } from "./enums/Role";
import CreateOffer from "./pages/CreateOffer/CreateOffer";
import About from "./pages/About/About";
import AppUserSellOffers from "./pages/AppUserSellOffers/AppUserSellOffers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** Public Routes */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        {/** Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/createOffer" element={<CreateOffer />} />
          <Route path="/appUserSellOffers" element={<AppUserSellOffers />} />
        </Route>
        {/** Admin Routes */}
        <Route element={<ProtectedRoute allowedRole={Role.ADMIN} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
