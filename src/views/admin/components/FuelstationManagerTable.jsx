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
import { Box } from '@mui/material';

function createData(fsmID, Name, Edit, Delete) {
  return {fsmID,Name, Edit, Delete};
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
  createData('A0006','Kasun Pavithra'),
  createData('A0007','Shashini Dilsara'),
  createData('A0008','Nishangi Liyanage'),
  createData('A0009','Kasun Pavithra'),
  createData('A0010','Shashini Dilsara'),
  createData('A0011','Nishangi Liyanage'),
];

export default function BasicTable() {
  const navigate = useNavigate();
  return (
    <Box bgcolor="#d1cebd" flex={2} p={2}>
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
              <TableCell align='center'>Fuel Station Manager ID</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Edit Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow  
                sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
                key={row.fsmID}
              >
                {/* <TableCell component="th" scope="row">
                  {row.OrderId}
                </TableCell> */}
                <TableCell align='center'>{row.fsmID}</TableCell>
                <TableCell align='center'>{row.Name}</TableCell>
                <TableCell  align='center'> <Button variant="contained" onClick={()=>{navigate('/')}}>Edit</Button> </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>     
    </Box>
    
  );
}
