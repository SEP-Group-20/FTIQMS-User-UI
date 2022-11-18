import {
  AccountBox,
  LocationOn,
  Home,
  LocalGasStation,
  PlaylistAddCheck,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

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
          <List sx={{ paddingY: 0 }}>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/fuelStationManager/home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/fuelStationManager/viewOrders"
              >
                <ListItemIcon>
                  <LocalGasStation />
                  <PlaylistAddCheck />
                </ListItemIcon>
                <ListItemText primary="Fuel Deliveries" />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/fuelStationManager/fuelStatus"
              >
                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="Fuel Status" />
              </ListItemButton>
            </ListItem>
            {/* element for the location setting */}
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/fuelStationManager/location">
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="Location" />
              </ListItemButton>
            </ListItem>
            {/* end of location link */}
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/fuelStationManager/viewAccount">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="View Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </FullSideBar>

        <IconSidebar>
          <List sx={{ paddingY: 0 }}>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/fuelStationManager/home"
                sx={{ padding: 1 }}
              >
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <Home />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/fuelStationManager/viewOrders"
                sx={{ padding: 1 }}
              >
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <LocalGasStation />
                  <PlaylistAddCheck />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/fuelStationManager/fuelStatus"
                sx={{ padding: 1 }}
              >
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <LocalGasStation />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {/* starting of location */}
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/fuelStationManager/location"
                sx={{ padding: 1 }}
              >
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <LocationOn />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {/* ending of location */}
            <Divider component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/fuelStationManager/viewAccount" sx={{ padding: 1 }}>
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <AccountBox />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </IconSidebar>
      </Box>
    </Box>
  );
};

export default Sidebar;
