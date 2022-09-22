import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// import Login from "../views/login/Login";
import AdminHome from "../views/admin/AdminHome";
import FuelStationManagerHome from "../views/fuelStationManager/FuelStationManagerHome";

import Login from "../pages/Layout/Login/Login";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import NoPage from "../pages/Layout/NoPage/NoPage";
import Contact from '../pages/Layout/Contact/Contact';
import RequireAuth from '../utils/requireAuth';
import {ADMIN,MANAGER} from "../utils/RolesList";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route path="/fuelStationManagerHome" element={<RequireAuth allowedRoles={[MANAGER]}> <FuelStationManagerHome /> </RequireAuth> } />
        <Route path="/adminHome" element={<RequireAuth allowedRoles={[ADMIN]}><AdminHome /></RequireAuth>} />
        <Route exact path='contact' element={<Contact />} />
        <Route exact path='unauthorized' element={<Unauthorized />} />
        <Route exact path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}