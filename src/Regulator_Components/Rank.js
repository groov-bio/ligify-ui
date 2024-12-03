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
} from '@mui/material';



  export default function Rank({data}) {

    function createData(name, value, deduction) {
      return { name, value, deduction };
    }

    console.log(data.rank.metrics["Genes within operon"].value)
    const rows = [
      createData('Genes in operon', data.rank.metrics["Genes within operon"].Value, data.rank.metrics["Genes within operon"].Deduction),
      createData('Enzyme-regulator distance', data.rank.metrics["Enzyme-regulator distance"].Value, data.rank.metrics["Enzyme-regulator distance"].Deduction),
      createData('Additional regulators', data.rank.metrics["Additional regulators"].Value, data.rank.metrics["Additional regulators"].Deduction)
    ];

    return (

      <Box>
        <Typography sx={{textAlign: "center", fontSize:24, color:data.rank.color }} mb={1}>
          <b>{data.rank.rank}</b>
        </Typography>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200, 
                  '& .MuiTableCell-root': {
                    padding: '9px', // Customize your padding here
                  },
      }}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Metric</b></TableCell>
            <TableCell align="right"><b>Value</b></TableCell>
            <TableCell align="right"><b>Deduction</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.deduction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>    

    )
}
