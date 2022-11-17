import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, Alert } from "@mui/material";
import PreLoginAppBar from "../../components/PreLoginAppBar";
import Tooltip from "@mui/material/Tooltip";
import config from "../../config/default";

import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { authentication } from "../../services/firebaseService";
import { useLocation } from "react-router-dom";

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const theme = createTheme();

export default function ForgotPWD() {
  const location = useLocation();

  const [emailStatus, setEmailStatus] = React.useState(false);
  const [verified, setverified] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [email, setEmail] = React.useState();

  const [pwd, setPWD] = React.useState();
  const [pwdValidity, setPWDValidity] = React.useState(true);
  const [cnfrmPWD, setCnfrmPWD] = React.useState();
  const [cnfrmValidity, setCnfrmValidity] = React.useState(true);

  React.useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setPWDValidity(result);
  }, [pwd]);

  React.useEffect(() => {
    setCnfrmValidity(pwd === cnfrmPWD);
  }, [pwd, cnfrmPWD]);

  React.useEffect(() => {
    if (!location.search) return;
    if (isSignInWithEmailLink(authentication, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email_v = window.localStorage.getItem("emailForSignIn");
      if (!email_v) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email_v = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(authentication, email_v, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          setEmail(email_v);
          setverified(true);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrMsg("");
    const data = new FormData(event.currentTarget);
    if (!emailStatus) {
      try {
        const temp_email = data.get("email");
        setEmail(temp_email);
        console.log(data.get("email"));
        //here send the email
        sendSignInLinkToEmail(
          authentication,
          temp_email,
          config.actionCodeSettings
        )
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            console.log("send success");
            window.localStorage.setItem("emailForSignIn", temp_email);
            // ...
          })
          .catch((error) => {
            console.log(error);
            // ...
          });

        setEmailStatus(true);
      } catch (err) {}
    } else {
      console.log("resetPwd here"); 
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url("https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA..")`,
          backgroundSize: "100%",
          minHeight: "100vh",
        }}
      >
        <PreLoginAppBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "15px",
              backgroundColor: `rgba(255, 255, 255, 0.8)`,
              paddingTop: "20px",
              paddingBottom: "40px",
              paddingX: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockResetIcon />
            </Avatar>
            <Typography>Forgot Password</Typography>
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
              <Grid container spacing={2} justifyContent="center">
                {!verified && (
                  <Grid item xs={10}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      disabled={emailStatus ? true : false}
                      onChange={() => setErrMsg("")}
                      autoComplete="email"
                      autoFocus
                    />
                  </Grid>
                )}

                {verified && (
                  <Grid item xs={10}>
                    <Tooltip
                      title="Password should contain at least 8 charactors with an uppercase, a lowercase, a Number, and a special symbol. "
                      placement="left-start"
                    >
                      <TextField
                        required
                        fullWidth
                        id="pwd"
                        type="password"
                        label="New Password"
                        name="password"
                        error={!pwdValidity ? true : false}
                        onChange={(e) => {
                          setPWD(e.target.value);
                          setErrMsg("");
                        }}
                        autoFocus
                      />
                    </Tooltip>
                  </Grid>
                )}
                {verified && (
                  <Grid item xs={10}>
                    <TextField
                      required
                      fullWidth
                      id="cnfrm"
                      label="Confirm Password"
                      name="confirm"
                      type="password"
                      onChange={(e) => {
                        setCnfrmPWD(e.target.value);
                        setErrMsg("");
                      }}
                      error={!cnfrmValidity ? true : false}
                    />
                  </Grid>
                )}

                <Grid item xs={10}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    disabled={
                      verified
                        ? pwdValidity && cnfrmValidity
                          ? false
                          : true
                        : false
                    }
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
