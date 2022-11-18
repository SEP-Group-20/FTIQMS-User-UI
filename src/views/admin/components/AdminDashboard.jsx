import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "./theme";
import { ColorModeContext, useMode } from "./theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
// import BarChart from "./BarChart"; 
import StatBox from "./StatBox";
import React, { useEffect, useState } from 'react'
import { useAuth } from "../../../utils/auth";
import { getFuelStationCount } from "../../../services/FuelStationServices";
import { getFSMCount } from "../../../services/UserService";
import { getCustomerCount } from "../../../services/UserService";
import { getFuelOrderCount, getRecentFuelOrders } from "../../../services/FuelOrderServices";


export default function Dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.colors);
    const colorMode = useMode()

    const {auth} = useAuth();

    const userEmail = auth().user.email;
    const [fsmCount, setFSMCount] = useState("");
    const [fsCount, setFSCount] = useState("");
    const [customerCount, setCustomerCount] = useState("");
    const [fuelOrderCount, setFuelOrderCount] = useState("");
    const [recentOrderDetails, setrecentOrderDetails] = useState("");


useEffect(() => {
    async function fetchAllFSMCount() {
      const fsmCount= await getFSMCount();
      setFSMCount(fsmCount.data)
    }

    fetchAllFSMCount();
  }, []);

useEffect(() => {
    async function fetchFSCount() {
      const fsCount= await getFuelStationCount();
      setFSCount(fsCount.data)
    }

    fetchFSCount();
  }, []);

  useEffect(() => {
    async function fetchCustomerCount() {
      const customerCount= await getCustomerCount();
      setCustomerCount(customerCount.data)
    }

    fetchCustomerCount();
  }, []);

  useEffect(() => {
    async function fetchFuelOrderCount() {
      const fuelOrderCount= await getFuelOrderCount();
      setFuelOrderCount(fuelOrderCount.data)
    }

    fetchFuelOrderCount();
  }, []);

  useEffect(() => {
    async function fetchRecentOrderDetails() {
      const recentOrderDetails= await getRecentFuelOrders();
      setrecentOrderDetails(recentOrderDetails.data)
    }

    fetchRecentOrderDetails();
  }, []);

console.log(recentOrderDetails);



    return(
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box m="20px">
            <Box display ="flex" justifyContent= "space-between" alignItems = "center">
                {/* <Header title="DASHBOARD" subtitle = "welcome to your dashboard" /> */}

            </Box>
            <Box 
            display = "grid"
            gridTemplateColumns= "repeat(12, 1fr)"
            gridAutoRows = "140px"
            gap = "20px">
                
                <Box gridColumn = "span 3" 
                    backgroundColor = {colors.primary[400]}
                    display = "flex"
                    alignItems = "center"
                    justifyContent= "center"
                >
                    <StatBox 
                        title = {fsCount[0]? fsCount[0].fs_count : 0}
                        subtitle= "Fuel Stations"
                        increase = "+14%"
                        icon={
                            <EvStationOutlinedIcon 
                            sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />

                </Box>
                <Box gridColumn = "span 3" 
                    backgroundColor = {colors.primary[400]}
                    display = "flex"
                    alignItems = "center"
                    justifyContent= "center"
                >
                    <StatBox 
                        title = {fsmCount[0]? fsmCount[0].fsm_count:0}
                        subtitle= "Fuel Station Managers"
                        increase = "+10%"
                        icon={
                            <SupervisedUserCircleOutlinedIcon
                            sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />

                </Box>
                <Box gridColumn = "span 3" 
                    backgroundColor = {colors.primary[400]}
                    display = "flex"
                    alignItems = "center"
                    justifyContent= "center"
                >
                    <StatBox 
                        title = {customerCount[0]? customerCount[0].customer_count:0}
                        subtitle= "Customers"
                        increase = "+60%"
                        icon={
                            <PermIdentityOutlinedIcon
                            sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />

                </Box>
                <Box gridColumn = "span 3" 
                    backgroundColor = {colors.primary[400]}
                    display = "flex"
                    alignItems = "center"
                    justifyContent= "center"
                >
                    <StatBox 
                        title = {fuelOrderCount[0]? fuelOrderCount[0].order_count:0}
                        subtitle= "Fuel Orders"
                        increase = "+9%"
                        icon={
                            <LocalShippingOutlinedIcon
                            sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />

                </Box>
            </Box>

            <Box 
            gridColumn = "span 6"
            gridRow= "span 2"
            backgroundColor = {colors.primary[600]}
            overflow= "auto"
            mt = "15px"
            >
                <Box
                    mt = "25px"
                    p = " 0 30px"
                    display = "flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom = {`4px solid ${colors.primary[500]}`}
                    colors = {colors.grey[100]}
                    
                    >
                        <Typography variant = "h5" fontWeight= "600" color = {colors.grey[100]}>
                            Recent Orders
                        </Typography>
                        
                </Box>

                {mockOrderDetails.map((order, i) =>(
                    <Box
                            key ={`${order.orderID} = ${i}`}
                            display = "flex"
                            justifyContent= "space-between"
                            alignItems = "center"
                            borderBottom = {`2px solid ${colors.primary[500]}`}
                            p="15px"
                            >

                            <Box>
                            <Typography variant = "h6" fontWeight= "600" color = {colors.greenAccent[500]}>
                            {order.orderID}
                            </Typography>
                            <Typography variant = "h6" fontWeight= "600" color = {colors.grey[100]}>
                            {order.fuelStation}
                            </Typography>
                            </Box>
                            <Box color = {colors.grey[100]} alignItems = "center"> 
                                {order.orderDate}
                            </Box>
                            <Box backgroundColor = {colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                                ${order.value}
                            </Box>
                    </Box>


                ))}

                
            </Box>
        </Box>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}

