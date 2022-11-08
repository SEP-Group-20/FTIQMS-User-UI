import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonGroup} from '@mui/material';
import  { useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicTable from './AdminsTable'
import FSMTable from './FuelstationManagerTable';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';




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

    const users = ["admins", "fuel station managers"]
    const [userType, setUserType] = useState('')

    // const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setUserType(event.target.value);
    };

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Select User Type
          </Typography>
       
          <Stack spacing={2} direction="row">
          {/* <Menu> */}
          <FormControl fullWidth>
         
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="User Type"
            onChange={handleChange}
          >
          {users.map(userType=> (
        <MenuItem >
        <Button variant="text" key ={userType} onClick ={()=> setUserType(userType)}>{userType}</Button></MenuItem>
        ))}
          </Select>
         
        </FormControl>
        {/* </Menu> */}
          {/* <Search onClick={e=>setOpen(true)}>
            <SearchIconWrapper>
              <SearchIcon />
              <Button variant="text">Select User Type</Button>
            </SearchIconWrapper>
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
        {users.map(userType=> (
        <MenuItem >
        <Button variant="text" key ={userType} onClick ={()=> setUserType(userType)}>{userType}</Button></MenuItem>
        ))}
      </Menu> */}
       
          </Stack>
        </Toolbar>
      </AppBar>
      
    </Box>

      {userType === "admins" && <BasicTable/>}
      {userType === "fuel station managers" && <FSMTable/>}
    </Box>
  );
}



