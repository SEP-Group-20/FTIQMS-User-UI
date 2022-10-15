import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import AddFuelDeliveryForm from './components/AddFuelDeliveryForm';

const AddFuelDelivery = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <AddFuelDeliveryForm />
      </Stack>
    </Box>
  )
}

export default AddFuelDelivery