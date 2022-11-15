import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

import { loginUser } from "../../services/AuthServices";
import { useAuth } from "../../utils/auth";
import { MANAGER, ADMIN } from "../../utils/RolesList";
import PreLoginAppBar from "../../components/PreLoginAppBar";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#d63447",
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  // },
});

export default function Login() {
  const { auth, setAuth, logout } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email: email, password: pwd });

      /* */
      if (response.status === 200) {
        setAuth(response.data.accessToken);

        var home = "";
        if (auth().user.role === MANAGER) home = "/fuelStationManager/home";
        else if (auth().user.role === ADMIN) home = "/admin/home";
        else {
          throw new Error("InvalidAccountError");
          logout();
        }
        var from;
        if (location.state?.from) {
          console.log("Form: ", location.state.from);
          if (location.state?.from.startsWith("/admin")) {
            // console.log("Hi");
            from = home;
          } else from = location.state.from;
        } else {
          from = home;
        }
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Something went wrong!");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid username, password pair!");
      } else {
        setErrMsg("No server response!");
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA..")`,
        backgroundSize: "100%",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <PreLoginAppBar />
        <Container
          component="main"
          maxWidth="xs"
          xs={{
            backgroundColor: "#000000",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: `rgba(255, 255, 255, 0.8)`,
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
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
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Forgot password?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
