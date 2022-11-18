import { AccountBox, Dashboard, Group, LocalGasStation, PersonAddAlt} from '@mui/icons-material'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'

const FullSideBar = styled(Box)(({ theme }) => ({
  display: "none",
  backgroundColor: "#f57b51",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const IconSidebar = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#f57b51",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Sidebar = () => {
  return (
    <Box p={2} bgcolor="#f57b51">
      <Box>
        <FullSideBar>
          <List sx={{paddingY: 0}}>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/home">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/fuelStations">
                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="Fuel Stations" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/searchUsers">
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Registered Users" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/registerAdmin">
                <ListItemIcon>
                  <PersonAddAlt />
                </ListItemIcon>
                <ListItemText primary="Register Admin" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/viewAccountDetails">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="View Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </FullSideBar>

        <IconSidebar>
          <List sx={{paddingY: 0}}>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/home" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <Dashboard />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/fuelStations" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <LocalGasStation />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/searchUsers" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <Group />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/registerAdmin" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <PersonAddAlt />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/admin/viewAccountDetails" sx={{padding: 1}}>
                <ListItemIcon sx={{minWidth: "24px"}}>
                  <AccountBox />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </IconSidebar>
      </Box>
    </Box>
  )
}

export default Sidebar