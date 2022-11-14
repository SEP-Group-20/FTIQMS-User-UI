import React, { useState } from 'react';
import { Box, Stack } from '@mui/system';
import { Alert, Button, List, ListItem, Typography } from '@mui/material';

const AdminDetails = ({userData}) => {
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
                Email
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {userData.email}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Firstname
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {userData.firstName}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Lastname
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {userData.lastName}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Mobile Number
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {userData.mobile}
              </Typography>
            </ListItem>
            {/* <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Password
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {userData.password}
              </Typography>
            </ListItem> */}
          </List>
          <Button variant="contained" color="success" onClick={()=> {window.location.reload(false)}}>
            Back
          </Button>
        </>
      }
      
    </Box>
  )
}

export default AdminDetails;