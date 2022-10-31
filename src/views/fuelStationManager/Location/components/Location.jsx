import { Box } from "@mui/material";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { getFuelStationLocation } from "../../../../services/fuelStationServices";
import { useAuth } from "../../../../utils/auth";

function Location() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDiHGf2cG7mFOUa4-2AXbY4-teME8pfK8Y",
  });

  const { auth } = useAuth();
  const { user } = auth();

  const [center, setCenter] = useState({});

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
  }, []);

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>
      {!isLoaded && <h1>Loading...</h1>}
      {isLoaded && <Map pos={center} />}
    </Box>
  );
}

function Map({ pos }) {
  // const center = useMemo(() => ({ lat: 6.274528, lng: 80.13804 }), []);

  return (
    <GoogleMap
      zoom={15}
      center={pos}
      mapContainerStyle={{ width: "100%", height: "100vh" }}
    >
      <MarkerF position={pos} />
    </GoogleMap>
  );
}

export default Location;
