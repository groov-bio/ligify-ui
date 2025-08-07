import React from 'react';

import { Box, Typography } from '@mui/material';

export default function Usage() {
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
        Usage
      </Typography>

      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={1}
        fontWeight="300"
        gutterBottom
      >
        Querying LigifyDB
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        ligify<sup>DB</sup> is an open-source database of bacterial transcription factor-ligand associations
        predicted by genome context. The objective of ligify<sup>DB</sup> is to help researchers reveal the 
        landscape of small molecules that bacteria respond to, which also aims to grow the catalog of chemical-responsive
        geneitic sensors available for biotechnological applications. This resource was created in 2025 by{' '}
        <a href="https://simondoelsnitz.com" target="__blank__">
          Simon d'Oelsnitz
        </a>{' '}
        and Joshua D. Love.
      </Typography>


        <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Building biosensor plasmids
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        The core algorithm behind Ligify predictions has been previously published
        <a href="https://ligify.streamlit.app/" target="_blank" rel="noopener noreferrer"> (available here)</a>.
        ligify<sup>DB</sup> is a standalone database of pre-computed predictions that provides the following benefits. 
        <b>First</b>, accessing predictions is much faster (milliseconds vs minutes) and computationally less expensive, since 
        all data is pulled from a JSON file and requires virtually zero compute. Furthermore, the entire database can be downloaded locally
        (available here).

      </Typography>







    </Box>
  );
}
