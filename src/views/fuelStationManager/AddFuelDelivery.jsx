import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import AddFuelDeliveryForm from './components/AddFuelDeliveryForm';
import Topbar from './components/Topbar';

const AddFuelDelivery = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Topbar heading="Record Fuel Delivery" goto="/fuelStationManager/viewOrders"/>
          <AddFuelDeliveryForm />
        </Stack>
      </Stack>
    </Box>
  )
}

export default AddFuelDelivery