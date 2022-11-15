
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/auth';
import { Box, Stack } from '@mui/system';
import { Alert, Button, List, ListItem, Typography } from '@mui/material';
import { getAdminDetails } from '../../../services/UserService';

function AdminDetails() {
  const [errMsg, setErrMsg] = useState("");
  const [adminDetails, setAdminDetails] = useState([]);

  const {auth} = useAuth();
  
  const userID = auth().user.id; 
  console.log(userID);

  useEffect(() => {
    async function fetchAdminDetails() {
      const adminDetails = await getAdminDetails({userID: userID} );
      console.log(adminDetails);
      if (adminDetails.status === 200)
        setAdminDetails(adminDetails.data);
      else
        setErrMsg("Admin details retrival failed!");
    }

    fetchAdminDetails();
  }, [userID]); //Runs everytime the userID changes

  // display the detials of the fuel order, error messages
  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
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
                {adminDetails.email}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                First Name
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {adminDetails.firstName}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6' display="inline" width="50%" mr={2}>
                Last Name
              </Typography>
              <Typography variant='h6' display="inline">
                :
              </Typography>
              <Typography display="inline" ml={2}>
                {adminDetails.lastName}
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
                {adminDetails.mobile}
              </Typography>
            </ListItem>
          </List>
          <Button variant="contained" color="success" onClick={()=> {window.location.reload(false)}}>
            Back
          </Button>
        </>
      }
      
    </Box>
    </Box>
  )
}

export default AdminDetails;