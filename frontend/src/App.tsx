import './App.scss';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Role } from './enums/Role';
import About from './pages/About/About';
import AdminPage from './pages/AdminPage/AdminPage';
import AppUserPurchaseOffers from './pages/AppUserPurchaseOffers/AppUserPurchaseOffers';
import AppUserSellOffers from './pages/AppUserSellOffers/AppUserSellOffers';
import CreateOffer from './pages/CreateOffer/CreateOffer';
import Home from './pages/Home/Home';
import LoginComponent from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import PurchaseOffers from './pages/PurchaseOffers/PurchaseOffers';
import Register from './pages/Register/Register';
import SellOffers from './pages/SellOffers/SellOffers';
import ViewOfferDetails from './pages/ViewOfferDetails/ViewOfferDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/** Public Routes */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        {/** Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/createOffer" element={<CreateOffer />} />
          <Route
            path="/appUserPurchaseOffers"
            element={<AppUserPurchaseOffers />}
          />
          <Route
            path="/appUserPurchaseOffers/:id"
            element={<ViewOfferDetails />}
          />
          <Route path="/purchaseOffers" element={<PurchaseOffers />} />
          <Route path="/purchaseOffers/:id" element={<ViewOfferDetails />} />
          <Route path="/appUserSellOffers" element={<AppUserSellOffers />} />
          <Route path="/appUserSellOffers/:id" element={<ViewOfferDetails />} />
          <Route path="/sellOffers" element={<SellOffers />} />
          <Route path="/sellOffers/:id" element={<ViewOfferDetails />} />
        </Route>
        {/** Admin Routes */}
        <Route element={<ProtectedRoute allowedRole={Role.ADMIN} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
