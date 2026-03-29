// BrowsePage.js
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Grid, LinearProgress, Alert,
  ToggleButton, ToggleButtonGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Collapse, TablePagination, TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { DataGrid } from '@mui/x-data-grid';

import { useDBStore } from "../stores/db.store";


// Normalize the root into an array, regardless of shape
function normalizeToArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.regulators)) return data.regulators; // common case
  return Object.values(data);
}

// Collapsible row for the ligand table
function LigandRow({ name, regulators }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={48} sx={{ py: 0.5 }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell align="right">{regulators.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} sx={{ py: 0 }}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ py: 1, px: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {regulators.map((refseq) => (
                <Link key={refseq} to={`/database/${refseq}`} style={{ marginRight: 8 }}>
                  {refseq}
                </Link>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function BrowsePage() {
  const [view, setView] = useState("regulator");

  const [ligandMap, setLigandMap]     = useState(null);
  const [ligandLoading, setLigandLoading] = useState(false);
  const [ligandError, setLigandError] = useState(null);

  const [page, setPage]               = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [search, setSearch]           = useState("");

  const status = useDBStore(s => s.status);
  const error  = useDBStore(s => s.error);
  const data   = useDBStore(s => s.data);
  const loadDB = useDBStore(s => s.loadDB);

  // Defensive autoload (if you didn't mount <DBLoader />)
  useEffect(() => { if (status === "idle") loadDB("/ligifyDB.json"); }, [status, loadDB]);

  useEffect(() => {
    if (view !== "ligand" || ligandMap !== null || ligandLoading) return;
    setLigandLoading(true);
    fetch("https://groov-api.com/ligify-ligand-map.json")
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(d => { setLigandMap(d); setLigandLoading(false); })
      .catch(e => { setLigandError(e.message); setLigandLoading(false); });
  }, [view, ligandMap, ligandLoading]);

  // Reset page when search changes
  useEffect(() => setPage(0), [search]);

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
        annotation: reg?.annotation ?? "",
        organism: reg?.organism ?? "",
        taxon: reg?.taxon ?? "",
        organismKingdom: reg?.protein?.organism?.[1] ?? "",
        organismPhylum:  reg?.protein?.organism?.[2] ?? "",
        organismClass:   reg?.protein?.organism?.[3] ?? "",
        organismOrder:   reg?.protein?.organism?.[4] ?? "",
        organismFamily:  reg?.protein?.organism?.[5] ?? "",
        organismGenus:   reg?.protein?.organism?.[6] ?? "",
        groovDB: reg?.hits?.length ?? 0,
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
    { field: "organism", headerName: "Organism", width: 170 },
    { field: "taxon", headerName: "Taxon", width: 170 },
    { field: "organismKingdom", headerName: "Organism kingdom", width: 170 },
    { field: "organismPhylum",  headerName: "Organism phylum",  width: 170 },
    { field: "organismClass",   headerName: "Organism class",   width: 190 },
    { field: "organismOrder",   headerName: "Organism order",   width: 170 },
    { field: "organismFamily",  headerName: "Organism family",  width: 170 },
    { field: "organismGenus",   headerName: "Organism genus",   width: 170 },
    { field: "groovDB",         headerName: "groovDB", width: 200 },
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

  const filteredLigands = useMemo(() => {
    if (!ligandMap) return [];
    const entries = Object.entries(ligandMap);
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(([name]) => name.toLowerCase().includes(q));
  }, [ligandMap, search]);

  const pagedLigands = useMemo(
    () => filteredLigands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredLigands, page, rowsPerPage]
  );

  if (status === "loading") return <Box sx={{ p: 2 }}><LinearProgress /></Box>;
  if (status === "error")   return <Box sx={{ p: 2 }}><Alert severity="error">{String(error)}</Alert></Box>;

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
      <Box sx={{ width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' } }}>
        <Typography textAlign="center" sx={{ fontSize: { xs:18, sm: 24, md: 32 }, mb: { xs: 2, sm: 3, md: 3 }, mt: { xs: 0, sm: 0, md: "5%" }, fontWeight: 500 }}>
          Predicted Biosensors
        </Typography>

        {/* Toggle */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => { if (val) setView(val); }}
            size="small"
          >
            <ToggleButton value="regulator">Regulator</ToggleButton>
            <ToggleButton value="ligand">Ligand</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Regulator table */}
        {view === "regulator" && (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
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
                  taxon: false,
                  organismKingdom: false,
                  organismPhylum: false,
                  organismFamily: false,
                  organismClass: false,
                  organismOrder: false,
                  organismGenus: false,
                  groovDB: false,
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
        )}

        {/* Ligand table */}
        {view === "ligand" && (
          <>
            {ligandLoading && <LinearProgress />}
            {ligandError && <Alert severity="error">{ligandError}</Alert>}
            {ligandMap && (
              <>
                <TextField
                  size="small"
                  placeholder="Search ligands…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{ mb: 1, width: 280 }}
                />
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell width={48} />
                        <TableCell><strong>Ligand</strong></TableCell>
                        <TableCell align="right"><strong>Regulators</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pagedLigands.map(([name, regulators]) => (
                        <LigandRow key={name} name={name} regulators={regulators} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={filteredLigands.length}
                  page={page}
                  onPageChange={(_, p) => setPage(p)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
                  rowsPerPageOptions={[10, 25, 50]}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
}
