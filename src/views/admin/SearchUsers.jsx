import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';
import Searchbar from './components/Searchbar'

const admin_searchUsers = () => {
      
  
    return (
      <Box>
        <Navbar/>
        <Stack direction="row" justifyContent="space-between">
          <Sidebar />
          
          <Body> <Searchbar/> </Body>
          
        </Stack>
      </Box>
    );
}

export default admin_searchUsers;
  