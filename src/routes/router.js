import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Login from "../views/login/Login";
import AdminHome from "../views/admin/AdminHome";
import FuelStationManagerHome from "../views/fuelStationManager/FuelStationManagerHome";

export function Router(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/fuelStationManagerHome" element={<FuelStationManagerHome/>}/>
        <Route path="/adminHome" element={<AdminHome/>}/>
      </Routes>
    </BrowserRouter>
  );
}