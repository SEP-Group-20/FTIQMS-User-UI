import { AccountBox, Dashboard, Group, LocalGasStation} from '@mui/icons-material'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box bgcolor="#f57b51" position="sticky" flex={1} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/adminHome">
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
          <ListItemButton component="a" href="#">
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Registered Users" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar