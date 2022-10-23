import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonGroup} from '@mui/material';
import  { useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
  // const navigate = useNavigate();
  // const [isShown, setIsShown] = useState(false);

  // const handleClick = event => {
  //   // 👇️ toggle shown state
  //   setIsShown(current => !current);

  //   // 👇️ or simply set it to true
  //   // setIsShown(true);
  // };
  const [open, setOpen] = useState(false);

  return (
    <Box bgcolor="#d1cebd">
      <ButtonGroup variant="text" aria-label="text button group" fullWidth>
        <Button sx={{backgroundColor: "white", color: "black", borderRadius: 0}} component="a" href="/admin/viewAdmins" fullWidth>Admins</Button>
        <Button sx={{backgroundColor: "white", color: "black", borderRadius: 0}} component="a" href="/admin/FuelStationManagerTable" fullWidth>Fuel Station Managers</Button>
      </ButtonGroup>

      <AppBar position="static">
        <Toolbar>
            {/* TODO: Search bar */}
            <Search onClick={e=>setOpen(true)}>
              <SearchIconWrapper>
                <SearchIcon />
                <Button variant="text">Search User...</Button>
              </SearchIconWrapper>
            </Search>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}

