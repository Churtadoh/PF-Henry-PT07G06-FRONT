import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/system';
import { Paper } from '@mui/material';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function DashCard(props) {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
      }));
    
  return (
    <ThemeProvider theme={theme}>               
      <Box
        sx={{
          /* bgcolor: 'background.paper', */
          bgColor: "rgb(130,114,255)",
          /* background: "linear-gradient(90deg, rgba(130,114,255,1) 0%, rgba(21,230,210,1) 100%)", */
          background: "linear-gradient(360deg, rgb(49 255 201) 0%, rgb(212 251 240) 100%)",
          /* boxShadow: 1, */
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          /* border: "1px solid #ccc", */
          /* boxShadow: "0 0 5px 5px #cccccc55", */
          boxShadow: "0 2px 10px 2px #cccccc55",
          margin: "1rem",
        }}
      >
        
        <Box elevation="12">
          <Box sx={{ color: 'text.secondary' }}> {props.title} </Box>
          <Box sx={{ color: '#378d3e'/* 'text.primary' */, fontSize: 34, fontWeight: 'medium' }}>
            {props.value}
          </Box>
          <Box
            sx={{
              color: 'success.dark',
              display: 'inline',
              fontWeight: 'bold',
              mx: 0.5,
              fontSize: 14,
              userSelect: 'none'
            }}
          >
            {props.info1}
          </Box>
          <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14, userSelect: 'none' }}>
            {props.info2}
          </Box>
         </Box>
        </Box>
      
    </ThemeProvider>
  );
}
