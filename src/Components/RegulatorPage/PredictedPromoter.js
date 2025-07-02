//PredictedPromoter.js

import {
    Typography,
  } from '@mui/material';
  import {Grid, Paper, Box} from '@mui/material';
  
  export default function PredictedPromoter({ promoter }) {
  
      return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ width: '100%' }}>

          {/* Component Title */}
        <Grid size={12} >
          <Typography
            component="div"
            style={{ marginLeft: '5%', fontSize: 28, width: '100%', fontWeight: 300 }}
          >
            Predicted Promoter
          </Typography>
        </Grid>

        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              padding: 3,
              // height: { xs: '300px', sm: '500px' },
            }}
          >

            <Typography fontSize={18} sx={{wordBreak:"break-word", overflowWrap:"break-word"}}>
                {promoter}
            </Typography>

            </Paper>
        </Grid>

        </Grid>
    </Box>

        );

    }