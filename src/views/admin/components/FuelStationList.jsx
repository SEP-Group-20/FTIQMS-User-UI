import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUserName } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';

const FuelStationList = () => {
  // const [username, setUsername] = useState("");

  // const {auth} = useAuth();

  // const userEmail = auth().user.email;

  // useEffect(() => {
  //   async function fetchusername() {
  //     const userDetails = await getUserName({userNIC: userEmail});
  //     setUsername(userDetails.data.user.firstName + " " + userDetails.data.user.lastName );
  //   }
  //   fetchusername();
  // }, [userEmail]);

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center"}}>
        Fuel Stations
      </Typography>
    </Box>
  )
}

export default FuelStationList