import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import FuelStatus from './components/FuelStatus';
import Topbar from './components/Topbar';
    
const FSMFuelStatus = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Topbar heading="Fuel Status" goto="/fuelStationManager/home"/>
          <FuelStatus />
        </Stack>
      </Stack>
    </Box>
  );
}
export default FSMFuelStatus;
  