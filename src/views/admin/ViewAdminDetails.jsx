import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import AdminDetails from './components/AdminDetails';
import Searchbar from './components/Searchbar'

const viewAdminDetails = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <AdminDetails />
        </Stack>
      </Stack>
    </Box>
  );
}

export default viewAdminDetails;