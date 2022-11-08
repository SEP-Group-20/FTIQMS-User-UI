import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../../../../utils/auth';
import { getAllFuelDeliveryDetails } from '../../../../services/FuelStationServices';
import OrderDetails from '../../OrderDetails';

function createData(deliveryDate, deliveryID, fuel, fuelAmount, fuelStation, orderDate, orderID, value) {
  return {deliveryDate, deliveryID, fuel, fuelAmount, fuelStation, orderDate, orderID, value};
}

export default function BasicTable() {
  const [dataview, setDataView] = useState(false)
  const [itemdata, setItemData] = useState({})
  const [fuelDeliveryDetials, setFuelDeliveryDetails] = useState([])
  const [errMsg, setErrMsg] = useState("");

  const {auth} = useAuth();

  const userEmail = auth().user.email;

  // get details of all the registered fuel deliveries of the fuel station
  useEffect(() => {
    async function fetchAllFuelDeliveryDetails() {
      const allFuelDeliveryDetails = await getAllFuelDeliveryDetails({userEmail: userEmail});
      
      if (allFuelDeliveryDetails.data.success)
        setFuelDeliveryDetails(allFuelDeliveryDetails.data.allFuelDeliveryDetails);
      else
        setErrMsg("Fuel delivery details retrival failed!");
    }

    fetchAllFuelDeliveryDetails();
  }, [userEmail]);

  const rows = [];

  fuelDeliveryDetials.forEach((fuelDelivery) => {
    const {deliveryDate, deliveryID, fuel, fuelAmount, fuelStation, orderDate, orderID, value} = fuelDelivery
    rows.push(createData(deliveryDate, deliveryID, fuel, fuelAmount, fuelStation, orderDate, orderID, value))
  });

  const handleClick = (value) =>{
    setItemData(value)
    setDataView(true)
  };
  
  return (
    <Box bgcolor="#d1cebd" flex={2} p={2}>
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center", paddingBottom:2}}>
        Fuel Deliveries
      </Typography>
      {!dataview &&  
      <TableContainer component={Paper} sx={{
        borderLeft: "1px solid #ffffff4d",
        borderTop: "1px solid #ffffff4d",
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 0px 0px 5px rgba( 255,255,255,0.4 ), 0px 4px 20px rgba( 0,0,0,0.33 )',
        borderRadius:'10px'
      }}>
      <Table sx={{ width:'100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align='center'>Order Id</TableCell>
            <TableCell align='center'>Fuel</TableCell>
            <TableCell align='center'>View Detais</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
              key={row.OrderId}
            >
              <TableCell align='center'>{row.orderID}</TableCell>
              <TableCell align='center'>{row.fuel}</TableCell>
              <TableCell  align='center'> 
                <Button variant="contained" onClick={()=>{handleClick(row)}}>
                  View
                </Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    {dataview && <OrderDetails orderData={itemdata}/>}
  </Box>
  );
}
