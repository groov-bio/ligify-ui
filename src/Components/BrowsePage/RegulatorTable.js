// RegulatorTable.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Grid, LinearProgress, Alert
} from "@mui/material";


import { DataGrid } from '@mui/x-data-grid';

import { useDBStore } from "../../stores/db.store";


// Normalize the root into an array, regardless of shape
function normalizeToArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.regulators)) return data.regulators; // common case
  return Object.values(data);
}

export default function RegulatorTable() {
  const status = useDBStore(s => s.status);
  const error  = useDBStore(s => s.error);
  const data   = useDBStore(s => s.data);
  const loadDB = useDBStore(s => s.loadDB);

  // Defensive autoload (if you didn't mount <DBLoader />)
  useEffect(() => { if (status === "idle") loadDB("/ligifyDB.json"); }, [status, loadDB]);

  // --- Build safe rows with a guaranteed id ---
  const rows = useMemo(() => {
    const regs = normalizeToArray(data)
      .filter(Boolean); // drop null/undefined rows if any

    return regs.map((reg, i) => {
      const refseq = reg?.refseq ?? reg?.protein?.refseq ?? "";
      const id =
        refseq ||
        reg?.uniprot_id ||
        reg?.protein?.uniprot_id ||
        String(i + 1); // last-resort stable id

      return {
        id,
        refseq,
        rank: reg?.rank?.rank ?? null,
        length: reg?.protein_seq?.length ?? reg?.protein?.sequence?.length ?? null,
        uniprot: reg?.uniprot_id ?? reg?.protein?.uniprot_id ?? "",
        annotation: reg?.annotation ?? reg?.protein?.annotation ?? "",
        organismKingdom: reg?.protein?.organism?.[1] ?? "",
        organismPhylum:  reg?.protein?.organism?.[2] ?? "",
        organismClass:   reg?.protein?.organism?.[3] ?? "",
        organismOrder:   reg?.protein?.organism?.[4] ?? "",
        organismFamily:  reg?.protein?.organism?.[5] ?? "",
        organismGenus:   reg?.protein?.organism?.[6] ?? "",
        aligned: reg?.hits?.length ?? 0,
        operonLength:
          reg?.rank?.metrics?.["Genes within operon"]?.Value ??
          reg?.rank?.metrics?.["Genes within operon"]?.value ??
          null,
        enzymeDistance:
          reg?.rank?.metrics?.["Enzyme-regulator distance"]?.Value ??
          reg?.rank?.metrics?.["Enzyme-regulator distance"]?.value ??
          null,
        additionalRegulators:
          reg?.rank?.metrics?.["Additional regulators"]?.Value ??
          reg?.rank?.metrics?.["Additional regulators"]?.value ??
          null,
        enzyme_uniprot: reg?.protein?.enzyme?.uniprot_id ?? "",
      };
    });
  }, [data]);

  const columns = useMemo(() => [
    { field: "id", headerName: "Index", width: 80 },
    {
      field: "refseq",
      headerName: "RefSeq ID",
      width: 160,
      renderCell: (params) =>
        params.value ? <Link to={`/database/${params.value}`}>{params.value}</Link> : null,
    },
    { field: "rank", headerName: "Rank", width: 70 },
    { field: "length", headerName: "Length", width: 100 },
    {
      field: "uniprot",
      headerName: "Uniprot ID",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`https://www.uniprot.org/uniprotkb/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.value}
          </a>
        ) : null,
    },
    { field: "annotation", headerName: "Annotation", width: 350 },
    { field: "organismKingdom", headerName: "Organism kingdom", width: 170 },
    { field: "organismPhylum",  headerName: "Organism phylum",  width: 170 },
    { field: "organismClass",   headerName: "Organism class",   width: 190 },
    { field: "organismOrder",   headerName: "Organism order",   width: 170 },
    { field: "organismFamily",  headerName: "Organism family",  width: 170 },
    { field: "organismGenus",   headerName: "Organism genus",   width: 170 },
    { field: "aligned",         headerName: "Similar to characterized", width: 200 },
    { field: "operonLength",    headerName: "Operon length", width: 120 },
    { field: "enzymeDistance",  headerName: "Distance to enzyme", width: 170 },
    { field: "additionalRegulators", headerName: "Additional regulators", width: 170 },
    {
      field: "enzyme_uniprot",
      headerName: "Enzyme",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`https://www.uniprot.org/uniprotkb/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.value}
          </a>
        ) : null,
    },
  ], []);

  if (status === "loading") return <Box sx={{ p: 2 }}><LinearProgress /></Box>;
  if (status === "error")   return <Box sx={{ p: 2 }}><Alert severity="error">{String(error)}</Alert></Box>;

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
      <Box sx={{ width: "60%" }}>
        <Typography textAlign="center" sx={{ fontSize: { xs: 24, md: 32 }, mb: 10, mt: { xs: "-50%", sm: "-50%", md: "5%" }, fontWeight: 500 }}>
          Predicted Regulators
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}  // id is guaranteed above
          autoHeight
          pageSizeOptions={[10, 20, 30]}
          density="compact"
          sx={{ fontSize: { xs: 12, sm: 16 } }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {
                id: false,
                uniprot: false,
                organismKingdom: false,
                organismPhylum: false,
                organismFamily: false,
                organismOrder: false,
                organismGenus: false,
                aligned: false,
                enzymeDistance: false,
                additionalRegulators: false,
                operonLength: false,
                enzyme_uniprot: false,
              },
            },
          }}
          showToolbar
          slotProps={{
            toolbar: {
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
        />
      </Box>
    </Grid>
  );
}
