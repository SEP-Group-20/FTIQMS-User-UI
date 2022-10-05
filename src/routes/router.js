import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import AdminHome from "../views/admin/AdminHome";
import FuelStationManagerHome from "../views/fuelStationManager/FuelStationManagerHome";
import Login from "../views/login/Login";
import Unauthorized from "../views/unauthorized/Unauthorized";
import NoPage from "../views/noPage/NoPage";
import Contact from '../views/contact/Contact';
import RequireAuth from '../utils/requireAuth';
import {ADMIN,MANAGER} from "../utils/RolesList";
import RegisterAdmin from "../views/admin/RegisterAdmin";
import FuelStations from "../views/admin/FuelStations";
import RegisterFuelStation from "../views/admin/RegisterFuelStation";


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/fuelStationManagerHome" element={<RequireAuth allowedRoles={[MANAGER]}><FuelStationManagerHome /></RequireAuth>} />
        <Route path="/adminHome" element={<RequireAuth allowedRoles={[ADMIN]}><AdminHome /></RequireAuth>} />
        <Route path="/admin/fuelStations" element={<RequireAuth allowedRoles={[ADMIN]}><FuelStations /></RequireAuth>} />
        <Route path="/admin/registerFuelStation" element={<RequireAuth allowedRoles={[ADMIN]}><RegisterFuelStation /></RequireAuth>} />

        <Route exact path='contact' element={<Contact />} />
        <Route exact path='unauthorized' element={<Unauthorized />} />
        <Route exact path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}