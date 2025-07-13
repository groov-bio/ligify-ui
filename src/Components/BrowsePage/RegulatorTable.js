import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Tooltip, Badge, Grid } from '@mui/material';
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


// Import data
import regulators from '../../ligifyDB.json'

console.log(regulators[0])


export default function RegulatorTable() {
  const [rows, setRows] = useState([]);


  const columns = [
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
  ];


  useEffect(() => {

    const rowsToAdd = [];

      for (var index in regulators) {
        var reg = regulators[index]
        var entry = {
          id: index,
          refseq: reg.refseq,
          rank: reg.rank.rank,
          length: reg.protein_seq.length,
          uniprot: reg.uniprot_id,
          annotation: reg.annotation,
          organismKingdom: reg.protein.organism[1],
          organismPhylum: reg.protein.organism[2],
          organismClass: reg.protein.organism[3],
          organismOrder: reg.protein.organism[4],
          organismFamily: reg.protein.organism[5],
          organismGenus: reg.protein.organism[6],
          aligned: reg.hits.length,
          operonLength: reg.rank.metrics["Genes within operon"].Value,
          enzymeDistance: reg.rank.metrics["Enzyme-regulator distance"].Value,
          additionalRegulators: reg.rank.metrics["Additional regulators"].Value,
          enzyme_uniprot: reg.protein.enzyme.uniprot_id,
        };
        rowsToAdd.push(entry);

      setRows(rowsToAdd);
    }
  }, []);




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
