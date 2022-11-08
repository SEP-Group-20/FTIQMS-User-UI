import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getAllAdminDetails } from '../../../services/UserService';
import { useNavigate } from "react-router-dom";

function createData(adminID, Name, Edit, Delete) {
  return {adminID,Name, Edit, Delete};
}

// ========================================= Handle Status ================================


// ======================================= Navigate ============================
function viewData(id){
  // Getting Data from Database fro relavant id
}

const rows = [
  createData('A0001', 'Nisanya Pathirana'),
  createData('A0002', 'Thivindu Paranayapa'),
  createData('A0003','Kasun Pavithra'),
  createData('A0004','Shashini Dilsara'),
  createData('A0005','Nishangi Liyanage'),
 
];

export default function BasicTable() {
  const navigate = useNavigate();
  return (
    // <Box bgcolor="#d1cebd" flex={5} p={2}>
    <TableContainer component={Paper} sx={{ m:5,width:'50%',borderLeft: "1px solid #ffffff4d"
    ,borderTop: "1px solid #ffffff4d",
    backdropFilter: 'blur(10px)',
    boxShadow: '0px 0px 0px 5px rgba( 255,255,255,0.4 ), 0px 4px 20px rgba( 0,0,0,0.33 )',
    borderRadius:'10px', mb: '5vw', width: '70%', padding: '2vw', paddingTop: 0}} >
      <Table sx={{ width:'100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align='center'>User ID</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Edit Details</TableCell>
            <TableCell align='center'>Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
          a    
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
              key={row.adminID}
            >
              {/* <TableCell component="th" scope="row">
                {row.OrderId}
              </TableCell> */}
              <TableCell align='center'>{row.adminID}</TableCell>
              <TableCell align='center'>{row.Name}</TableCell>
              <TableCell  align='center'> <Button variant="contained" onClick={()=>{navigate('/')}}>Edit</Button> </TableCell>
              <TableCell  align='center'> <Button variant="outlined" color="error" onClick={()=>{navigate('/')}}>Delete</Button> </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // </Box>
  );
}

