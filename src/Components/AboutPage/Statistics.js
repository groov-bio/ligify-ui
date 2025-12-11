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
        Regulators within Ligify belong to some of the most common structural families, including LysR and TetR.
        Compared to past analyses of structural family frequencies in all bacteria, the LacI family is more represented and 
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
        Ligands
      </Typography >

      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        A small fraction of the 1,362 ligands in Ligify are associated with a large fraction of the regulators 
        in the database. Twenty two ligands are associated with over 100 regulators, while 434 ligands are associated with 
        just one regulator. This bias is likely due to the overrepresentation of cofactors involved in the enzyme reactions 
        from which most predicted interactions are derived. Looking at the top 10 most common ligands, most of them are indeed
        cofactors, coenzymes, or cofactor analogs (APAD), while others are core metabolic intermediates. Despite this bias, 
        the true ligands of regulators are most likely reaction substrates or products, rather than cofactors.
      </Typography>

      <Box
          component="img"
          mt={3}
          sx={{ mr:{sm:0, md:"9%"}, width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/RegulatorsPerLigand.png'}
          alt="Regulators Per Ligand"
        />

      <Box
          component="img"
          mt={3}
          sx={{ width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Top10-Ligands.png'}
          alt="Top ten Ligands"
        />



      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Organisms
      </Typography >

      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        There is a wide diversity of organisms represented in the database, with an expected skew towards model and pathogenic organisms.
        The three phyla Pseudomonadota, Bacillota, and Actinomycetota make up 80.8% of the database, while the remaining 19.2% contain
        27 other phyla. The most represented species are model organisms belong to the Escherichia, Pseudomonas, Bacillus, and 
        Streptomyces genuses.
      </Typography>

      <Box
          component="img"
          mt={3}
          sx={{ mr:{sm:0, md:"9%"}, width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Organism_Phyla.png'}
          alt="Organism Phyla"
        />

      <Box
          component="img"
          mt={3}
          sx={{ width:{sm:"100%", md:'45%'} }}
          // sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/Content_Stats/Common_Genuses.png'}
          alt="Common Genuses"
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
