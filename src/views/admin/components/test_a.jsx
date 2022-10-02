import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '40%',
          height: '40%',

          backgroundColor:'blue'
        },
      }}
    >
      
      <Paper elevation={3} >
        <h1> Jayasanka</h1>
        
      </Paper>
    </Box>
  );
}
