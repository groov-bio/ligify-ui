// src/RegulatorPage.js
import {
    Box,
    Button,
    Typography,
    Paper
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';

  import RegulatorAttributes from "./RegulatorAttributes.js"
  import EnzymeAttributes from "./EnzymeAttributes.js"
  import Rank from "./Rank.js"
  // import CandidateLigands from "./CandidateLigands.js"
  import GenomeContext from "./GenomeContext.js"
  import PredictedPromoter from "./PredictedPromoter.js"
  import Structure from "./Structure.js"
  import LigandViewer from "./LigandViewer.js"

  export default function RegulatorPage({data}) {
  

    const handleDownload = () => {
      const plasmid = data.plasmid_sequence
  
      // Define the file name and type
      const fileName = data.refseq+'_plasmid.gb';
      const mimeType = 'text/plain';
  
      // Create a Blob from the plasmid sequence
      const blob = new Blob([plasmid], { type: mimeType });
  
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
  
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
  
      // Append the anchor to the body
      document.body.appendChild(a);
  
      // Programmatically click the anchor to trigger the download
      a.click();
  
      // Clean up by removing the anchor and revoking the object URL
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };



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
            onClick={handleDownload}
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

      <Grid size={12} mb={6} > 
        <RegulatorAttributes
        data={data}/>
      </Grid>


      <Grid size={{xs:12,md:6}} mb={9}>
        <LigandViewer
              ligand={ data.candidate_ligands
                }/>
      </Grid>

      <Grid size={{xs:12,md:6}} mb={9}>
          <Structure
            // accession={data.uniprot_reg_data.id}
            accession={data.protein.enzyme.uniprot_id}
          />
      </Grid>



          <Grid size={{xs:12,md:6}} mb={9} mr={{xs:0, md:7}}>
                    {/* Component Title */}
        <Grid size={12} >
          <Typography
            component="div"
            mb={1}
            style={{ marginLeft: '5%', fontSize: 22, fontWeight: 300 }}
          >
            Associated Enzyme
          </Typography>
        </Grid>
            {/* <Typography mb={3} style={{fontSize:20, textAlign: "center"}}>Enzyme</Typography> */}

            <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              padding: '10px'
            }}
          >
            <EnzymeAttributes
            data={data}/>
          </Paper>

          </Grid>



          <Grid size={{xs:12,md:5}} mb={9}>
            {/* <Typography mb={3} style={{fontSize:20, textAlign:"center"}}>Rank</Typography> */}
            <Typography
            component="div"
            mb={3}
            style={{ marginLeft: '5%', fontSize: 22, fontWeight: 300 }}
          >
            Rank
          </Typography>

            <Rank
            data={data}/>

          </Grid>



          {/* <Grid size={{xs:12,md:6}} mb={6}>
            <Typography mb={3} style={{fontSize:20, textAlign: "center"}}>Candidate Ligands</Typography>

            <CandidateLigands
            data={data}/>

          </Grid> */}


          <Grid size={12} mb={6}>
            {/* <Typography mb={3} mt={2} style={{fontSize:20, textAlign: "center"}}>Operon</Typography> */}
            <Grid size={12} >
          <Typography
            component="div"
            mb={3}
            style={{ marginLeft: '5%', fontSize: 22, fontWeight: 300 }}
          >
            Operon
          </Typography>
        </Grid>

            <GenomeContext
            data={data.protein.context}/>

          </Grid>

          <Grid size={12} mb={6}>
              <Typography mb={3} mt={2} style={{fontSize:20, textAlign: "center"}}>Predicted Promoter</Typography>
            <PredictedPromoter
            promoter={data.protein.context.promoter.regulated_seq}/>

          </Grid>

      </Grid>
      </Box>

  
      );
  };
  