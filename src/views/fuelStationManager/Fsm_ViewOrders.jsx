import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';
import Table from './components/OderDetailsTable/index'


    
const Fsm_ViewOrders = () => {
      
  
      return (
        <Box>
          <Navbar/>
          <Stack direction="row" justifyContent="space-between">
            <Sidebar />
            
            <Body> <Table/> </Body>
            
          </Stack>
        </Box>
      );
}
export default Fsm_ViewOrders;
  