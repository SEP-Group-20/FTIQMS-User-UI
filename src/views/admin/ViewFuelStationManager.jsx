import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import FuelStationManagerTable from './components/FuelstationManagerTable';
import Searchbar from './components/Searchbar'

const viewFuelStationManagers = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Searchbar/>
          <FuelStationManagerTable/>
        </Stack>
      </Stack>
    </Box>
  );
}

export default viewFuelStationManagers;