import { Box, Button } from "@mui/material";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import {
  getFuelStationLocation,
  setFuelStationLocation,
} from "../../../../services/fuelStationServices";
import { useAuth } from "../../../../utils/auth";

function Location() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDiHGf2cG7mFOUa4-2AXbY4-teME8pfK8Y",
  });

  const { auth } = useAuth();
  const { user } = auth();

  const [center, setCenter] = useState({});
  const [clickedLocation, setClickedLocation] = useState(null);
  const [chaningState, setChangingState] = useState(false);
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
      // console.log(typeof(res.data.location.Latitude));
    };

    fetchLocation();
  }, [updated]);

  const handleConfirm = async () => {
    const response = await setFuelStationLocation({
      managerId: user.id,
      location: clickedLocation,
    });
    if (response.data.success) {
      setChangingState(false);
      setClickedLocation(null);
      setUpdated(updated + 1);
    }
  };

  const handleCancel = () => {
    setChangingState(false);
    setClickedLocation(null);
  };

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>
      {!isLoaded && <h1>Loading...</h1>}
      {isLoaded && (
        <Map
          pos={center}
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
          <Button
            sx={{ width: "50%", color: "red" }}
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: "50%" }}
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
      zoom={15}
      center={pos}
      mapContainerStyle={{ width: "100%", height: "95vh" }}
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
