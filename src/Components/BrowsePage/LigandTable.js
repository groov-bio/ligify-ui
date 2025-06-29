import React, { useEffect, useState, useRef } from 'react';
// import { Link, Routes, Route } from 'react-router-dom';

import RegulatorPage from '../RegulatorPage/RegulatorPage.js';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';

// import useSensorStore from '../zustand/sensor.store.js';


export default function LigandTable(data) {
  const [rows, setRows] = useState([]);
  const [ligand, setLigand] = useState(null);
  // const scrollRef = useRef(null);


  /* scroll function */
  // const executeScroll = () => {
  //   if (!scrollRef) return;
  //   // Get element coords from Ref
  //   const element =
  //     scrollRef.current.getBoundingClientRect().top + window.scrollY;

  //   window.scroll({
  //     top: element,
  //     behavior: 'smooth',
  //   });
  // };

  const columns = [
    { field: 'id', headerName: 'Index', width: 80 },
    // { field: 'CHEBI', headerName: 'CHEBI', width: 100 },
    {
      field: 'CHEBI',
      headerName: 'CHEBI',
      width: 150,
      renderCell: (params) => (
        // incorporate scroll function here too
        <Button onClick={() => { setLigand(params.value) }}>
            {params.value}
        </Button>
      ),
    },
    // { field: 'refseq', headerName: 'RefSeq', width: 160 },
    // { field: 'CHEBI', headerName: 'CHEBI', width: 70, color:'red'},
    { field: 'Name', headerName: 'Name', width: 350 },
  ];

//   const selectionPrompt = () => {
//     return (
//       <Box>
//         <Grid container spacing={4} columns={12} mt={8} justifyContent="center">
//           <Grid item xs={10} mb={6}>
//             <Typography
//               sx={{ fontSize: { xs: 22, md: 24 }, textAlign: 'center' }}
//             >
//               Please select a sensor
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   };

  useEffect(() => {
    const rowsToAdd = [];
    // const sensorRouteList = [];
    for (var index in data["ligand"]) {
      var lig = data["ligand"][index]
      console.log(lig)
    }
    // console.log(data['ligand'][0]['CHEBI']);

    // if (typeof sensorTable !== 'undefined') {
      let counter = 0;
      for (var index in data["ligand"]) {
        var lig = data["ligand"][index]
        var entry = {
          id: index,
          CHEBI: lig.CHEBI,
          Name: lig.Name,
          // smiles: lig.SMILES,
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
          rowsPerPageOptions={[5]}
          density="compact"
          // initialState={{
          //   columns: {
          //     columnVisibilityModel: {
          //       // Hide id column
          //       id: false,
          //     },
          //   },
          // }}
        />
      </Box>



    {/* {ligand ?
            <RegulatorPage
                data={ligand}
            />
            :
            <Typography mt={5} mb={10} sx={{fontSize:20}}><i>Please select a ligand</i></Typography>
    } */}

    </Grid>
  );
}
