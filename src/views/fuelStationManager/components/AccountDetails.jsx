import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAuth } from '../../../utils/auth';
import { getFuelStationDetails, resetFSSPassword } from '../../../services/FuelStationServices';
import { Stack } from '@mui/system';
import { Alert, Divider, Modal, TextField } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { resetFSMPassword } from '../../../services/UserService';

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

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

function AccountDetails() {

  const [fuelStationDetails, setFuelStationDetails] = useState(null);
  const [oldFSMPassword, setOldFSMPassword] = useState("");
  const [newFSMPassword, setNewFSMPassword] = useState("");
  const [validNewFSMPassword, setValidNewFSMPassword] = useState(true);
  const [confirmNewFSMPassword, setConfirmNewFSMPassword] = useState("");
  const [validConfirmNewFSMPassword, setValidConfirmNewFSMPassword] = useState(true);
  const [oldFSSPassword, setOldFSSPassword] = useState("");
  const [newFSSPassword, setNewFSSPassword] = useState("");
  const [validNewFSSPassword, setValidNewFSSPassword] = useState(true);
  const [confirmNewFSSPassword, setConfirmNewFSSPassword] = useState("");
  const [validConfirmNewFSSPassword, setValidConfirmNewFSSPassword] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [passErrMsg, setPassErrMsg] = useState("");
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const {auth} = useAuth();

  const userEmail = auth().user.email;
  
  const handleOldFSMPasswordChange = (e) => {
    setOldFSMPassword(e.target.value);
  };
  
  const handleNewFSMPasswordChange = (e) => {
    setNewFSMPassword(e.target.value);
  };

  const handleConfirmNewFSMPasswordChange = (e) => {
    setConfirmNewFSMPassword(e.target.value);
  }

  const handleOldFSSPasswordChange = (e) => {
    setOldFSSPassword(e.target.value);
  };
  
  const handleNewFSSPasswordChange = (e) => {
    setNewFSSPassword(e.target.value);
  };

  const handleConfirmNewFSSPasswordChange = (e) => {
    setConfirmNewFSSPassword(e.target.value);
  }
  
  const handleFSMSubmit = async (event) => {
    event.preventDefault();

    const res = await resetFSMPassword({userEmail: userEmail, oldPassword: oldFSMPassword, newPassword: newFSMPassword});
      
    if (!res.data.success)
      setPassErrMsg(res.data.message);
    else {
      setSuccess(true);
      setModalOpen(true);
      setTimeout(function () {
        setSuccess(false);
        setModalOpen(false);
        setOldFSMPassword("");
        setNewFSMPassword("");
        setConfirmNewFSMPassword("");
        setOldFSSPassword("");
        setNewFSSPassword("");
        setConfirmNewFSSPassword("");
      }, 2000);
    }
  };

  const handleFSSSubmit = async (event) => {
    event.preventDefault();

    const res = await resetFSSPassword({userEmail: userEmail, oldPassword: oldFSSPassword, newPassword: newFSSPassword});
      
    if (!res.data.success)
      setPassErrMsg(res.data.message);
    else {
      setSuccess(true);
      setModalOpen(true);
      setTimeout(function () {
        setSuccess(false);
        setModalOpen(false);
        setOldFSMPassword("");
        setNewFSMPassword("");
        setConfirmNewFSMPassword("");
        setOldFSSPassword("");
        setNewFSSPassword("");
        setConfirmNewFSSPassword("");
      }, 2000);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setErrMsg("");
  }, [oldFSMPassword, newFSMPassword, confirmNewFSMPassword, oldFSSPassword, newFSSPassword, confirmNewFSSPassword]);

  useEffect(() => {
    const result = PWD_REGEX.test(newFSMPassword);
    setValidNewFSMPassword(result);
    const match = newFSMPassword === confirmNewFSMPassword;
    setValidConfirmNewFSMPassword(match);
  }, [newFSMPassword, confirmNewFSMPassword]);

  useEffect(() => {
    const result = PWD_REGEX.test(newFSSPassword);
    setValidNewFSSPassword(result);
    const match = newFSSPassword === confirmNewFSSPassword;
    setValidConfirmNewFSSPassword(match);
  }, [newFSSPassword, confirmNewFSSPassword]);

  // get details of the fuel station 
  useEffect(() => {
    async function fetchFuelStationDetails() {
      const fuelStationDetails = await getFuelStationDetails({userEmail: userEmail});
      
      if (fuelStationDetails.data.success)
        setFuelStationDetails(fuelStationDetails.data.fuelStationDetails);
      else
        setErrMsg("Fuel station  details retrival failed!");
    }
  
    fetchFuelStationDetails();
  }, [userEmail]);

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2} >
      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <Box sx={style}>
          <CheckCircle color="success" fontSize="large" position="center"/>
          <Typography id="registration-success" mt={1} sx={{textAlign: "center"}}>
            Password Reset successful.
          </Typography>
        </Box>
      </Modal>
      <Box bgcolor="white" flex={5} p={3} sx={{ borderRadius: '9px' }}>
        {errMsg !== "" ? (
          // error
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{errMsg}</Alert>
          </Stack>
        ) : fuelStationDetails !== null ? 

          // if no error display the detials of the fuel station
          <>
            <Grid container spacing={3} marginLeft={0} marginTop={0}>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Fuel Station Registration Number
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.registrationNumber}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Fuel Station Name
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.name} 
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Fuel Station Owner
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.ownerFirstName} {fuelStationDetails.ownerLastName}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Email
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.email}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Mobile
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.mobile}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Address
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.address.No}, {fuelStationDetails.address.StreetName}, {fuelStationDetails.address.Town}, {fuelStationDetails.address.City}, {fuelStationDetails.address.District}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Fuel Sold
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {fuelStationDetails.fuelSold.join(', ')}
              </Grid>

            </Grid>
            
            <Divider sx={{marginTop: 2}}/>

            <Grid container marginLeft={0} marginTop={0}>
              <Grid item xs={12} md={12} sx={{fontSize: '1.3rem', fontWeight: 'bold', marginTop: 2}}>
                Reset Fuel Station Manager Password
              </Grid>
              {passErrMsg !== "" ? (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{passErrMsg}</Alert>
                  </Stack>
                ) : 
                <Grid item xs>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="oldFSMPassword"
                    label="Old Fuel Station Manager Password"
                    name="oldFSMPassword"
                    autoComplete="oldFSMPassword"
                    value={oldFSMPassword}
                    onChange={handleOldFSMPasswordChange}
                    margin="normal"
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="newFSMPassword"
                    label="New Fuel Station Manager Password"
                    name="newFSMPassword"
                    autoComplete="newFSMPassword"
                    value={newFSMPassword}
                    onChange={handleNewFSMPasswordChange}
                    margin="normal"
                    error={!validNewFSMPassword && newFSMPassword ? true : false}
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="confirmNewFSMPassword"
                    label="Confirm New Fuel Station Manager Password"
                    name="confirmNewFSMPassword"
                    autoComplete="confirmNewFSMPassword"
                    value={confirmNewFSMPassword}
                    onChange={handleConfirmNewFSMPasswordChange}
                    margin="normal"
                    error={!validConfirmNewFSMPassword && confirmNewFSMPassword ? true : false}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2}}
                    onClick={handleFSMSubmit}
                    disabled={!oldFSMPassword || !newFSMPassword || !confirmNewFSMPassword || !validNewFSMPassword || !validConfirmNewFSMPassword ? true : false}
                  >
                    Change Fuel Station Manager Password
                  </Button>
                </Grid>
              }
            </Grid>

            <Grid container marginLeft={0} marginTop={0}>
              <Grid item xs={12} md={12} sx={{fontSize: '1.3rem', fontWeight: 'bold', marginTop: 2}}>
                Reset Fuel Station Staff Password
              </Grid>
              {passErrMsg !== "" ? (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{passErrMsg}</Alert>
                  </Stack>
                ) : 
                <Grid item xs>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="oldFSSPassword"
                    label="Old Fuel Station Staff Password"
                    name="oldFSSPassword"
                    autoComplete="oldFSSPassword"
                    value={oldFSSPassword}
                    onChange={handleOldFSSPasswordChange}
                    margin="normal"
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="newFSSPassword"
                    label="New Fuel Station Staff Password"
                    name="newFSSPassword"
                    autoComplete="newFSSPassword"
                    value={newFSSPassword}
                    onChange={handleNewFSSPasswordChange}
                    margin="normal"
                    error={!validNewFSSPassword && newFSSPassword ? true : false}
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="confirmNewFSSPassword"
                    label="Confirm Fuel Station Staff Password"
                    name="confirmNewFSSPassword"
                    autoComplete="confirmNewFSSPassword"
                    value={confirmNewFSSPassword}
                    onChange={handleConfirmNewFSSPasswordChange}
                    margin="normal"
                    error={!validConfirmNewFSSPassword && confirmNewFSSPassword ? true : false}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2}}
                    onClick={handleFSSSubmit}
                    disabled={!oldFSSPassword || !newFSSPassword || !confirmNewFSSPassword || !validNewFSSPassword || !validConfirmNewFSSPassword ? true : false}
                  >
                    Change Fuel Station Staff Password
                  </Button>
                </Grid>
              }
            </Grid>
          </>
        : null }
      </Box>
    </Box>
  );
}

export default AccountDetails;
