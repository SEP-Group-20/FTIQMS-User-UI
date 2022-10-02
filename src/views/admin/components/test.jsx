import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Test(props) {
    const titleDis = props.title;

    const funTest=()=>{
        console.log(titleDis)
    }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '40%',
          height: '40%',

          backgroundColor:'red'
        },
      }}
      
    >
      
      <Paper elevation={3} >
        <h1> {titleDis}</h1>
        <div style={{display: 'flex',
  alignItems: 'center',
  justifyContent:' center',}}>
    <Button variant="contained" onClick = {funTest} >Test_Button</Button>
  </div>
        

      </Paper>
    </Box>
  );
}
