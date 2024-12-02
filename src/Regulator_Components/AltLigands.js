// src/Regulators.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';


  export default function AltLigands({data}) {


    return (

        <Grid container mt={7}>
          {/* {(data.protein.enzyme.dois).map((name, index) => ( */}
            {(data.alt_ligands).map((name, index) => (
              <Grid item key={index} width={"100%"}>
                <Typography ml={'30%'} textAlign="left" style={{fontSize: "18px"}}>{name}</Typography>
              </Grid>
            ))}
        </Grid>
        
    )
}
