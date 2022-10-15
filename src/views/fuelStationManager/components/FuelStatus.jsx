import { Alert, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFuelDetails, getFuelStationRegistrationNumber, setFuelStatus } from '../../../services/fuelStationServices';
import { useAuth } from '../../../utils/auth';

const FuelStatus = () => {
  const [fuelDetails, setFuelDetails] = useState([]);
  const [fuelStationRegistrationNumber, setFuelStationRegistrationNumber] = useState("");
  const [fuel, setFuel] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);

  const {auth} = useAuth();

  const userEmail = auth().user.email;

  useEffect(() => {
    async function fetchFuelStationRegistrationNumber_FuelDetails() {
      const registrationNumber = await getFuelStationRegistrationNumber({email: userEmail});
      setFuelStationRegistrationNumber(registrationNumber.data.registrationNumber);
      const fuelDetails = await getFuelDetails({registrationNumber: registrationNumber.data.registrationNumber});
      if (fuelDetails.data.success)
        setFuelDetails(fuelDetails.data.fuelDetails);
      else
        setErrMsg("Fuel details retrival failed!");
    }
    fetchFuelStationRegistrationNumber_FuelDetails();
  }, [userEmail, fuel]);

  const handleClickOpen = (e) => {
    setFuel(e.target.id);
    setOpen(true);
  };

  const handleFuelUnavailableRequest = async () => {
    // send fuel unavailabe request to backend
    const result = await setFuelStatus({registrationNumber: fuelStationRegistrationNumber, fuel: fuel, status: false});
    if (result.data.success)
      console.log("success");
    else
      setErrMsg("Making fuel unavailable failed!");
    setFuel("");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // set the status of the fuel availability button
  const setDisabled = (isAvailable, isBelowThreshold) => {
    // check if fuel already unavailable or fuel is above threshold
    if (!isAvailable || !isBelowThreshold)
      return true; // fuel already unavailable or fuel is above threshold
    return false; // can make fuel unavailable
  }

  // function to get the relevant details of the fuel and create the cards for each fuel
  const fuelCards = fuelDetails.map((fuel)=>{

    const fuelType = fuel.fuelType; // get the fuel type of the fuel
    const remainingFuel = fuel.remainingFuel; // get the remaining fuel amount of the fuel
    const isAvailable = fuel.isAvailable; // get the availability status of the fuel
    const isBelowThreshold = fuel.isBelowThreshold; // get the fuel type of the fuel

    // create the card with the relevant details
    return (
      <Card variant="outlined"  sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "#f5f4f0"}} key={fuelType}>
        <CardContent sx={{ paddingBottom: 0}} >
          <Typography variant="h4" component="div">
            Fuel: {fuelType}
          </Typography>
          <Typography variant="h6">
            Remaining Fuel: {remainingFuel} L
          </Typography>
        </CardContent>
        {/* button to set the fuel availability status of a fuel*/}
        <CardActions sx={{paddingX: 2, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Fuel unavailable</Typography>
            <Switch
              id = {fuelType}
              color="success"
              checked={isAvailable}
              onClick={handleClickOpen}
              disabled={setDisabled(isAvailable, isBelowThreshold)}
              // onChange={handleChange}
            />
            <Typography>Fuel Available</Typography>
          </Stack>
        </CardActions>
      </Card>
    );

  });

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center", marginBottom: 2}}>
        Fuel Status
      </Typography>
      {errMsg !== "" ? (
        // error
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errMsg}</Alert>
        </Stack>
      ) : 
        <>
          {/* display fuel details of the fuel station in individual cards */}
          {fuelCards}
          {/* set fuel unavailable popup when the set fuel unavailabe button is clicked */}
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Is fuel Unavailable?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you set the fuel as unavilable, a fuel unavailable notification will
                be sent to the customers who are queued for that fuel.
                The fuel will be set as available when a fuel delivery is recorded.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="success" onClick={handleFuelUnavailableRequest}>Set as Unavailable</Button>
              <Button variant="contained" onClick={handleCancel} autoFocus>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      }
    </Box>
  )
}

export default FuelStatus