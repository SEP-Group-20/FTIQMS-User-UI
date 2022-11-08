import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';
import Searchbar from './components/Searchbar'

const admin_searchUsers = () => {
      
  
    return (
      <Box display="flex" flexDirection="column" sx={{ minHeight: "100vh" }}>
        <Navbar/>
        <Stack  
          direction="row" 
          justifyContent="space-between"
          flex={1}
          overflow="auto">
          <Sidebar />
          <Searchbar/>
          
        </Stack>
      </Box>
    );
}

export default admin_searchUsers;
  