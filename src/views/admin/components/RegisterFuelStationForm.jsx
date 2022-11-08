import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CheckCircle, LocalGasStation } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Alert, Modal, Stack } from "@mui/material";
import { getFuelStationDetailsMFE, isFuelStationReal, isFuelStationRegistered, registerFuelStation } from "../../../services/FuelStationServices";
import { isEmailRegistered } from "../../../services/UserService";

const REGISTRATION_REGEX = /^[A-Z]{3}\d{7}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "#E8FFEA",
  border: '4px solid green',
  boxShadow: 24,
  borderRadius: '25px',
  p: 2,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const theme = createTheme();

function RegisterFuelStationForm() {

  const [registrationNumberStatus, setRegistrationNumberStatus] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [registrationNumberValidity, setRegistrationNumberValidity] = useState(true);

  const [emailStatus, setemailStatus] = useState(false);
  const [email, setemail] = useState("");
  const [emailValidity, setemailValidity] = useState(true);

  const [fuelStationDetails, setFuelStationDetails] = useState([]);

  const [buttonText, setButtonText] = useState("Verify")

  const [checked, setChecked] = useState(true);

  const [errMsg, setErrMsg] = React.useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [registrationNumber, email, fuelStationDetails]);

  useEffect(() => {
    setChecked((prev) => !prev);
  }, []);

  /*This handle submit funtion is called when submit button is hit */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!registrationNumberStatus && !emailStatus) {
      console.log("verifying registration number and email");
      //call the api here to validate the fuel station or the email has not been registered before
      const fuelStationRegistered = await isFuelStationRegistered({ registrationNumber: registrationNumber});
      const emailRegistered = await isEmailRegistered({ email: email });

      if (fuelStationRegistered.data.success && !emailRegistered.data.success) {
        // fuel station and email are not registered. Check for validity from MFE API
        const fuelStationExists = await isFuelStationReal({ registrationNumber: registrationNumber});

        // fuel station is registered in the Ministry of Fuel and Energy
        if (fuelStationExists.data.success) {
          const fuelStationDetailsMFE = await getFuelStationDetailsMFE({registrationNumber: registrationNumber});

          // data retrival successful
          if (fuelStationDetailsMFE.data.success) {
            setFuelStationDetails(fuelStationDetailsMFE.data.fuelStation);
            setRegistrationNumberStatus(true);
            setemailStatus(true);
            setButtonText("Register");
            return;            
          }
          return setErrMsg("Fuel Station details retrival failed!");
        }
        return setErrMsg("Registration number is invalid!");
      }
      return setErrMsg("Entered fuel station or email is already registered in the System!");
      
    } else {
      //register the fuel station
      const resOfReg = await registerFuelStation({
        registrationNumber,
        email,
        fuelStationDetails
      });

      if (resOfReg.status===201){
        handleOpen();
        setTimeout(function () {
          return navigate('/admin/fuelStations');
        }, 2000);
      } else {
        setErrMsg("Fuel Station Registration Failed");
        // setRegistrationNumberStatus(false);
        // setemailStatus(false);
        // setOTPStatus(false);        
      }

    }
  };
  
  /*this funtion validates the registration number and returns
  true if it is valid, returns false otherwise */
  const validateRegistrationNumber = (value) => {
    return REGISTRATION_REGEX.test(value);
  };

  /*this funtion validates the email and returns
  true if it is valid, returns false otherwise */
  const validateEmail = (value) => {
    return EMAIL_REGEX.test(value);
  };

  /*this function handles the changes of 
  registration number input field */
  const handleRegistrationNumberChange = (e) => {
    setRegistrationNumber(e.target.value);
    setRegistrationNumberValidity(validateRegistrationNumber(e.target.value));
  };

  /*this function handles the changes of 
  email input field */
  const handleEmailChange = (e) => {
    setemail(e.target.value);
    setemailValidity(validateEmail(e.target.value));
  };

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Box bgcolor="#f5f4f0" flex={5} p={3} sx={{ borderRadius: '9px' }}>
        <Slide
          direction={checked ? "up" : "down"}
          in={checked}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LocalGasStation />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Register Fuel Station
                  </Typography>
                  {errMsg !== "" ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errMsg}</Alert>
                    </Stack>
                  ) : null}
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 0 }}
                  >
                    <Modal
                      open={open}
                      onClose={handleClose}
                    >
                      <Box sx={style}>
                        <CheckCircle color="success" fontSize="large" position="center"/>
                        <Typography id="registration-success" mt={1} sx={{textAlign: "center"}}>
                          Fuel Station registration successful. You will be redirected to the Fuel Stations page.
                        </Typography>
                      </Box>
                    </Modal>
                    <Grid container>
                      <Grid item xs>
                        <TextField
                          required
                          fullWidth
                          id="registrationNumber"
                          label="Registration Number"
                          name="registrationNumber"
                          autoComplete="registrationNumber"
                          disabled={registrationNumberStatus ? true : false}
                          onChange={handleRegistrationNumberChange}
                          error={!registrationNumberValidity ? true : false}
                          autoFocus
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          disabled={emailStatus ? true : false}
                          error={!emailValidity ? true : false}
                          onChange={handleEmailChange}
                          margin="normal"
                        />                        
                      </Grid>

                      {registrationNumberStatus && emailStatus ?(
                      <Grid container mt={2} spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="name"
                            label="Fuel Station Name"
                            name="name"
                            value={fuelStationDetails.name}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="owner"
                            label="Fuel Station Owner"
                            name="owner"
                            value={fuelStationDetails.ownerFName + " "+ fuelStationDetails.ownerLName}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="mobileNumber"
                            label="Fuel Station Phone Number"
                            name="mobileNumber"
                            value={fuelStationDetails.mobileNumber}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            maxRows={5}
                            id="address"
                            label="Fuel Station Address"
                            name="address"
                            value={
                              fuelStationDetails.address.No+"\n"+
                              fuelStationDetails.address.StreetName+"\n"+
                              fuelStationDetails.address.Town+"\n"+
                              fuelStationDetails.address.City+"\n"+
                              fuelStationDetails.address.District
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="fuelSold"
                            label="Fuel Types Sold"
                            name="fuelSold"
                            value={fuelStationDetails.fuelSold.join(", ")}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="petrolPumps"
                            label="Number of Petrol Fuel Pumps"
                            name="petrolPumps"
                            value={fuelStationDetails.fuelPumps.Petrol}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="dieselPumps"
                            label="Number of Diesel Fuel Pumps"
                            name="dieselPumps"
                            value={fuelStationDetails.fuelPumps.Diesel}
                          />
                        </Grid>
                      </Grid>
                      ):null}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      disabled={
                        (!registrationNumberValidity || !registrationNumber || !emailValidity || !email)? true : false}
                    >
                      {buttonText}
                    </Button>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          </div>
        </Slide>
      </Box>
    </Box>
  );
}

export default RegisterFuelStationForm;
