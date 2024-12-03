// src/RegulatorPage.js
import {
    Box,
    Button,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';

  import RegulatorAttributes from "./RegulatorAttributes.js"
  import EnzymeAttributes from "./EnzymeAttributes.js"
  import Rank from "./Rank.js"
  import CandidateLigands from "./CandidateLigands.js"

  export default function RegulatorPage({data}) {
  


      return (
  
      <Box style={{width:"100%"}}>
      <Grid container size={12} mb={6}>

          <Grid size={12} mt={3} textAlign="center">
            <Typography style={{fontSize:28}}>{data.refseq}</Typography>
          </Grid>

          <Grid size={12} mt={3}  mb={2} textAlign="center">
          <Button 
            variant="contained"
            color="secondary"
            type="submit"
            style={{fontSize:12}}
            // disabled={loading}
            // startIcon={loading && <CircularProgress size={20} />}
          >
            Download Plasmid
            {/* {loading ? 'Submitting...' : 'Submit'} */}
          </Button>
          </Grid>

          <Grid size={{xs:0, sm:1, md:2, lg:3}}></Grid>
          <Grid
            size={{xs:12, sm:10, md:8, lg:6}}
            display="flex"
            justifyContent="center">
            <Typography align="center" sx={{fontSize:15}}>
              Designed to induce GFP expression in the presence of the target molecule within E. coli
            </Typography>
          </Grid>

        </Grid>




      <Grid container size={12} mt={3}>

          <Grid size={{xs:12,md:6}} mb={6}>
            <Typography mb={3} style={{fontSize:20, textAlign: "center"}}>Regulator</Typography>

          <RegulatorAttributes
            data={data}/>

          </Grid>



          <Grid size={{xs:12,md:6}} mb={6}>
            <Typography mb={3} style={{fontSize:20, textAlign: "center"}}>Enzyme</Typography>

            <EnzymeAttributes
            data={data}/>

          </Grid>



          <Grid size={{xs:12,md:6}} mb={6}>
            <Typography mb={3} style={{fontSize:20, textAlign:"center"}}>Rank</Typography>

            <Rank
            data={data}/>

          </Grid>



          <Grid size={{xs:12,md:6}} mb={6}>
            <Typography mb={3} style={{fontSize:20, textAlign: "center"}}>Candidate Ligands</Typography>

            <CandidateLigands
            data={data}/>

          </Grid>

      </Grid>
      </Box>

  
      );
  };
  