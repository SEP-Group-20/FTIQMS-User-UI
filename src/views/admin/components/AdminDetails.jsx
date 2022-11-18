import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAuth } from '../../../utils/auth';
import { Stack } from '@mui/system';
import { Alert, Divider, Modal, TextField } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { getAdminAccountDetails, resetAdminPassword } from '../../../services/UserService';

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

  const [adminDetails, setAdminDetails] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [passErrMsg, setPassErrMsg] = useState("");
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const {auth} = useAuth();
  
  const userEmail = auth().user.email; // get the NIC of the logged in admin
  
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await resetAdminPassword({userEmail: userEmail, oldPassword: oldPassword, newPassword: newPassword});
      
    if (!res.data.success)
      setPassErrMsg(res.data.message);
    else {
      setSuccess(true);
      setModalOpen(true);
      setTimeout(function () {
        setSuccess(false);
        setModalOpen(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }, 2000);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setErrMsg("");
  }, [oldPassword, newPassword, confirmNewPassword]);

  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidNewPassword(result);
    const match = newPassword === confirmNewPassword;
    setValidConfirmNewPassword(match);
  }, [newPassword, confirmNewPassword]);

  // get details of the admin
  useEffect(() => {
    async function fetchAdminDetails() {
      const adminDetails = await getAdminAccountDetails({userEmail: userEmail});
      
      if (adminDetails.data.success)
        setAdminDetails(adminDetails.data.adminDetails);
      else
        setErrMsg("Admin details retrival failed!");
    }
  
    fetchAdminDetails();
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
        ) : 
          // if no error display the detials of the admin
          <>
            <Grid container spacing={3} marginLeft={0} marginTop={0}>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                First Name
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {adminDetails.firstName}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Last Name
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {adminDetails.lastName} 
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Email
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {adminDetails.email}
              </Grid>

              <Grid item xs={12} md={4} sx={{fontSize: '1.3rem', fontWeight: 'bold'}}>
                Mobile
              </Grid>
              <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                {adminDetails.mobile}
              </Grid>

            </Grid>
            
            <Divider sx={{marginTop: 2}}/>

            <Grid container marginLeft={0} marginTop={0}>
              <Grid item xs={12} md={12} sx={{fontSize: '1.3rem', fontWeight: 'bold', marginTop: 2}}>
                Reset Password
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
                    id="oldPassword"
                    label="Old Password"
                    name="oldPassword"
                    autoComplete="oldPassword"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    margin="normal"
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    autoComplete="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    margin="normal"
                    error={!validNewPassword && newPassword ? true : false}
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    autoComplete="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    margin="normal"
                    error={!validConfirmNewPassword && confirmNewPassword ? true : false}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2}}
                    onClick={handleSubmit}
                    disabled={!oldPassword || !newPassword || !confirmNewPassword || !validNewPassword || !validConfirmNewPassword ? true : false}
                  >
                    Change Password
                  </Button>
                </Grid>
              }
            </Grid>
          </>
        }
      </Box>
    </Box>
  );
}

export default AccountDetails;
