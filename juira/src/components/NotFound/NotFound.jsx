import React from 'react'
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { Button, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';


export default function NotFound() {
  const history = useHistory();
  return (
    <Container sx={{display: 'flex', alignContent: 'center' , justifyContent:'center', width:1}}>
        <Box sx={{width:0.6}}>
        <Paper elevation={3} sx={{width:1, m:3, display: 'flex', flexDirection: 'column',alignItems: 'center' , justifyContent:'center'}} >
            <Box sx={{ width: 400, height: 300, mb:10 }}>
            <img  src='https://res.cloudinary.com/duq1tcwjw/image/upload/v1667340970/PF-JUIRA/error-404-green_ljmoui.gif' alt='Not Found'/>
            </Box>
        <Button  variant="contained"
          sx={
            {backgroundColor: '#23c197', '&:hover': {backgroundColor: '#138f6e'}, mb:3}
          }
          onClick={()=>{history.push('/juira')}}>Volver</Button>
        </Paper>

    </Box>


    </Container>
    

        
  
  )
}
