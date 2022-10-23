import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import AdminHome from "../views/admin/AdminHome";
import FSMViewOrders from "../views/fuelStationManager/FSMViewOrders";
import RequireAuth from '../utils/requireAuth';
import {ADMIN,MANAGER} from "../utils/RolesList";
import SearchUsers from '../views/admin/SearchUsers';
import ViewAdmins from '../views/admin/ViewAdmins';
import ViewFSM from '../views/admin/ViewFuelStationManager';
import FuelStationManagerHome from "../views/fuelStationManager/FuelStationManagerHome";
import Login from "../views/login/Login";
import Unauthorized from "../views/unauthorized/Unauthorized";
import NoPage from "../views/noPage/NoPage";
import Contact from '../views/contact/Contact';
import RegisterAdmin from "../views/admin/RegisterAdmin";
import FuelStations from "../views/admin/FuelStations";
import RegisterFuelStation from "../views/admin/RegisterFuelStation";
import AddFuelDelivery from "../views/fuelStationManager/AddFuelDelivery";
import FSMFuelStatus from "../views/fuelStationManager/FSMFuelStatus";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />

        <Route path="/fuelStationManager/home" element={<RequireAuth allowedRoles={[MANAGER]}><FuelStationManagerHome /></RequireAuth>}/>
        <Route path='/fuelStationManager/viewOrders' element={<RequireAuth allowedRoles={[MANAGER]}><FSMViewOrders /></RequireAuth>}/>
        <Route path='/fuelStationManager/fuelStatus' element={<RequireAuth allowedRoles={[MANAGER]}><FSMFuelStatus /></RequireAuth>}/>
        <Route path='/fuelStationManager/addFuelDelivery' element={<RequireAuth allowedRoles={[MANAGER]}><AddFuelDelivery /></RequireAuth>}/>

        <Route path="/admin/home" element={<RequireAuth allowedRoles={[ADMIN]}><AdminHome /></RequireAuth>} />
        <Route path="/admin/registerAdmin" element={<RequireAuth allowedRoles={[ADMIN]}><RegisterAdmin /></RequireAuth>} />
        <Route path="/admin/fuelStations" element={<RequireAuth allowedRoles={[ADMIN]}><FuelStations /></RequireAuth>} />
        <Route path="/admin/registerFuelStation" element={<RequireAuth allowedRoles={[ADMIN]}><RegisterFuelStation /></RequireAuth>} />
        <Route path='/admin/SearchUsers' element={<RequireAuth allowedRoles={[ADMIN]}><SearchUsers /></RequireAuth>} />
        <Route path='/admin/viewAdmins' element={<RequireAuth allowedRoles={[ADMIN]}><ViewAdmins /></RequireAuth>} />
        <Route path='/admin/FuelStationManagerTable' element={<RequireAuth allowedRoles={[ADMIN]}><ViewFSM /></RequireAuth>} />

        <Route exact path='contact' element={<Contact />} />
        <Route exact path='unauthorized' element={<Unauthorized />} />
        <Route exact path='*' element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}