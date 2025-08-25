import React, { useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';

import { Box, Typography, Tooltip, Badge, Grid, LinearProgress, Alert  } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  ExportCsv,
} from '@mui/x-data-grid';

import useLigifyDB from "../useLigifyDB";

// Import data
function asArray(db) {
  if (!db) return [];
  return Array.isArray(db) ? db : Object.values(db);
}



function CustomToolbar() {
  
  return (
    <Toolbar>

      <Tooltip title="Columns">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon />
        </ColumnsPanelTrigger>
      </Tooltip>

      <Tooltip title="Filters">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                <FilterListIcon />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>
      <ExportCsv variant="outlined"
      >Export
        <FileDownloadIcon/>
      </ExportCsv>
    </Toolbar>
  );
}



export default function RegulatorTable() {

  const { data, loading, error } = useLigifyDB("/ligifyDB.json");
  const [rows, setRows] = useState([]);


  const columns = useMemo(
    () => [
    { field: 'id', headerName: 'Index', width: 80 },
    {
      field: 'refseq',
      headerName: 'RefSeq ID',
      width: 160,
      renderCell: (params) => (
        <Link to={`/database/${params.value}`}>
          {params.value}
        </Link>

      ),
    },
    { field: 'rank', headerName: 'Rank', width: 70, color:'red'},
    { field: 'length', headerName: 'Length', width: 100},
    {
      field: 'uniprot',
      headerName: 'Uniprot ID',
      width: 120,
      renderCell: (params) => (
        <a href={`https://www.uniprot.org/uniprotkb/${params.value}`}
            target="_blank">
          {params.value}
        </a>

      ),
    },
    { field: 'annotation', headerName: 'Annotation', width: 350 },
    { field: 'organismKingdom', headerName: 'Organism kingdom', width: 170 },
    { field: 'organismPhylum', headerName: 'Organism phylum', width: 170 },
    { field: 'organismClass', headerName: 'Organism class', width: 190 },
    { field: 'organismOrder', headerName: 'Organism order', width: 170 },
    { field: 'organismFamily', headerName: 'Organism family', width: 170 },
    { field: 'organismGenus', headerName: 'Organism genus', width: 170 },
    { field: 'aligned', headerName: 'Similar to characterized', width: 200 },
    { field: 'operonLength', headerName: 'Operon length', width: 120 },
    { field: 'enzymeDistance', headerName: 'Distance to enzyme', width: 170 },
    { field: 'additionalRegulators', headerName: 'Additional regulators', width: 170 },
    {
      field: 'enzyme_uniprot',
      headerName: 'Enzyme',
      width: 120,
      renderCell: (params) => (
        <a href={`https://www.uniprot.org/uniprotkb/${params.value}`}
            target="_blank">
          {params.value}
        </a>
      ),
    },
  ],
  []
);

  // Build rows when data is available
  useEffect(() => {

    if (!data) return;
    const regs = asArray(data);

    const mapped = regs.map((reg, i) => ({
      // Prefer a stable ID if you have one; fallback to index
      id: reg.refseq ?? reg.id ?? i + 1,
      refseq: reg.refseq ?? reg.protein?.refseq ?? "",
      rank: reg.rank?.rank ?? null,
      length:
        reg.protein_seq?.length ??
        reg.protein?.sequence?.length ??
        reg.length ??
        null,
      uniprot:
        reg.uniprot_id ?? reg.protein?.uniprot_id ?? reg.protein?.uniprot ?? "",
      annotation: reg.annotation ?? reg.protein?.annotation ?? "",
      organismKingdom: reg.protein?.organism?.[1] ?? "",
      organismPhylum: reg.protein?.organism?.[2] ?? "",
      organismClass: reg.protein?.organism?.[3] ?? "",
      organismOrder: reg.protein?.organism?.[4] ?? "",
      organismFamily: reg.protein?.organism?.[5] ?? "",
      organismGenus: reg.protein?.organism?.[6] ?? "",
      aligned: reg.hits?.length ?? 0,
      operonLength:
        reg.rank?.metrics?.["Genes within operon"]?.Value ??
        reg.rank?.metrics?.["Genes within operon"]?.value ??
        null,
      enzymeDistance:
        reg.rank?.metrics?.["Enzyme-regulator distance"]?.Value ??
        reg.rank?.metrics?.["Enzyme-regulator distance"]?.value ??
        null,
      additionalRegulators:
        reg.rank?.metrics?.["Additional regulators"]?.Value ??
        reg.rank?.metrics?.["Additional regulators"]?.value ??
        null,
      enzyme_uniprot: reg.protein?.enzyme?.uniprot_id ?? "",
    }));

    setRows(mapped);
  }, [data]);



  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{String(error)}</Alert>
      </Box>
    );
  }

  return (
    // Container
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ mt: 5 }}
    >

      <Box
        sx={{
          width: "60%"
        }}
      >
        <Typography
            textAlign="center"
            sx={{
              fontSize: { xs: 24, md: 32 },
              mb: 10,
              mt: { xs: '-50%', sm: '-50%', md: '5%' },
              fontWeight: 500,
            }}
        >
          Predicted Regulators
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          pageSizeOptions={[10, 20, 30]}
          density="compact"
          sx={{fontSize: {xs:12, sm: 16} }}

          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {
                // Hide these columns
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
          slots={{ toolbar: CustomToolbar }}
          showToolbar
        />
      </Box>

    </Grid>
  );
}
