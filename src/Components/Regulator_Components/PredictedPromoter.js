//PredictedPromoter.js

import {
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';
  
  export default function PredictedPromoter({ promoter }) {
  
      return (

        <Grid size={{xs:12}} >
            <Typography fontSize={12} sx={{wordBreak:"break-word", overflowWrap:"break-word"}}>
                {promoter}
            </Typography>

        </Grid>

        );

    }