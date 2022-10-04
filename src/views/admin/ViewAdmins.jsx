import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';
import AdminsTable from './components/AdminsTable';
import Searchbar from './components/Searchbar'

const viewAdmins = () => {
      
  
    return (
      <Box>
        <Navbar/>
        <Stack direction="row" justifyContent="space-between">
          <Sidebar />
          
          <Body> 
            
            <Searchbar/>
            <AdminsTable/> 
        </Body>
          
        </Stack>
      </Box>
    );
}

export default viewAdmins;