import React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
    return (
        < Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '10 rem' }
            }
        >
            <Grid item xs={3}>
                <CircularProgress color="primary" />
            </Grid>

        </ Grid >
    )

}
