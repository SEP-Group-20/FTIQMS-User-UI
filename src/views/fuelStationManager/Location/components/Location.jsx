import {Box} from '@mui/material';
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"


function Location(props) {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDiHGf2cG7mFOUa4-2AXbY4-teME8pfK8Y"
  });

  return (
    <Box bgcolor="#d1cebd" flex={5} p={2}>   
      {!isLoaded && <h1>Loading...</h1>}
      {isLoaded && <Map/>}
    </Box>
  );
}

function Map() {
  return ( 
    <GoogleMap zoom={10} center={{lat:6.9271, lng:79.8612}}  mapContainerStyle={{width:"100%",height:"100vh"}} />
   );
}


export default Location;
