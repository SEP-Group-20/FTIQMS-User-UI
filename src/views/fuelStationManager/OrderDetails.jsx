import React, { useState } from 'react';
import { Box, Stack } from '@mui/system';
import { Alert, Button, List, ListItem, Typography } from '@mui/material';

const OrderDetails = ({orderData}) => {
  const [errMsg, setErrMsg] = useState("");

  // display the detials of the fuel order, error messages
  return (
    <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
      {errMsg !== "" ? (
        // error
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errMsg}</Alert>
        </Stack>
      ) : 
        // if no error display the detials of the fuel order
        <>
          <List>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Fuel Order ID
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.orderID}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Fuel Delivery ID
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.deliveryID}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Fuel Station Registration Number
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.fuelStation}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Fuel
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.fuel}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Fuel Volume
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.fuelAmount} L
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Cost
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                Rs. {orderData.value}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Order Date
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.orderDate.split('T')[0]}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Delivery Date
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {orderData.deliveryDate.split('T')[0]}
              </Typography>
            </ListItem>
          </List>
          <Button variant="contained" color="success" onClick={()=> {window.location.reload(false)}}>
            Back
          </Button>
        </>
      }
      
    </Box>
  )
}

export default OrderDetails;