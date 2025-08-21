// src/RegulatorPage.js
import {
    Box,
    Button,
    Typography,
    Paper
  } from '@mui/material';
  import Grid from '@mui/material/Grid';

  import { useParams } from 'react-router-dom';
  import regulators from '../../ligifyDB.json'

  import RegulatorAttributes from "./RegulatorAttributes.js"
  import LigandViewer from "./LigandViewer.js"
  import Structure from "./Structure.js"
  import PlasmidDesigner from "./PlasmidDesigner.js"
  import ProteinSeq from "./ProteinSeq.js"
  import EnzymeAttributes from "./EnzymeAttributes.js"
  import Rank from "./Rank.js"
  import GenomeContext from "./GenomeContext.js"
  import PredictedPromoter from "./PredictedPromoter.js"
  import SimilarProteins from "./SimilarProteins.js"

  export default function RegulatorPage() {
  
    // pull data for the relevant regulator from the ligify_regulators database file
    const { refseq } = useParams();
    // find the full object (you could also fetch from a server here)
    const regulator = regulators.find(r => r.refseq === refseq);
    if (!regulator) return <div>Regulator “{refseq}” not found.</div>;


      return (
  

        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        sx={{ mt: 5 }}
      >
        
        <Box 
          sx={{width: {xs:'90vw',sm: '80vw', md:"67vw"} }}
          >


      <Grid container size={12} mb={6}>

          <Grid size={12} mt={3} textAlign="center">
            <Typography 
              component="div"
              gutterBottom
              sx={{
                fontSize: { xs: 30, sm: 55 },
                textAlign: 'center',
                fontWeight: 300,
              }}
              >
                {regulator.refseq}
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

      <Grid size={{xs:12}} mb={6}>
          <PlasmidDesigner
            data={regulator}
          />
      </Grid>

      <Grid size={{xs:12}} mb={6}>
          <ProteinSeq
            protein_seq={regulator.protein_seq}
          />
      </Grid>


      {/* Predicted Promoter Component */}

      <Grid size={12} mb={6}>
          <PredictedPromoter
          promoter={regulator.protein.context.promoter.regulated_seq}/>
      </Grid>


            {/* Genome Context Component */}

      <Grid size={12} mb={6}>
          <GenomeContext
          data={regulator.protein.context}/>
      </Grid>


            {/* Enzyme Attributes Component */}

          <Grid size={{xs:12,md:6}} mb={6} >

            <EnzymeAttributes
              data={regulator}/>

          </Grid>


            {/* Rank Component */}

          <Grid size={{xs:12,md:6}} mb={6}>

            <Rank
              data={regulator}/>

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
  