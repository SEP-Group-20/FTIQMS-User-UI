import { Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PreLoginAppBar from "../../components/PreLoginAppBar";
import not_Found_img from "./404_Not_found.png";

function Nopage() {
  const navigate = useNavigate();
  return (
    <>
      <PreLoginAppBar />
      <Container maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item>
            <img src={not_Found_img} style={{ width: "100%" }} />
          </Grid>
          <Grid>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Nopage;
