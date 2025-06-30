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
        fontWeight="300"
        gutterBottom
      >
        Statistics
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Words
      </Typography>


      {/* <Typography
        sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }}
        mt={5}
        fontWeight="300"
        gutterBottom
      >
        Creating Ligify<sup>DB</sup>
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Words
      </Typography> */}

    </Box>
  );
}
