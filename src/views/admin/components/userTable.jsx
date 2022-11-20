import React, { useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { getAllUserDetails } from '../../../services/UserService';
import { useAuth } from '../../../utils/auth';
import FSMDetails from '../FSMDetails';
import AdminViewAdminDetails from './AdminViewAdminDetails';


function createData(email, firstName, lastName, mobile, password, role) {
  return {email, firstName, lastName, mobile, password, role};
}

function defineRole(value){
    if(value === 5001)
        return "Admin" ;
    else 
        return "Fuel Station Manager";
    
}

export default function UserTable() {
  const [dataview, setDataView] = useState(false)
  const [itemdata, setItemData] = useState({})
  const [UserDetials, setUserDetails] = useState([])
  const [errMsg, setErrMsg] = useState("");

  const {auth,userData} = useAuth();

  const userEmail = auth().user.email;

  // get details of all the registered fuel station managers of the system
  useEffect(() => {
    async function fetchAllUserDetails() {
      const allUserDetails = await getAllUserDetails({userEmail: userEmail});
       
      
      if (allUserDetails.data.success)
        setUserDetails(allUserDetails.data.allUserDetails);
      else
        setErrMsg("Fuel delivery details retrival failed!");
    }

    fetchAllUserDetails();
  }, [userEmail]);

  const rows = [];

  UserDetials.forEach((User) => {
    const {email, firstName, lastName, mobile, password, role} = User
    rows.push(createData(email, firstName, lastName, mobile, password, role))
  });

  const handleClick = (value) =>{
    setItemData(value)
    setDataView(true)
  };
  
  return (
    <Box bgcolor="#d1cebd" flex={2} p={2}>
      <Typography variant='h2' sx={{ display: "flex", justifyContent: "center", paddingBottom:2}}>
        System Users
      </Typography>
      {!dataview &&  
      <TableContainer component={Paper} sx={{
        borderLeft: "1px solid #ffffff4d",
        borderTop: "1px solid #ffffff4d",
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 0px 0px 5px rgba( 255,255,255,0.4 ), 0px 4px 20px rgba( 0,0,0,0.33 )',
        borderRadius:'10px'
      }}>
      <Table sx={{ width:'100%', }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>UserType</TableCell>
            <TableCell align='center'>View Detais</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            var n = row.firstName+" "+row.lastName
            if(!n.includes(userData) && userData){
              return null
            }
            return <TableRow 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
              key={row.OrderId}
            >
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>{row.firstName+" "+row.lastName}</TableCell>
              <TableCell align='center'>
                {defineRole(row.role)}</TableCell>
              <TableCell  align='center'> 
                <Button variant="contained" onClick={()=>{handleClick(row)}}>
                  View
                </Button>
              </TableCell>
              
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>}
    {dataview && itemdata.role === 5001 && <AdminViewAdminDetails userData={itemdata}/>}
    {dataview && itemdata.role === 5002 && <FSMDetails userData={itemdata}/>}
  </Box>
  );
}
