import { AccountBox, Home, LocalGasStation, PlaylistAddCheck } from '@mui/icons-material'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box bgcolor="#f57b51" flex={1} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon>
              <LocalGasStation />
              <PlaylistAddCheck />
            </ListItemIcon>
            <ListItemText primary="Fuel Deliveries" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon>
              <LocalGasStation />
            </ListItemIcon>
            <ListItemText primary="Fuel Status" />
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