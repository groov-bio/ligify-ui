import React, { useEffect, useState, useRef } from 'react';
// import { Link, Routes, Route } from 'react-router-dom';

// import SensorPage from './Sensor_Components/SensorPage.js';

import { Box, Grid, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// import useSensorStore from '../zustand/sensor.store.js';


export default function RegulatorTable(regulators) {
  const [rows, setRows] = useState([]);
  const [regulator, setRegulator] = useState(null);
//   const [sensorRouteList, setSensorRouteList] = useState(null);
//   const [sensorTable, setSensorTable] = useState(regulators);



  // access data from zustand store
//   const setSensorTable = useSensorStore((context) => context.setSensorTable);
//   const sensorTable = useSensorStore(
//     (context) => context.sensorTable[props.family.toLowerCase()]
//   );

  const scrollRef = useRef(null);



//   useEffect(() => {

//     alert(regulator);

//       }, [regulator]);


//     console.log(regulators);
//     setSensorTable(regulators);


    // Only fetch if the data isn't already loaded in the zustand store
    // if (sensorTable.length === 0) {
    //   fetch(
    //     'https://4lsuwlkqoe.execute-api.us-east-2.amazonaws.com/getPages?family=' +
    //       props.family.toUpperCase(),

    //     {
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((sensorData) => {
    //       setSensorTable(props.family.toLowerCase(), sensorData['data']);
    //     });
    // }


//   }, [regulators]);

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
            {params.value}
        </Button>
      ),
    },
    { field: 'rank', headerName: 'Rank', width: 70 },
    { field: 'enzyme', headerName: 'Enzyme', width: 250 },
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
          id: counter,
          refseq: reg.refseq,
          rank: reg.rank.rank,
          enzyme: reg.protein.enzyme.description,
        };
        rowsToAdd.push(entry);

        // sensorRouteList.push(
        //   <Route
        //     key={counter}
        //     path={sensorTable[reg].alias}
        //     element={
        //       <SensorPage
        //         sensorID={sensorTable[reg].uniprotID}
        //         family={props.family}
        //         dimensions={props.dimensions}
        //         temp={false}
        //       />
        //     }
        //   />
        // );

        counter += 1;
    //   }
      setRows(rowsToAdd);
    //   setSensorRouteList(sensorRouteList);
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
      {/* Family Name  */}
      {/* <Typography
        component="div"
        gutterBottom
        sx={{
          fontSize: { xs: 30, sm: 55 },
          fontWeight: 300,
        }}
      >
        {regulator}
      </Typography> */}

      {/* Regulator Table  */}
      <Box
        sx={{
          height: 300,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          rowsPerPageOptions={[5]}
          density="compact"
        />
      </Box>



    {regulator ?
            <Typography>{regulator}</Typography>
            :
            <Typography>Please select a regulator</Typography>
    }


      {/* Sensor Page Placeholder  */}
      {/* <Box
        sx={{
          width: '95%',
          mt: 2,
        }}
        ref={scrollRef}
      >
        <Typography>Please select a regulator</Typography> */}
{/*         
                <Routes>
          <Route path="/" element={selectionPrompt()} />

          {sensorRouteList}
        </Routes> */}
      {/* </Box> */}
    </Grid>
  );
}
