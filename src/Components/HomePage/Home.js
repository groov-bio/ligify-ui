import Search from './Search.js';
import Stats from './Stats.js';

import { Box, Grid, Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Home() {


  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      sx={{ minHeight: '100%' }}
      style={{
        background: 'linear-gradient(to right bottom, #fffa91, #ffffff)',
      }}
    >
      <Grid
        item
        size={{xs:12, sm:12, md:6}}

        sx={{ position: { xs: 'absolute', sm: 'absolute', md: 'relative' } }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '100%', sm: '100%', md: '75%' },
            opacity: { xs: '40%', sm: '40%', md: '100%' },
            marginTop: { xs: '200px', sm: '200px', md: 0 },
          }}
          src={'/Biosensor_structure.png'}
          alt="Biosensor structure"
          mb={4}
        />
      </Grid>

      {/* Spacer for mobile format */}
      <Grid item size={1} sx={{ display: { sm: 'block', md: 'none' } }}></Grid>

      {/* Text and search bar */}
      <Grid item  
          size={{xs:10, sm:10, md:4}} >

      <Typography
          sx={{
            fontSize: { xs: 50, md: 60 },
            mb: 1,
            fontWeight: 500,
          }}
          component="div"
          textAlign="center"
        >
          Ligify<sup>DB</sup>
        </Typography>


        <Typography
          sx={{
            fontSize: { xs: 20, md: 28 },
            mb: 5,
            mt: { xs: '-50%', sm: '-50%', md: '0%' },
            fontWeight: 500,
          }}
          component="div"
          textAlign="center"
        >
          A database of predicted ligand-inducible transcription factors
        </Typography>


          <Search width="100%" />

        <Stats />
      </Grid>
    </Grid>
  );
}
