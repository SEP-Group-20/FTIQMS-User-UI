import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Stack } from "@mui/system";
import Location from "./components/Location";
import Swal from "sweetalert2";
import { useAuth } from "../../../utils/auth";
import { SET_FUEL_STATUS } from "../../../utils/ManagerStatuses";

const LocationSetter = () => {
  const { user } = useAuth().auth();

  if (user.status === SET_FUEL_STATUS) {
    Swal.fire({
      title: "Set Fuel Station Location",
      text: "You should select the Fuel station location on the map and hit confirm before carrying out any operation!",
      icon: "info",
      confirmButtonText: "Cool",
    });
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Stack
        direction="row"
        justifyContent="space-between"
        flex={1}
        overflow="auto"
      >
        <Sidebar />
        <Location initPhase={(user.status === SET_FUEL_STATUS)?true:false}/>
      </Stack>
    </Box>
  );
};

export default LocationSetter;
