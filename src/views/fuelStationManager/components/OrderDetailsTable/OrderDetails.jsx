import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Order from '../OrderDetailsCard/Order';
import { Box, Typography } from '@mui/material';

function createData(orderId, fuel) {
  return {orderId, fuel };
}

// ======================================= Navigate ============================
function viewData(id){
  // Getting Data from Database fro relavant id
}

const rows = [
  createData('0001', 'Petrol', '03/10/2022'),
  createData('0002','Petrol', "09/10/2022"),
  createData('0003', 'Diesel', '09/10/2022'),
  createData('0004', 'Petrol', "21/10/2022"),
  createData('0005',' Diesel', "20/10/2022"),
 
];

export default function BasicTable() {
  const navigate = useNavigate();
  // const[state,setstate] = useState(false)
  const[dataview,setDataView] = useState(false)
  const[itemdata,setItemData] = useState({})

  // const changeState = (item1,item2) =>{
  //   setstate({key:item1,status:item2});
   
  // };

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
            <TableCell align='center'>Fuel </TableCell>
            <TableCell align='center'>View Detais</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
              key_={row.OrderId}
            >
              <TableCell align='center'>{row.orderId}</TableCell>
              <TableCell align='center'>{row.fuel}</TableCell>
              <TableCell  align='center'> <Button variant="contained" onClick={()=>{handleClick(row)}}>View</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    {dataview && <Order orderData={itemdata}/>}
  </Box>      
  );
}
