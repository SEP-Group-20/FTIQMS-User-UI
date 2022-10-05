import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';
import FuelStationManagerTable from './components/FuelstationManagerTable';
import Searchbar from './components/Searchbar'

const viewAdmins = () => {
      
  
    return (
      <Box>
        <Navbar/>
        <Stack direction="row" justifyContent="space-between">
          <Sidebar />
          
          <Body> 
            
            <Searchbar/>
            <FuelStationManagerTable/> 
        </Body>
          
        </Stack>
      </Box>
    );
}

export default viewAdmins;