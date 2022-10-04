import { Box, Typography } from '@mui/material'
import React from 'react'

const Body = (props) => {
  return (
    <Box bgcolor="lightblue" flex={5} p={2} >
      <Typography variant='h3' sx={{ display: "flex", justifyContent: "center"}}>
        Welcome
        Admin
      </Typography>
      {props.children}
    </Box>
  )
}

export default Body