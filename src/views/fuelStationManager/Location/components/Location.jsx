import { Box, Button } from "@mui/material";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getFuelStationLocation,
  setFuelStationLocation,
} from "../../../../services/FuelStationServices";
import { useAuth } from "../../../../utils/auth";
import { refreshLogin } from "../../../../services/AuthServices";
import Swal from "sweetalert2";
import Toast from "../../../../components/Toast";
import { useNavigate } from "react-router-dom";

const SRI_LANKA = {
  lat: 7.8731,
  lng: 80.7718,
};

function Location({ initPhase }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const { auth } = useAuth();
  const { user } = auth();
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState(false);

  const [center, setCenter] = useState({});
  const [clickedLocation, setClickedLocation] = useState(null);
  const [chaningState, setChangingState] = useState(initPhase);
  const [updated, setUpdated] = useState(0);

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await getFuelStationLocation(user.id);
      if (res?.data?.location) {
        setCenter({
          lat: res.data.location.Latitude,
          lng: res.data.location.Longitude,
        });
      }
    };

    fetchLocation();
  }, [updated]);

  const handleConfirm = async () => {
    setWaiting(true);
    try {
      const response = await setFuelStationLocation({
        managerId: user.id,
        location: clickedLocation,
      });
      if (response.data.success) {
        setChangingState(false);
        setClickedLocation(null);
        setUpdated(updated + 1);
        await refreshLogin();
        setWaiting(false);

        Toast.fire({
          icon: "success",
          title: "set fuel status successfully!",
        });
        if (initPhase) navigate("/fuelStationManager/home");
        // FIXME - STOP CHANGE THE UI IF WANT TO NAVIGATE
      }
    } catch (err) {
      setWaiting(false);
      Swal.fire({
        title: "Something Went Wrong!",
        text: "Try again in later..",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancel = () => {
    setChangingState(false);
    setClickedLocation(null);
  };

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={waiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoaded && <h1>Loading...</h1>}
      {isLoaded && (
        <Map
          pos={center ? center : SRI_LANKA}
          clickHandler={setClickedLocation}
          isChanging={chaningState}
        />
      )}
      {isLoaded && !chaningState && (
        <Button
          sx={{ width: "100%", marginTop: "8px" }}
          variant="contained"
          onClick={(e) => setChangingState(true)}
        >
          Set Location
        </Button>
      )}
      {chaningState && (
        <>
          {!initPhase && (
            <Button
              sx={{ width: "50%" }}
              variant="contained"
              color="error"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            sx={{ width: `${initPhase ? "100%" : "50%"}` }}
            variant="contained"
            onClick={handleConfirm}
            disabled={clickedLocation ? false : true}
          >
            Confirm
          </Button>
        </>
      )}
    </Box>
  );
}

function Map({ pos, clickHandler, isChanging }) {
  const [clicked, setClicked] = useState();

  return (
    <GoogleMap
      zoom={8}
      center={pos.lat ? pos : SRI_LANKA}
      mapContainerStyle={{ width: "100%", height: "70vh" }}
      onClick={(event) => {
        if (isChanging) {
          setClicked(event.latLng.toJSON());
          clickHandler(event.latLng.toJSON());
        }
      }}
    >
      {!isChanging && <MarkerF position={pos} />}
      {isChanging && <MarkerF position={clicked} />}
    </GoogleMap>
  );
}

export default Location;
