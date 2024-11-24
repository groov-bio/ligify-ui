// src/Metrics.js
import {

  Typography,

} from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function Metrics({metrics}) {


    return (

        <Grid container >
        <Grid size={12} >
            <Typography variant="h6">Search metrics</Typography>
        </Grid>
        <Grid size={3}>
          <Typography style={{fontSize:14}}>Reactions</Typography>
          <Typography style={{fontSize:24}}>{metrics["RHEA Reactions"]}</Typography>
        </Grid>
        <Grid size={3}>
          <Typography style={{fontSize:14}}>Genes</Typography>
          <Typography style={{fontSize:24}}>{metrics["Filtered genes"]}</Typography>
        </Grid>
        <Grid size={3}>
          <Typography style={{fontSize:14}}>Operons</Typography>
          <Typography style={{fontSize:24}}>{metrics["Total operons"]}</Typography>
        </Grid>
        <Grid size={3}>
          <Typography style={{fontSize:14}}>Regulators</Typography>
          <Typography style={{fontSize:24}}>{metrics["Total regulators"]}</Typography>
        </Grid>
      </Grid>

    );
};
