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
import { getAllAdminDetails } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';
import AdminDetails from '../AdminDetails';

function createData(email, firstName, lastName, mobile, password) {
  return {email, firstName, lastName, mobile, password};
}

export default function BasicTable() {
  const [dataview, setDataView] = useState(false)
  const [itemdata, setItemData] = useState({})
  const [adminDetials, setAdminDetails] = useState([])
  const [errMsg, setErrMsg] = useState("");

  const {auth} = useAuth();

  const userEmail = auth().user.email;

  // get details of all the registered admins of the system
  useEffect(() => {
    async function fetchAllAdminDetails() {
      const allAdminDetails = await getAllAdminDetails({userEmail: userEmail});
      
      if (allAdminDetails.data.success)
        setAdminDetails(allAdminDetails.data.allAdminDetails);
      else
        setErrMsg("Fuel delivery details retrival failed!");
    }

    fetchAllAdminDetails();
  }, [userEmail]);

  const rows = [];

  adminDetials.forEach((admin) => {
    const {email, firstName, lastName, mobile, password} = admin
    rows.push(createData(email, firstName, lastName, mobile, password))
  });

  const handleClick = (value) =>{
    setItemData(value)
    setDataView(true)
  };
  
  return (
    <Box bgcolor="#d1cebd" flex={2} p={2}>
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center", paddingBottom:2}}>
        System Admins
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
            
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>View Detais</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
              key={row.OrderId}
            >
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>{row.firstName+" "+row.lastName}</TableCell>
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
    {dataview && <AdminDetails userData={itemdata}/>}
  </Box>
  );
}
