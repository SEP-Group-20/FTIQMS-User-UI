import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import { Button, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import FuelStationList from './components/FuelStationList';

const FuelStations = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        {/* fuel station list */}
        <FuelStationList />
      </Stack>
      <div>
        {/* add fuel station button */}
        <Tooltip title="Add Fuel Station”" sx={{position: "fixed", bottom: 20, right: 20, background: "#ff5722", '&:hover': {backgroundColor: '#ff3c00'}}}>
          <Button variant="contained" component="a" href="/admin/registerFuelStation" startIcon={<Add />} >
            Add Fuel Station
          </Button>
        </Tooltip>
      </div>
    </Box>
  )
}

export default FuelStations