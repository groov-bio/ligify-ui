import React, { useState } from 'react';
import {
    Box,
    Grid2,
    Link,
    Paper,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
  } from '@mui/material';


  export default function SimilarProteins({data}) {

    console.log(data[0])


    return (

        <Box sx={{ flexGrow: 1 }} mr={1}>
          <Grid2 container style={{ width: '100%' }}>
  
            <Grid2 size={12} >
              <Typography
                component="div"
                style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
              >
                Similar Proteins
              </Typography>
            </Grid2>

            <Grid2 size={12}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              padding: "40px",
            }}
          >

            <TableContainer >
                <Table size="small" aria-label="DIAMOND hits">
                    <TableHead style={{borderBottom: "1.5px solid black"}}>
                    <TableRow>
                        <TableCell sx={{fontSize:18}}><strong>Uniprot&nbsp;ID</strong></TableCell>
                        <TableCell sx={{fontSize:18}}><strong>GroovDB&nbsp;ID</strong></TableCell>
                        <TableCell sx={{fontSize:18}} align="right"><strong>% Identity</strong></TableCell>
                        <TableCell sx={{fontSize:18}} align="right"><strong>% Coverage</strong></TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {data.map(({ match_id, alias, pident, coverage }) => (
                        <TableRow key={match_id}>

                                <TableCell component="th" scope="row" sx={{fontSize:18}}>
                                   <a href={`https://www.uniprot.org/uniprotkb/${match_id}`} target="_blank" >
                                    {match_id}
                                    </a>
                                </TableCell>
                              
                                <TableCell component="th" scope="row" sx={{fontSize:18}}>
                                   <a href={`https://www.groov.bio/database/${alias}`} target="_blank" >
                                    {alias.split("/").pop()}
                                    </a>
                                </TableCell>

                        <TableCell sx={{fontSize:18}} align="right">{pident.toFixed(1)}</TableCell>
                        <TableCell sx={{fontSize:18}} align="right">{coverage.toFixed(1)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>


          </Paper>
          </Grid2>

          </Grid2>
        </Box>

    )
}