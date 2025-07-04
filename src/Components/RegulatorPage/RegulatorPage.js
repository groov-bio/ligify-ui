// src/RegulatorPage.js
import {
    Box,
    Button,
    Typography,
    Paper
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';

  import { useParams } from 'react-router-dom';
  import regulators from '../../ligifyDB.json'

  import RegulatorAttributes from "./RegulatorAttributes.js"
  import EnzymeAttributes from "./EnzymeAttributes.js"
  import Rank from "./Rank.js"
  import GenomeContext from "./GenomeContext.js"
  import PredictedPromoter from "./PredictedPromoter.js"
  import Structure from "./Structure.js"
  import LigandViewer from "./LigandViewer.js"
  import ProteinSeq from "./ProteinSeq.js"
  import SimilarProteins from "./SimilarProteins.js"

  export default function RegulatorPage() {
  
    // pull data for the relevant regulator from the ligify_regulators database file
    const { refseq } = useParams();
    // find the full object (you could also fetch from a server here)
    const regulator = regulators.find(r => r.refseq === refseq);
    if (!regulator) return <div>Regulator “{refseq}” not found.</div>;


    const handleDownload = () => {
      const plasmid = regulator.plasmid_sequence
  
      // Define the file name and type
      const fileName = regulator.refseq+'_plasmid.gb';
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
  

        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        sx={{ mt: 5 }}
      >
        
        <Box width="63vw">



      <Grid container size={12} mb={6}>

          <Grid size={12} mt={3} textAlign="center">
            <Typography style={{fontSize:28}}>{regulator.refseq}</Typography>
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
        data={regulator}/>
      </Grid>


      <Grid size={{xs:12,md:6}} mb={9}>
        <LigandViewer
              ligand={ regulator.candidate_ligands
                }/>
      </Grid>

      <Grid size={{xs:12,md:6}} mb={9}>
          <Structure
            accession={regulator.uniprot_id}
          />
      </Grid>

      <Grid size={{xs:12}} mb={9}>
          <ProteinSeq
            protein_seq={regulator.protein_seq}
          />
      </Grid>


            {/* Enzyme Attributes Component */}

          <Grid size={{xs:12,md:6}} mb={9} >

            <EnzymeAttributes
              data={regulator}/>

          </Grid>


            {/* Rank Component */}

          <Grid size={{xs:12,md:6}} mb={9}>

            <Rank
              data={regulator}/>

          </Grid>


            {/* Genome Context Component */}

          <Grid size={12} mb={6}>

            <GenomeContext
            data={regulator.protein.context}/>

          </Grid>

            {/* Predicted Promoter Component */}

          <Grid size={12} mb={6}>

            <PredictedPromoter
            promoter={regulator.protein.context.promoter.regulated_seq}/>

          </Grid>


            {/* Similar Proteins Component */}

          { regulator.hits.length > 0 ? 
            <Grid size={12} mb={6}>

                <SimilarProteins
                data={regulator.hits}/>

            </Grid>
            : <></>
          }

      </Grid>


      </Box>
          </Grid>

      


  
      );
  };
  