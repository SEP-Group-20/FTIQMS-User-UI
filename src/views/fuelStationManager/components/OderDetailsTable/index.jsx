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

function createData(OrderId, EndStation, Status) {
  return {OrderId, EndStation, Status };
}

// ========================================= Handle Status ================================
function selectType(type){
  if (type === "Delivered"){
     return <TableCell align='center' color='green'><Button variant="outlined" color="success">
     Delivered
   </Button></TableCell>
  }else if(type === "Pending"){
    return <TableCell align='center' color='blue'><Button variant="outlined" >
    Pending
  </Button></TableCell>
  }
  else if(type === "Cancelled"){
    return <TableCell align='center' color='red'><Button variant="outlined" color="error">
    Cancelled
  </Button></TableCell>
  }
}

// ======================================= Navigate ============================
function viewData(id){
  // Getting Data from Database fro relavant id
}

const rows = [
  createData('0001', 'Pinidiya,Matara', 'Pending'),
  createData('0002','Godagama', "Delivered"),
  createData('0003', 'Walgama', 'Cancelled'),
  createData('0004', 'Pamburana', "Delivered"),
  createData('0005',' Gabadaweediya', "Delivered"),
 
];




export default function BasicTable() {
  const navigate = useNavigate();
  // const[state,setstate] = useState(false)
  const[dataview,setdataview] = useState(false)
  const[itemdata,setitemdata] = useState({})

  // const changeState = (item1,item2) =>{
  //   setstate({key:item1,status:item2});
   
  // };

  const handleClick= (value) =>{
    setitemdata(value)
    setdataview(true)
  };
  
  return (<div>
    {!dataview &&  <TableContainer component={Paper} sx={{ m:5,width:'50%',borderLeft: "1px solid #ffffff4d"
    ,borderTop: "1px solid #ffffff4d",
    backdropFilter: 'blur(10px)',
    boxShadow: '0px 0px 0px 5px rgba( 255,255,255,0.4 ), 0px 4px 20px rgba( 0,0,0,0.33 )',
    borderRadius:'10px', mb: '5vw', width: '70%', padding: '2vw', paddingTop: 0}}>
      <Table sx={{ width:'100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align='center'>Order Id </TableCell>
            <TableCell align='center'>End Station </TableCell>
            <TableCell align='center'>Status</TableCell>
            <TableCell align='center'>View Detais</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
          a    
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
              key_={row.OrderId}
              status_= {row.Status}

            >
              {/* <TableCell component="th" scope="row">
                {row.OrderId}
              </TableCell> */}
              <TableCell align='center'>{row.OrderId}</TableCell>
              <TableCell align='center'>{row.EndStation}</TableCell>
              {selectType(row.Status)}
              {/* <TableCell align='center' color='red'>{row.Status}</TableCell> */}
              <TableCell  align='center'> <Button variant="contained" onClick={()=>{handleClick(row)}}>View</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    {dataview && <Order orderData={itemdata}/>}


  </div>
   
            
  );

}
