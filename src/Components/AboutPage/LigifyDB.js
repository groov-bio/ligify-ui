import React from 'react';

import { Box, Typography } from '@mui/material';

export default function LigifyDB() {
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
        fontWeight="300"
        gutterBottom
      >
        A database of predicted biosensors
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        ligify<sup>DB</sup> is an open-source database of bacterial transcription factor-ligand associations
        predicted by genome context. The objective of ligify<sup>DB</sup> is to help researchers reveal the 
        landscape of small molecules that bacteria respond to, which also aims to grow the catalog of chemical-responsive
        geneitic sensors available for biotechnological applications.
        <br />
        <br />
        ligify<sup>DB</sup> was designed and created in 2025 by{' '}
        <a href="https://simondoelsnitz.com" target="__blank__">
          Simon d'Oelsnitz
        </a>{' '}
        and Joshua D. Love.
        <br />
        <br />
        The previous version of Ligify is available <a href="https://ligify.streamlit.app/" target="_blank" rel="noopener noreferrer"> here</a>.
      </Typography>


      <Typography
        sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }}
        mt={5}
        fontWeight="300"
        gutterBottom
      >
        Creating Ligify<sup>DB</sup>
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Words
      </Typography>

    </Box>
  );
}
