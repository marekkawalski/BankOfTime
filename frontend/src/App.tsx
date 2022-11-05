import './App.scss';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Role } from './enums/Role';
import About from './pages/About/About';
import AdminPage from './pages/AdminPage/AdminPage';
import AppUserSellOffers from './pages/AppUserSellOffers/AppUserSellOffers';
import CreateOffer from './pages/CreateOffer/CreateOffer';
import EditOffer from './pages/EditOffer/EditOffer';
import Home from './pages/Home/Home';
import Layout from './pages/Layout/Layout';
import LoginComponent from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import ViewOfferDetails from './pages/ViewOfferDetails/ViewOfferDetails';

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
          <Route path="/appUserSellOffers/:id" element={<EditOffer />} />
          <Route path="/offer/:id" element={<ViewOfferDetails />} />
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
