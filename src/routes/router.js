import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// import Login from "../views/login/Login";
import AdminHome from "../views/admin/AdminHome";
import FuelStationManagerHome from "../views/fuelStationManager/components/FuelStationManagerHome";
import Fsm_ViewOrders from "../views/fuelStationManager/components/Fsm_ViewOrders";
import Login from "../pages/Layout/Login/Login";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import NoPage from "../pages/Layout/NoPage/NoPage";
import Contact from '../pages/Layout/Contact/Contact';
import RequireAuth from '../utils/requireAuth';
import {ADMIN,MANAGER} from "../utils/RolesList";
import OrderDetails from '../views/fuelStationManager/components/Fsm_ViewOrderDetails'

// ===================Temporary Routes===================
import Test_page from '../pages/testPage'
import Table from '../views/fuelStationManager/components/OderDetailsTable/index'
import Order from '../views/fuelStationManager/components/OrderDetailsCard/Order'


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/viewOrders' element={<Fsm_ViewOrders />}  />
        <Route path="/fuelStationManagerHome" element={<RequireAuth allowedRoles={[MANAGER]}> <FuelStationManagerHome /> </RequireAuth> } />
        <Route path="/adminHome" element={<RequireAuth allowedRoles={[ADMIN]}><AdminHome /></RequireAuth>} />
        <Route exact path='contact' element={<Contact />} />
        <Route exact path='unauthorized' element={<Unauthorized />} />
        <Route exact path='*' element={<NoPage />} />
        <Route exact path='testpage' element={<Test_page />} />
        <Route exact path='table' element={<Table />} />
        <Route exact path='order' element={<Order />} />
        <Route exact path='orderDetails' element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}