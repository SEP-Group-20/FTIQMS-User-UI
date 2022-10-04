import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Badge, Menu, MenuItem} from '@mui/material';
import  { useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import adminTable from './AdminsTable'
import { useNavigate } from "react-router-dom";






const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
//   position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));



export default function SearchAppBar() {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
  
    const handleClick = event => {
      // 👇️ toggle shown state
      setIsShown(current => !current);
  
      // 👇️ or simply set it to true
      // setIsShown(true);
    };
    const [open, setOpen] = useState(false);
  return (

   
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Enter User Type
          </Typography>
       
          <Stack spacing={2} direction="row">
          <Search onClick={e=>setOpen(true)}>
            <SearchIconWrapper>
              <SearchIcon />
              <Button variant="text">Search Here</Button>
            </SearchIconWrapper>
            
            {/* <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}> 
              </StyledInputBase> */}
          </Search>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
       
        open={open}
        onClose={e=>setOpen(false)}

        anchorReference="anchorPosition"
  anchorPosition={{ top: 200, left: 1300 }}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
      >

        <MenuItem >
        <Button variant="text" onClick ={()=>{navigate('/admin/viewAdmins')}}> Admins</Button></MenuItem>
        <MenuItem >
        <Button variant="text" onClick ={()=>{navigate('/admin/FuelStationManagerTable')}}>Fuel Station Managers</Button></MenuItem>
      </Menu>
          </Stack>
        </Toolbar>
       
      </AppBar>
    </Box>
  );
}

