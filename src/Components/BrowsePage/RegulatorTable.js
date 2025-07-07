import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Tooltip, Badge, Grid } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
} from '@mui/x-data-grid';


// Import data
import regulators from '../../ligifyDB.json'


export default function RegulatorTable() {
  const [rows, setRows] = useState([]);


  const columns = [
    { field: 'id', headerName: 'Index', width: 80 },
    {
      field: 'refseq',
      headerName: 'RefSeq',
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
      headerName: 'Uniprot',
      width: 120,
      renderCell: (params) => (
        <a href={`https://www.uniprot.org/uniprotkb/${params.value}`}
            target="_blank">
          {params.value}
        </a>

      ),
    },
    { field: 'annotation', headerName: 'Annotation', width: 350 },
    { field: 'organism', headerName: 'Organism class', width: 200 },
    { field: 'aligned', headerName: 'Aligned', width: 200 },
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
          organism: reg.protein.organism[3],
          aligned: reg.hits.length,
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
            <ViewColumnIcon fontSize="small" />
          </ColumnsPanelTrigger>
        </Tooltip>
  
        <Tooltip title="Filters">
          <FilterPanelTrigger
            render={(props, state) => (
              <ToolbarButton {...props} color="default">
                <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                  <FilterListIcon fontSize="small" />
                </Badge>
              </ToolbarButton>
            )}
          />
        </Tooltip>
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

          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {
                // Hide id column
                id: false,
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
