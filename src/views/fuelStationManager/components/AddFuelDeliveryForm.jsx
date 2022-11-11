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
import { getFuelStationRegistrationNumber } from '../../../services/FuelStationServices';
import { useAuth } from '../../../utils/auth';
import { getFuelOrderDetailsMFE, isFuelDeliveryRegistered, isFuelOrderReal, registerFuelDelivery } from "../../../services/FuelOrderServices";

const ORDERID_REGEX = /^[A-Z]{3}\d{7}$/;
const DELIVERYID_REGEX = /^[A-Z]{3}\d{7}$/;

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

function AddFuelDeliveryForm() {
  const [fuelStationRegistrationNumber, setFuelStationRegistrationNumber] = useState("");

  const {auth} = useAuth();

  const userEmail = auth().user.email;

  useEffect(() => {
    async function fetchFuelStationRegistrationNumber() {
      const registrationNumber = await getFuelStationRegistrationNumber({email: userEmail});
      setFuelStationRegistrationNumber(registrationNumber.data.registrationNumber);
    }
    fetchFuelStationRegistrationNumber();
  }, [userEmail]);

  const [orderIDStatus, setOrderIDStatus] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [orderIDValidity, setOrderIDValidity] = useState(true);

  const [deliveryIDStatus, setDeliveryIDStatus] = useState(false);
  const [deliveryID, setDeliveryID] = useState("");
  const [deliveryIDValidity, setDeliveryIDValidity] = useState(true);

  const [fuelOrderDetails, setFuelOrderDetails] = useState([]);

  const [buttonText, setButtonText] = useState("Record")

  const [checked, setChecked] = useState(true);

  const [errMsg, setErrMsg] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [orderID, deliveryID, fuelOrderDetails]);

  useEffect(() => {
    setChecked((prev) => !prev);
  }, []);

  /*This handle submit funtion is called when submit button is hit */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!orderIDStatus && !deliveryIDStatus) {
      console.log("verifying fuel order id and fuel delivery id");
      //call the api here to validate the fuel order or the fuel delivery has not been registered before
      const fuelDeliveryRegistered = await isFuelDeliveryRegistered({orderID: orderID, deliveryID: deliveryID});

      if (!fuelDeliveryRegistered.data.success) {
        // fuel order and the fuel delivery are not registered. Check for validity from MFE API
        const fuelOrderExists = await isFuelOrderReal({orderID: orderID, deliveryID: deliveryID, registrationNumber: fuelStationRegistrationNumber});

        // fuel order is registered in the Ministry of Fuel and Energy
        if (fuelOrderExists.data.success) {
          const fuelOrderDetailsMFE = await getFuelOrderDetailsMFE({orderID: orderID, deliveryID: deliveryID, registrationNumber: fuelStationRegistrationNumber});
          
          // data retrival successful
          if (fuelOrderDetailsMFE.data.success) {
            setFuelOrderDetails(fuelOrderDetailsMFE.data.fuelOrder);
            setDeliveryIDStatus(true);
            setOrderIDStatus(true);
            setButtonText("Record");
            return;            
          }
          return setErrMsg("Fuel order details retrival failed!");
        }
        return setErrMsg("Fuel order ID or fuel delivery ID is invalid!");
      }
      return setErrMsg("Entered fuel delivery is already registered in the System!");
      
    } else {
      //register the fuel station
      const resOfReg = await registerFuelDelivery({
        fuelOrderDetails,
        fuelStationRegistrationNumber
      });

      if (resOfReg.status===201){
        handleOpen();
        setTimeout(function () {
          return navigate('/fuelStationManager/viewOrders');
        }, 2000);
      } else
        setErrMsg(resOfReg.data.message);

    }
  };
  
  /*this funtion validates the orderID and returns
  true if it is valid, returns false otherwise */
  const validateOrderID = (value) => {
    return ORDERID_REGEX.test(value);
  };

  /*this funtion validates the email and returns
  true if it is valid, returns false otherwise */
  const validateDeliveryID = (value) => {
    return DELIVERYID_REGEX.test(value);
  };

  /*this function handles the changes of 
  registration number input field */
  const handleOrderIDChange = (e) => {
    setOrderID(e.target.value);
    setOrderIDValidity(validateOrderID(e.target.value));
  };

  /*this function handles the changes of 
  email input field */
  const handleDeliveryIDChange = (e) => {
    setDeliveryID(e.target.value);
    setDeliveryIDValidity(validateDeliveryID(e.target.value));
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
                    Record Fuel Delivery
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
                          Fuel Delivery successfully recorded. You will be redirected to the Fuel Deliveries page.
                        </Typography>
                      </Box>
                    </Modal>
                    <Grid container>
                      <Grid item xs>
                        <TextField
                          required
                          fullWidth
                          id="orderID"
                          label="Fuel Order ID"
                          name="orderID"
                          autoComplete="orderID"
                          disabled={orderIDStatus ? true : false}
                          onChange={handleOrderIDChange}
                          error={!orderIDValidity ? true : false}
                          autoFocus
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          id="deliveryID"
                          label="Fuel Delivery ID"
                          name="deliveryID"
                          autoComplete="deliveryID"
                          disabled={deliveryIDStatus ? true : false}
                          error={!deliveryIDValidity ? true : false}
                          onChange={handleDeliveryIDChange}
                          margin="normal"
                        />                        
                      </Grid>

                      {orderIDStatus && deliveryIDStatus ?(
                      <Grid container mt={2} spacing={2}>
                        <Grid item xs={6} md={4}>
                          <TextField
                            fullWidth
                            id="fuel"
                            label="Fuel"
                            name="fuel"
                            value={fuelOrderDetails.fuel}
                          />
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <TextField
                            fullWidth
                            id="fuelAmount"
                            label="Fuel Amount"
                            name="fuelAmount"
                            value={fuelOrderDetails.fuelAmount.toString()+" L"}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            id="value"
                            label="Fuel Value"
                            name="value"
                            value={"Rs. "+fuelOrderDetails.value.toString()}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="orderDate"
                            label="Fuel Order Date"
                            name="orderDate"
                            value={fuelOrderDetails.orderDate}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="deliveryDate"
                            label="Fuel Delivery Date"
                            name="deliveryDate"
                            value={fuelOrderDetails.deliveryDate}
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
                        (!orderIDValidity || !orderID || !deliveryIDValidity || !deliveryID)? true : false}
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

export default AddFuelDeliveryForm;
