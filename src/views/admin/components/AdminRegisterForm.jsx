import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { registerAdmin } from "../../../services/UserService";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NAME_REGEX = /^[a-z ,.'-]+$/i;

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
        Our Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const AdminRegisterForm = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = React.useState("");
  const [emailErr, setEmailError] = React.useState(false);
  const [fNameErr, setFNameErr] = React.useState(false);
  const [lNameErr, setLNameErr] = React.useState(false);

  const validateAdminDetails = (email, firstName, lastName) => {
    if (!EMAIL_REGEX.test(email)) {
      setErrMsg("Input valid email address!");
      setEmailError(true);
      return false;
    } else if (!NAME_REGEX.test(firstName)) {
      setErrMsg("Input valid first Name");
      setFNameErr(true);
      return false;
    } else if (!NAME_REGEX.test(lastName) && !(lastName === "")) {
      setErrMsg("Input valid last Name");
      setLNameErr(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrMsg("");
    const data = new FormData(event.currentTarget);
    const validity = validateAdminDetails(
      data.get("email"),
      data.get("firstName"),
      data.get("lastName")
    );
    if (validity) {
      try {
        const response = await registerAdmin({
          email: data.get("email"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
        });
        if (response.status === 201) {
          navigate("/admin/home", { replace: true });
          return;
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server response!");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Input fields");
        } else if (err.response?.status === 401) {
          if (err.response.data?.message === "EmailAlreadyRegistered")
            setErrMsg("Entered Email has already been registered!");
          else setErrMsg("You're not authorized!");
        } else {
          setErrMsg("Task failed! try again!");
        }
      }
    }
  };

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>
      <Box bgcolor="#f5f4f0" flex={5} p={3} sx={{ borderRadius: '9px' }}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                REGISTER NEW ADMIN
              </Typography>
              {errMsg != "" ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errMsg}</Alert>
                </Stack>
              ) : null}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailErr ? true : false}
                  onChange={() => {
                    setErrMsg("");
                    setEmailError(false);
                  }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  type="name"
                  id="firstName"
                  error={fNameErr ? true : false}
                  onChange={() => {
                    setErrMsg("");
                    setFNameErr(false);
                  }}
                  autoComplete="name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="name"
                  id="lastName"
                  error={lNameErr ? true : false}
                  onChange={() => {
                    setErrMsg("");
                    setLNameErr(false);
                  }}
                  autoComplete="name"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  CONFIRM
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default AdminRegisterForm;
