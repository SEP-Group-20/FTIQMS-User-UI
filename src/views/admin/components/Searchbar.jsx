import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ButtonGroup} from '@mui/material';
import  { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import viewAdmins from '../ViewAdmins';
import { useAuth } from '../../../utils/auth';



const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function SearchAppBar(props) {
 
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [viewData, setViewData] = useState(false)
  const {setuserData} = useAuth();
  const handleSearch = (val) => {
    setuserData(val);
  }


  return (
    <Box bgcolor="#d1cebd">
      <ButtonGroup variant="text" aria-label="text button group" fullWidth>
        <Button sx={{backgroundColor: "#5F9EA0", color: "black", borderRadius: 0}} component="a" href="/admin/viewAdmins" fullWidth>Admins</Button>
        <Button sx={{backgroundColor: "#5F9EA0", color: "black", borderRadius: 0}} component="a" href="/admin/fuelStationManagerTable" fullWidth>Fuel Station Managers</Button>
      </ButtonGroup>

      <Box>
        <Paper component="form" className={classes.root}>
          <MenuIcon />
          <InputBase
            className={classes.input}
            value = {value}
            placeholder="Enter User Name"
            inputProps={{ 'aria-label': 'id no.'}}
            onChange = {event=>{
                setValue(event.target.value)
                handleSearch(event.target.value)
            }}
            sx={{width: '100%'}}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search"  disabled = {viewData} onClick={() => setViewData(true)}>
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
        
          </Paper>
      </Box>

    </Box>
  );
}
	