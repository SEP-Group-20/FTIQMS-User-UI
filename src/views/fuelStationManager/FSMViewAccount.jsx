import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import FSMDetails from './components/FSMDetails';
    
const FSMViewAccount = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <FSMDetails />
      </Stack>
    </Box>
  );
}
export default FSMViewAccount;
  