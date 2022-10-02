import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import { Box, Stack } from '@mui/system';
import Order from './OrderDetailsCard/Order';



const Fsm_ViewOrderDetails = () => {
      
  
    return (
      <Box>
        <Navbar/>
        <Stack direction="row" justifyContent="space-between">
          <Sidebar />
          
          <Body> <Order/> </Body>
          
        </Stack>
      </Box>
    );
}

export default Fsm_ViewOrderDetails;
  