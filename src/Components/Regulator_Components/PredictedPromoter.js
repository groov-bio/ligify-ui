//PredictedPromoter.js

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  
  export default function PredictedPromoter({ promoter }) {
  
      return (

        <Grid size={{xs:12}} >
            <Typography fontSize={12} sx={{wordBreak:"break-word", overflowWrap:"break-word"}}>
                {promoter}
            </Typography>

        </Grid>

        );

    }