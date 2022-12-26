import './App.scss';

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MyNavbar from './components/Navbar/MyNavbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MyToastComponent from './components/Toast/MyToastComponent';
import { Role } from './enums/Role';
import AddCategory from './pages/Admin/AddCategory/AddCategory';
import ManageUsers from './pages/Admin/ManageUsers/ManageUsers';
import AppUserChosenOffers from './pages/AppUserChosenOffers/AppUserChosenOffers';
import AppUserOffers from './pages/AppUserOffers/AppUserOffers';
import CreateOffer from './pages/CreateOffer/CreateOffer';
import LoginComponent from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import PurchaseOffers from './pages/PurchaseOffers/PurchaseOffers';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SellOffers from './pages/SellOffers/SellOffers';
import ViewOfferDetails from './pages/ViewOfferDetails/ViewOfferDetails';
import ViewProfile from './pages/ViewProfile/ViewProfile';

function App() {
  return (
    <BrowserRouter>
      <MyToastComponent />
      <MyNavbar />
      <Routes>
        {/** Public Routes */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<RegisterPage />} />
        {/** Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/sellOffers" />} />
          <Route path="/createOffer" element={<CreateOffer />} />
          <Route path="/purchaseOffers" element={<PurchaseOffers />} />
          <Route path="/purchaseOffers/:id" element={<ViewOfferDetails />} />
          <Route path="/sellOffers" element={<SellOffers />} />
          <Route path="/sellOffers/:id" element={<ViewOfferDetails />} />
          <Route path="/appUserOffers" element={<AppUserOffers />} />
          <Route path="/appUserOffers/:id" element={<ViewOfferDetails />} />
          <Route
            path="/appUserChosenOffers"
            element={<AppUserChosenOffers />}
          />
          <Route
            path="/appUserChosenOffers/:id"
            element={<ViewOfferDetails />}
          />
        </Route>
        <Route path="/appUser" element={<ViewProfile />} />
        <Route path="/appUser/:email" element={<ViewProfile />} />
        {/** Admin Routes */}
        <Route element={<ProtectedRoute allowedRole={Role.ROLE_ADMIN} />}>
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
