import React, { useEffect, useState, useRef } from 'react';
// import { Link, Routes, Route } from 'react-router-dom';

import RegulatorPage from './Regulator_Components/RegulatorPage.js';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';

// import useSensorStore from '../zustand/sensor.store.js';


export default function RegulatorTable(regulators) {
  const [rows, setRows] = useState([]);
  const [regulator, setRegulator] = useState(null);
  const scrollRef = useRef(null);


  /* scroll function */
  const executeScroll = () => {
    if (!scrollRef) return;
    // Get element coords from Ref
    const element =
      scrollRef.current.getBoundingClientRect().top + window.scrollY;

    window.scroll({
      top: element,
      behavior: 'smooth',
    });
  };

  const columns = [
    { field: 'id', headerName: 'Index', width: 80 },
    {
      field: 'refseq',
      headerName: 'RefSeq',
      width: 160,
      renderCell: (params) => (

        // incorporate scroll function here too
        <Button onClick={() => { setRegulator(params.value) }}>
            {params.value.refseq}
        </Button>
      ),
    },
    // { field: 'refseq', headerName: 'RefSeq', width: 160 },
    { field: 'rank', headerName: 'Rank', width: 70, color:'red'},
    { field: 'enzyme', headerName: 'Enzyme', width: 350 },
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
    // console.log(regulators['regulators'][0]);

    // if (typeof sensorTable !== 'undefined') {
      let counter = 0;
      for (var index in regulators['regulators']) {
        var reg = regulators['regulators'][index]
        var entry = {
          id: index,
          refseq: reg,
          rank: reg.rank.rank,
          enzyme: reg.protein.enzyme.description,
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
          initialState={{
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
