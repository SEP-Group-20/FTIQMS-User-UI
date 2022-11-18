import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Stack } from '@mui/system';
import Searchbar from './components/Searchbar'
import UserTable from './components/userTable';

const admin_searchUsers = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{minHeight: '100vh'}}>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" flex={1} overflow="auto">
        <Sidebar />
        <Stack direction="column" justifyContent="space-between" flex={1} overflow="auto">
          <Searchbar/>
          <UserTable/>
        </Stack>
      </Stack>
    </Box>
  );
}

export default admin_searchUsers;
  