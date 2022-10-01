import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// import Login from "../views/login/Login";
import AdminHome from "../views/admin/AdminHome";
import FuelStationManagerHome from "../views/fuelStationManager/FuelStationManagerHome";

import Login from "../views/login/Login";
import Unauthorized from "../views/unauthorized/Unauthorized";
import NoPage from "../views/noPage/NoPage";
import Contact from '../views/contact/Contact';
import RequireAuth from '../utils/requireAuth';
import {ADMIN,MANAGER} from "../utils/RolesList";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route path="/fuelStationManagerHome" element={ <FuelStationManagerHome /> } />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route exact path='contact' element={<Contact />} />
        <Route exact path='unauthorized' element={<Unauthorized />} />
        <Route exact path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}