import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getDashboardDetails } from '../../../services/FuelStationServices';
import { getUserName } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';

const Body = () => {
  const [username, setUsername] = useState("");
  const [dashBoardDetails, setDashBoardDetails] = useState(null);

  const {auth} = useAuth();

  const userEmail = auth().user.email;

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetails = await getUserName({userEmail: userEmail});
      setUsername(userDetails.data.user.firstName + " " + userDetails.data.user.lastName );
      const dashboardDetails = await getDashboardDetails({userEmail: userEmail});
      setDashBoardDetails(dashboardDetails.data.fuelStationDetails);
    }
    fetchUserDetails();
  }, [userEmail]);


  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center"}}>
        Welcome
      </Typography>
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center"}}>
        {username}
      </Typography>

      {dashBoardDetails !== null ? 
        <Grid container>

          <Grid item xs={12} md={6} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
            <Card variant="outlined"  sx={{margin: 1, backgroundColor: "#f5f4f0"}} key="Petrol">
              <CardContent sx={{ paddingBottom: 0}} >
                <Typography variant="h4" component="div">
                  Petrol
                </Typography>
                <Typography variant="h6">
                  Is Avaialble : {dashBoardDetails.Petrol.fuelAvailability ? "Yes" : "No"}
                </Typography>
                <Typography variant="h6">
                  Remaining : {dashBoardDetails.Petrol.remainingFuel} L
                </Typography>
                <Typography variant="h6">
                  Queue Length : {dashBoardDetails.Petrol.queuelength} Vehicles
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined"  sx={{margin: 1, backgroundColor: "#f5f4f0"}} key="Petrol">
              <CardContent>
                <Typography variant="h4" component="div">
                  Diesel
                </Typography>
                <Typography variant="h6">
                  Is Avaialble : {dashBoardDetails.Diesel.fuelAvailability ? "Yes" : "No"}
                </Typography>
                <Typography variant="h6">
                  Remaining : {dashBoardDetails.Diesel.remainingFuel} L
                </Typography>
                <Typography variant="h6">
                  Queue Length : {dashBoardDetails.Diesel.queuelength} Vehicles
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined"  sx={{margin: 1, backgroundColor: "#f5f4f0"}} key="Petrol">
              <CardContent>
              {"lastFuelDelivery" in dashBoardDetails.Petrol ? 
                <>
                  <Typography variant="h4">
                    Last Petrol Delivery
                  </Typography>
                  <Typography variant="h6">
                    Order Id : {dashBoardDetails.Petrol.lastFuelDelivery.orderID}
                  </Typography>
                  <Typography variant="h6">
                    Delivery Id : {dashBoardDetails.Petrol.lastFuelDelivery.deliveryID} 
                  </Typography>
                  <Typography variant="h6">
                    Amount : {dashBoardDetails.Petrol.lastFuelDelivery.fuelAmount} L
                  </Typography>
                  <Typography variant="h6">
                    Value : Rs. {dashBoardDetails.Petrol.lastFuelDelivery.value}
                  </Typography>
                  <Typography variant="h6">
                    Delivery Date : {dashBoardDetails.Petrol.lastFuelDelivery.deliveryDate.split("T")[0]}
                  </Typography>
                </>
                
              : 
                <Typography variant="h4">
                  No Petrol Deliveries
                </Typography>
              }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined"  sx={{margin: 1, backgroundColor: "#f5f4f0"}} key="Diesel">
              <CardContent>
              {"lastFuelDelivery" in dashBoardDetails.Diesel ? 
                <>
                  <Typography variant="h4">
                    Last Diesel Delivery
                  </Typography>
                  <Typography variant="h6">
                    Order Id : {dashBoardDetails.Diesel.lastFuelDelivery.orderID}
                  </Typography>
                  <Typography variant="h6">
                    Delivery Id : {dashBoardDetails.Diesel.lastFuelDelivery.deliveryID} 
                  </Typography>
                  <Typography variant="h6">
                    Amount : {dashBoardDetails.Diesel.lastFuelDelivery.fuelAmount} L
                  </Typography>
                  <Typography variant="h6">
                    Value : Rs. {dashBoardDetails.Diesel.lastFuelDelivery.value}
                  </Typography>
                  <Typography variant="h6">
                    Delivery Date : {dashBoardDetails.Diesel.lastFuelDelivery.deliveryDate.split("T")[0]}
                  </Typography>
                </>
                
              : 
                <Typography variant="h4">
                  No Diesel Deliveries
                </Typography>
              }
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      : null }
    </Box>
  )
}

export default Body