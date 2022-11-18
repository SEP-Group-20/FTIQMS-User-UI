
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/auth';
import { Box, Stack } from '@mui/system';
import { Alert, Button, List, ListItem, Typography } from '@mui/material';
import { getFSMDetails } from '../../../services/UserService';

function FSMDetails() {
  const [errMsg, setErrMsg] = useState("");
  const [fsmDetails, setFSMDetails] = useState([]);

  const {auth} = useAuth();
  
  const userID = auth().user.id; 
  console.log(userID);

  useEffect(() => {
    async function fetchFSMDetails() {
      const fsmDetails = await getFSMDetails({userID: userID} );
      console.log(fsmDetails);
      if (fsmDetails.status === 200)
        setFSMDetails(fsmDetails.data);
      else
        setErrMsg("Fuel Station Manager details retrival failed!");
    }

    fetchFSMDetails();
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
                {fsmDetails.email}
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
                {fsmDetails.firstName}
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
                {fsmDetails.lastName}
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
                {fsmDetails.mobile}
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

export default FSMDetails;