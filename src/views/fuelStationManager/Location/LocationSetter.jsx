import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, Stack } from '@mui/system';
import Location from './components/Location';

const LocationSetter = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Location/>
      </Stack>
    </Box>
  )
}

export default LocationSetter;