import { Grid, Typography } from '@mui/material';

export default function AccessStatement() {

  return (
    <Grid
      sx={{
        borderRadius: 1,
        padding: 1.5,
        position: 'absolute',
        right: '0px',
        width: {xs:150, sm:270, md:500},
        bottom: '20px',
      }}
    >
      <Typography sx={{ 
        fontSize: 
          { xs: 14, sm: 18, md:22 } }}>

        Access is freely available via our{' '}
        <a style={{color:"#a30300"}} href="https://github.com/groov-bio/ligify-ui?tab=MIT-1-ov-file">MIT license</a>.
      </Typography>
      {/* <Typography sx={{ fontSize: { xs: 14, sm: 22 } }}>
        Unique ligands: 1,362
      </Typography> */}
    </Grid>
  );
}
