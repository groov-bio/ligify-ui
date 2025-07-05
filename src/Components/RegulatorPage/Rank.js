// src/Regulators.js
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Typography,
  Grid2
} from '@mui/material';



  export default function Rank({data}) {

    function createData(name, value, deduction) {
      return { name, value, deduction };
    }

    const rows = [
      createData('Genes in operon', data.rank.metrics["Genes within operon"].Value, data.rank.metrics["Genes within operon"].Deduction),
      createData('Enzyme-regulator distance', data.rank.metrics["Enzyme-regulator distance"].Value, data.rank.metrics["Enzyme-regulator distance"].Deduction),
      createData('Additional regulators', data.rank.metrics["Additional regulators"].Value, data.rank.metrics["Additional regulators"].Deduction)
    ];

    return (

      <Box sx={{ flexGrow: 1 }} mr={1}>
        <Grid2 container style={{ width: '100%' }}>

          <Grid2 size={12} >
            <Typography
              component="div"
              style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
            >
              Rank
            </Typography>
          </Grid2>

          <Grid2 size={12}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              padding: "40px",
              height: { xs: '150px', sm: '250px' },
            }}
          >

      {/* <Box> */}
        <Typography sx={{textAlign: "center", fontSize:24, color:data.rank.color }} mb={2}>
          <b>{data.rank.rank}</b>
        </Typography>

      <TableContainer>
      <Table sx={{ minWidth: 200, 
                  '& .MuiTableCell-root': {
                    padding: '9px', // Customize your padding here
                  },
      }}  aria-label="simple table">
        <TableHead sx={{borderBottom: "1.5px solid black"}}>
          <TableRow>
            <TableCell align="left" sx={{fontSize: "18px"}}><b>Metric</b></TableCell>
            <TableCell align="right" sx={{fontSize: "18px"}}><b>Value</b></TableCell>
            <TableCell align="right" sx={{fontSize: "18px"}}><b>Deduction</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{fontSize: "16px"}}>
                {row.name}
              </TableCell>
              <TableCell sx={{fontSize: "18px"}} align="right">{row.value}</TableCell>
              <TableCell sx={{fontSize: "18px"}} align="right">{row.deduction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* </Box>    */}

    </Paper>
    </Grid2>
    </Grid2>
    </Box> 

    )
}
