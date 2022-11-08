import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import { Box, Stack } from '@mui/system';
import AdminsTable from './components/AdminsTable';
import Searchbar from './components/Searchbar'

const viewAdmins = () => {
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
            <AdminsTable/> 
        </Stack>
      </Box>
    );
}

export default viewAdmins;