import * as React from 'react';
import { useState,useEffect } from 'react';
import Container  from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import index from '../OrderDetailsTable/OrderDetails';
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';

function selectType(type){
    if (type == "Delivered"){
        return <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'green'}}>
        : DELIVERED
    </Grid>
      
    }else if(type == "Pending"){
        return <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'blue'}}>
        : PENDING
    </Grid>
      
    }
    else if(type == "Cancelled"){
        return <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold', color: 'red'}}>
        : CANCELLED
    </Grid>
    }
  }





export default function Home({orderData}) {
    const navigate = useNavigate();
    // console.log(this.props);
    const[orderview,setorderview] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
    
        //   email: data.get('email'),
        //   password: data.get('password'),
    
        // });
      };


    const OrderDetails = 
        {
            order_id : '0001',
            fuelStation_Id : 'A001',
            address : 'Pinidiya Junction, Matara',
            mobile : '0765867087',
            district: 'Matara',
            fuel_volume : '2000',
            fuel_type : 'Petrol',
            date : '2022-10-01',
            status : 'Delivered'
    
        }
    
        const [open, setOpen] = React.useState(false);

        const handleBack = () => {

            setorderview(true)
        };


    return (
        <div>
            {!orderview && 

            <Container  component="main" Width="" sx={{     mt: 20,
                                                            background:'#ffffff4d', 
                                                            borderLeft: "1px solid #ffffff4d",
                                                            borderTop: "1px solid #ffffff4d",
                                                            backdropFilter: 'blur(10px)',
                                                            // boxShadow: '20px 20px 40px -6px rgb(0 0 0 / 20%)',
                                                            boxShadow: 
                                                                        '0px 0px 0px 5px rgba( 255,255,255,0.4 ), 0px 4px 20px rgba( 0,0,0,0.33 )',
                                                            borderRadius:'10px', mb: '5vw', mt:0, width: '70%', padding: '2vw', paddingTop: 0}}>
                <CssBaseline />
                <Box sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'Left',
                    }}>

                       

                        <Typography component="h2" variant="h5" color='primary' sx={{mt: 2, fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center'}}>
                            ORDER DETAILS
                        </Typography>
                    
                        <Grid container spacing={2} sx={{mt: '1.5vw'}}>
                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Order ID
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : { orderData.OrderId}
                            
                                {/* : {this.props.key} */}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Fuel Station ID
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {OrderDetails['fuelStation_Id']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Address
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : { orderData.EndStation}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Mobile
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {OrderDetails['mobile']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                District
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {OrderDetails['district']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Fuel Volume
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {OrderDetails['fuel_volume']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Fuel Type
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {OrderDetails['fuel_type']}
                            </Grid>

                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Ordered Date
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                : {OrderDetails['date']}
                            </Grid>
                            <Grid item xs={12} md={4} sx={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                                Status
                            </Grid>
                            <Grid item xs={12} md={8} sx={{fontSize: '1.2rem'}}>
                                {selectType(orderData.Status)}
                            </Grid>
                            <Grid item xs={12} md={12} sx={{fontSize: '2 rem', fontWeight: 'bold', placeItems: 'center'}}>
                            <Button variant="contained" color="success" onClick={()=> {window.location.reload(false)}} >
                                Back
                            </Button>
                            </Grid>
                            </Grid>    
                </Box>


            </Container>
            }
             {orderview && <index/>}
        </div>
    );
}




