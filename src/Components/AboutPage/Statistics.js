import React from 'react';

import { Box, Typography } from '@mui/material';

export default function Statistics() {
  return (
    <Box
      mb={5}
      sx={{
        marginLeft: { xs: '10vw', sm: '35vw', md: '30vw' },
        marginRight: { xs: '10vw', sm: '5vw', md: '15vw' },
      }}
    >
      <Typography
        sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }}
        fontWeight="500"
        gutterBottom
      >
        Statistics
      </Typography>

      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Regulators
      </Typography >

      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Regulators within Ligify<sup>DB</sup> belong to some of the most common structural families, including LysR and TetR.
        Compared to the past analyses of structural family frequencies in all bacteria, the LacI family is more represented and 
        the AraC family is less represented.

        Most regulators are between 150-350 amino acids long, as expected. Peaks around lengths of 180, 230, and 320 likely correspond
        to the TetR/MarR, LysR, and LacI families, respectively.
      </Typography>

      <Box
          component="img"
          mt={3}
          sx={{ mr:{sm:0, md:"9%"}, width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Common_Families.png'}
          alt="Common_Families"
        />

      <Box
          component="img"
          mt={3}
          sx={{ width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Regulator_Lengths.png'}
          alt="Regulator_Lengths"
        />



<Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Promoters and Orientation
      </Typography >

      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Predicted promoters are about 150bp in length, on average, with a trailing tail up to ~1000bp. 

        Regulators are most often expressed in the opposite direction of the associated enzyme (Divergent, 73.7%) compared to 
        being expressed in the same direction (Convergent, 26.3%). These ratios are expected, based on what has been reported
        in the literature for several transcription regulator families.
      </Typography>

      <Box
          component="img"
          mt={3}
          sx={{ mr:{sm:0, md:"9%"}, width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Promoter_Lengths.png'}
          alt="Promoter_Lengths"
        />

      <Box
          component="img"
          mt={3}
          sx={{ width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Regulator_Orientation.png'}
          alt="Regulator_Orientation"
        />

    </Box>
  );
}
