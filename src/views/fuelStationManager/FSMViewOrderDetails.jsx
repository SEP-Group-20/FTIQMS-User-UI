import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import Order from './components/OrderDetailsCard/Order';

const Fsm_ViewOrderDetails = () => {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Order/>
      </Stack>
    </Box>
  );
}

export default Fsm_ViewOrderDetails;
  