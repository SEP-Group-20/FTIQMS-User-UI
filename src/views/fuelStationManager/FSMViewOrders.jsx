import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import Table from './components/OrderDetailsTable/OrderDetails'
import { Button, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import Topbar from './components/Topbar';
    
const FSMViewOrders = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Topbar heading="Fuel Deliveries" goto="/fuelStationManager/home"/>
          <Table/>
        </Stack>
      </Stack>
      <div>
        {/* add fuel station button */}
        <Tooltip title="Record Fuel Delivery”" sx={{position: "fixed", bottom: 20, right: 20, background: "#ff5722", '&:hover': {backgroundColor: '#ff3c00'}}}>
          <Button variant="contained" component="a" href="/fuelStationManager/addFuelDelivery" startIcon={<Add />} >
            Record Fuel Delivery
          </Button>
        </Tooltip>
      </div>
    </Box>
  );
}
export default FSMViewOrders;
  