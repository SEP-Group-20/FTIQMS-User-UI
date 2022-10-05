import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import AdminHome from "../views/admin/AdminHome";
import Fsm_ViewOrders from "../views/fuelStationManager/Fsm_ViewOrders";
import RequireAuth from '../utils/requireAuth';
import {ADMIN,MANAGER} from "../utils/RolesList";
import OrderDetails from '../views/fuelStationManager/Fsm_ViewOrderDetails';
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


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/viewOrders' element={<Fsm_ViewOrders />}  />
        <Route path="/fuelStationManagerHome" element={<RequireAuth allowedRoles={[MANAGER]}> <FuelStationManagerHome /> </RequireAuth> } />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/fuelStationManagerHome" element={<RequireAuth allowedRoles={[MANAGER]}><FuelStationManagerHome /></RequireAuth>} />
        <Route path="/adminHome" element={<RequireAuth allowedRoles={[ADMIN]}><AdminHome /></RequireAuth>} />
        <Route path="/admin/fuelStations" element={<RequireAuth allowedRoles={[ADMIN]}><FuelStations /></RequireAuth>} />
        <Route path="/admin/registerFuelStation" element={<RequireAuth allowedRoles={[ADMIN]}><RegisterFuelStation /></RequireAuth>} />
        <Route exact path='contact' element={<Contact />} />
        <Route exact path='unauthorized' element={<Unauthorized />} />
        <Route exact path='*' element={<NoPage />} />
        <Route exact path='orderDetails' element={<OrderDetails />} />
        <Route exact path='admin/SearchUsers' element={<SearchUsers />} />
        <Route exact path='admin/viewAdmins' element={<ViewAdmins/>} />
        <Route exact path='admin/FuelStationManagerTable' element={<ViewFSM />} />

      </Routes>
    </BrowserRouter>
  );
}