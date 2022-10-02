import React from 'react'
import Test from '../views/admin/components/test'
import TestA from '../views/admin/components/test_a'
import Stack from '@mui/material/Stack';
import Navbar from '../views/admin/components/Navbar';
import Sidebar from '../views/admin/components/Sidebar'

function testPage() {
    const avr = 5
  return (
    
    <div >

<       Navbar/>
          <Stack direction="row" justifyContent="space-between">
            <Sidebar />
            <div style={{margin: "25%"}}>
            </div>
        </Stack>  
        <h1 style={{marginLeft:90}}>Nuwa Jay</h1>

        {/* <div style={{marginLeft:90}}>
        <Test title = 'Nuwan'></Test>
        <Test title = 'Jayasanka'></Test>
        </div >

        <div style={{marginLeft:190}}>
        <TestA></TestA>
        </div > */}

       
        <Test title = 'Nuwan'></Test>
        <Test title = 'jayasanka'></Test>
        
        
        
        
    </div>



  )
}

export default testPage