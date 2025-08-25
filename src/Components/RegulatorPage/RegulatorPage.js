// RegulatorPage.jsx
import React, { useEffect, useMemo } from "react";
import { Box, Typography, LinearProgress, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useDBStore } from "../../stores/db.store"; // your zustand store

import RegulatorAttributes from "./RegulatorAttributes";
import LigandViewer from "./LigandViewer";
import Structure from "./Structure";
import PlasmidDesigner from "./PlasmidDesigner";
import ProteinSeq from "./ProteinSeq";
import EnzymeAttributes from "./EnzymeAttributes";
import Rank from "./Rank";
import GenomeContext from "./GenomeContext";
import PredictedPromoter from "./PredictedPromoter";
import SimilarProteins from "./SimilarProteins";

function toArray(db) {
  if (!db) return [];
  if (Array.isArray(db)) return db;
  if (Array.isArray(db.regulators)) return db.regulators; // common case
  return Object.values(db);
}

export default function RegulatorPage() {
  const { refseq } = useParams();

  const status = useDBStore(s => s.status);
  const error  = useDBStore(s => s.error);
  const data   = useDBStore(s => s.data);
  const loadDB = useDBStore(s => s.loadDB);

  // autoload if needed
  useEffect(() => {
    if (status === "idle") loadDB("/ligifyDB.json");
  }, [status, loadDB]);

  const regulator = useMemo(() => {
    if (!data) return null;
    if (!Array.isArray(data)) return data[refseq] ?? null; // object keyed by refseq
    return toArray(data).find(r => (r?.refseq ?? r?.protein?.refseq) === refseq) ?? null;
  }, [data, refseq]);

  if (status === "loading") return <Box sx={{ p: 2 }}><LinearProgress /></Box>;
  if (status === "error")   return <Box sx={{ p: 2 }}><Alert severity="error">{String(error)}</Alert></Box>;
  if (!regulator) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Regulator “{refseq}” not found.</Alert>
      </Box>
    );
  }

  // Safe fallbacks for fields that might be missing
  const title = regulator.refseq ?? refseq;
  const ligandList = regulator.candidate_ligands ?? regulator.ligand ?? [];
  const accession = regulator.uniprot_id ?? regulator.protein?.uniprot_id ?? "";
  const proteinSeq =
    regulator.protein_seq ?? regulator.protein?.sequence ?? "";
  const promoter =
    regulator.protein?.context?.promoter?.regulated_seq ?? null;
  const genomeContext = regulator.protein?.context ?? null;
  const hits = regulator.hits ?? [];

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 5 }}
    >
      <Box sx={{ width: { xs: "90vw", sm: "80vw", md: "67vw" } }}>

        {/* Header */}
        <Grid container size={12} mb={6}>
          <Grid size={12} mt={3} textAlign="center">
            <Typography
              component="div"
              gutterBottom
              sx={{
                fontSize: { xs: 30, sm: 55 },
                textAlign: "center",
                fontWeight: 300,
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>

        {/* Body */}
        <Grid container spacing={3} mt={3}>
          <Grid size={12} mb={6}>
            <RegulatorAttributes data={regulator} />
          </Grid>

          <Grid size={{xs:12,md:6}} md={6} mb={9}>
            <LigandViewer ligand={ligandList} />
          </Grid>

          <Grid size={{xs:12,md:6}} md={6} mb={9}>
            <Structure accession={accession} />
          </Grid>

          <Grid size={12} mb={6}>
            <PlasmidDesigner data={regulator} />
          </Grid>

          <Grid size={12} mb={6}>
            <ProteinSeq protein_seq={proteinSeq} />
          </Grid>

          <Grid size={12} mb={6}>
            <PredictedPromoter promoter={promoter} />
          </Grid>

          <Grid size={12} mb={6}>
            <GenomeContext data={genomeContext} />
          </Grid>

          <Grid size={{xs:12,md:6}} md={6} mb={6}>
            <EnzymeAttributes data={regulator} />
          </Grid>

          <Grid size={{xs:12,md:6}} md={6} mb={6}>
            <Rank data={regulator} />
          </Grid>

          {hits.length > 0 && (
            <Grid size={12} mb={6}>
              <SimilarProteins data={hits} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );
}
