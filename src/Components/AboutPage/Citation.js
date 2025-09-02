import React from 'react';

import { Box, Typography } from '@mui/material';

export default function Citation() {
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
        Citing
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        If you have used ligify<sup>DB</sup> in a publication, please cite the following
        paper
      </Typography>

      <Typography
        component="div"
        sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
        mt={2}
        ml={4}
      >
        d'Oelsnitz S, Love JD, Ellington AD, Ross D. Ligify: Automated genome
        mining for ligand-inducible transcription factors.<br></br>
        <i>ACS Synth Biol.</i> <b>13</b>, 8 (2024). doi:{' '}
        <a
          href="https://doi.org/10.1021/acssynbio.4c00372" target="__blank"
        >
          10.1021/acssynbio.4c00372
        </a>
        <br />
      </Typography>

      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} mt={4}>
        When referencing individual biosensors, please also consider citing the{' '}
        <a href="https://academic.oup.com/nar/article/50/D1/D693/6424769" target="__blank">Rhea Database</a>{' '}
        and any literature on the associated enzyme or ligand-interacting protein listed in the "References"
        section under "Associated Enzyme".
      </Typography>

    </Box>
  );
}
