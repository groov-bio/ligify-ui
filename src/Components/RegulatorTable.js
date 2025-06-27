import React, { useEffect, useState, useRef } from 'react';
// import { Link, Routes, Route } from 'react-router-dom';

import RegulatorPage from './Regulator_Components/RegulatorPage.js';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';



export default function RegulatorTable(regulators) {
  const [rows, setRows] = useState([]);
  const [regulator, setRegulator] = useState(null);
  const scrollRef = useRef(null);


  const columns = [
    { field: 'id', headerName: 'Index', width: 80 },
    {
      field: 'refseq',
      headerName: 'RefSeq',
      width: 160,
      renderCell: (params) => (
        <a href={params.value}>
          {params.value}
        </a>

      ),
    },
    { field: 'rank', headerName: 'Rank', width: 70, color:'red'},
    { field: 'annotation', headerName: 'Annotation', width: 350 },
  ];


  useEffect(() => {
    const rowsToAdd = [];
      let counter = 0;
      for (var index in regulators['regulators']) {
        var reg = regulators['regulators'][index]
        var entry = {
          id: index,
          refseq: reg,
          rank: reg.rank.rank,
          annotation: reg.annotation,
        };
        rowsToAdd.push(entry);

        counter += 1;

      setRows(rowsToAdd);
    }
  }, []);

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
          width: "100%"
        }}
      >
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
        />
      </Box>



    {regulator ?
            <RegulatorPage
                data={regulator}
            />
            :
            <Typography mt={5} mb={10} sx={{fontSize:20}}><i>Please select a regulator</i></Typography>
    }

    </Grid>
  );
}
