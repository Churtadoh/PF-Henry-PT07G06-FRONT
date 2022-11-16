import * as React from 'react';
//import { ThemeProvider, createTheme } from '@mui/system';
import { Paper } from '@mui/material';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { indexOf } from 'lodash';


export default function UserDashCard(props) {

    const { title, value, info1, info2, bkColor, textColor } = props;

    const getRGBcoords = (str) => {
        return str.substring(str.indexOf('(') + 1, str.indexOf(')'));
    }


    return (

        <Box
            sx={{
                bgColor: `rgb(${bkColor})`,
                background: `linear-gradient(90deg, rgba(${getRGBcoords(bkColor)},1) 0%, rgba(${getRGBcoords(bkColor)},.5) 100%)`,
                borderRadius: 2,
                p: 2,
                minWidth: 300,
                boxShadow: "0 2px 10px 2px #cccccc55",
                margin: "1rem",
                userSelect: 'none',
            }}
        >

            <Box elevation="12">
                <Box sx={{ color: textColor }}> {title} </Box>
                <Box sx={{ color: textColor/* '#378d3e' *//* 'text.primary' */, fontSize: 34, fontWeight: 'medium' }}>
                    {'$ ' + (value).toLocaleString('de-DE')}
                </Box>
                <Box
                    sx={{
                        color: textColor,//'success.dark',
                        display: 'inline',
                        fontWeight: 'bold',
                        mx: 0.5,
                        fontSize: 14,
                        userSelect: 'none'
                    }}
                >
                    {info1}
                </Box>
                <Box sx={{ color: textColor, /* 'text.secondary' ,*/ display: 'inline', fontSize: 14, userSelect: 'none' }}>
                    {info2}
                </Box>
            </Box>
        </Box>

    );
}