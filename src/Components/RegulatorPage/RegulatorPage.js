// src/RegulatorPage.js
import React, { useMemo } from "react";
import {
    Box,
    Typography,
    LinearProgress, 
    Alert
  } from '@mui/material';
  import Grid from '@mui/material/Grid';
  import { useParams } from 'react-router-dom';

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

  import useLigifyDB from "../useLigifyDB";

  // Helper to normalize DB shape
function asArray(db) {
  return Array.isArray(db) ? db : Object.values(db ?? {});
}


  export default function RegulatorPage() {

    // pull data for the relevant regulator from the ligify_regulators database file
    // URL like: /database/:refseq
    const { refseq } = useParams();

    // fetch DB
    const { data, loading, error } = useLigifyDB("/ligifyDB.json");

      // Build a fast index by refseq once the data arrives
    const byRefseq = useMemo(() => {
      const rows = asArray(data);
      return new Map(rows.map(r => [r?.refseq ?? r?.protein?.refseq, r]));
    }, [data]);

  // Try Map first; also support object keyed by refseq if that's your JSON
  const regulator = byRefseq.get(refseq) ?? (data && data[refseq]) ?? null;

  if (loading) return <Box sx={{ p: 2 }}><LinearProgress /></Box>;
  if (error)   return <Box sx={{ p: 2 }}><Alert severity="error">{String(error)}</Alert></Box>;
  if (!regulator)
    return <></>;


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
              {regulator.refseq ?? refseq}
            </Typography>
          </Grid>

        </Grid>


      <Grid container size={12} mt={3}>

      <Grid size={12} mb={6} > 
        <RegulatorAttributes data={regulator}/>
      </Grid>


      <Grid size={{xs:12,md:6}} mb={9}>
        <LigandViewer ligand={ regulator.candidate_ligands}/>
      </Grid>

      <Grid size={{xs:12,md:6}} mb={9}>
          <Structure accession={regulator.uniprot_id}/>
      </Grid>

      <Grid size={{xs:12}} mb={6}>
          <PlasmidDesigner data={regulator}/>
      </Grid>

      <Grid size={{xs:12}} mb={6}>
          <ProteinSeq protein_seq={regulator.protein_seq}/>
      </Grid>

      <Grid size={12} mb={6}>
          <PredictedPromoter promoter={regulator.protein.context.promoter.regulated_seq}/>
      </Grid>

      <Grid size={12} mb={6}>
          <GenomeContext data={regulator.protein.context}/>
      </Grid>

      <Grid size={{xs:12,md:6}} mb={6} >
        <EnzymeAttributes data={regulator}/>
      </Grid>

      <Grid size={{xs:12,md:6}} mb={6}>
        <Rank data={regulator}/>
      </Grid>

    { regulator.hits.length > 0 ? 
      <Grid size={12} mb={6}>
        <SimilarProteins data={regulator.hits}/>
      </Grid>
      : <></>
    }

      </Grid>

      </Box>
          </Grid>
  
      );
  };
  