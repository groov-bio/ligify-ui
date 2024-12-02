// src/Regulators.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';

  import RegulatorAttributes from "./RegulatorAttributes.js"
  import EnzymeAttributes from "./EnzymeAttributes.js"
  import Rank from "./Rank.js"
  import AltLigands from "./AltLigands.js"

  export default function RegulatorPage({data}) {
  


      return (
  
      <Box style={{width:"100%"}}>
      <Grid container size={12}>

          <Grid size={12} mt={3} textAlign="center">
            <Typography style={{fontSize:28}}>{data.refseq}</Typography>
          </Grid>

          <Grid size={12} mt={3}  mb={3} textAlign="center">
          <Button 
            variant="contained"
            color="primary"
            type="submit"
            style={{fontSize:12}}
            // disabled={loading}
            // startIcon={loading && <CircularProgress size={20} />}
          >
            Download Plasmid
            {/* {loading ? 'Submitting...' : 'Submit'} */}
          </Button>
          </Grid>

        </Grid>





      <Grid container size={12} mt={3}>

          <Grid size={6} mb={5}>
            <Typography mb={3} style={{fontSize:20}}>Regulator Information</Typography>

          <RegulatorAttributes
            data={data}/>

          </Grid>



          <Grid size={6} mb={5}>
            <Typography mb={3} style={{fontSize:20}}>Enzyme Information</Typography>

            <EnzymeAttributes
            data={data}/>

          </Grid>



          <Grid size={6}>
            <Typography mb={3} style={{fontSize:20}}>Rank Description</Typography>

            <Rank
            data={data}/>

          </Grid>



          <Grid size={6}>
            <Typography mb={3} style={{fontSize:20}}>Alternative Ligands</Typography>

            <AltLigands
            data={data}/>

          </Grid>

      </Grid>
      </Box>

  
      );
  };
  