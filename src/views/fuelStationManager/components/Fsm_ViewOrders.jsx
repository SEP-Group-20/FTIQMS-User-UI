import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import { Box, Stack } from '@mui/system';
import Table from '../components/OderDetailsTable/index'


    
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
  