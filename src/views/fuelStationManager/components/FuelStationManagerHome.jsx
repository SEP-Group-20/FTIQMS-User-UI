import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import { Box, Stack } from '@mui/system';

const FuelStationManagerHome = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Body />
      </Stack>
    </Box>
  )
}

export default FuelStationManagerHome