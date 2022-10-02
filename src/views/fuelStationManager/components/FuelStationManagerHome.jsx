import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import { Box, Stack } from '@mui/system';

const FuelStationManagerHome = () => {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Body />
      </Stack>
    </Box>
  )
}

export default FuelStationManagerHome