import { Grid, Typography } from '@mui/material';

export default function Stats() {

  return (
    <Grid
      sx={{
        borderRadius: 1,
        padding: 1.5,
        position: 'absolute',
        left: '20px',
        bottom: '20px',
      }}
    >
      <Typography sx={{ fontSize: { xs: 14, sm: 22 } }}>
        Regulators: 2000
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 22 } }}>
        Unique ligands: 4000
      </Typography>
    </Grid>
  );
}
