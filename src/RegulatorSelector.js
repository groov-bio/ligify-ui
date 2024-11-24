// src/RegulatorSelector.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';
  
  export default function RegulatorSelector({regulators}) {
  
      // State for selected regulator
      const [Regulator, setRegulator] = useState(null);

      return (
        
        <Box
              sx={{
                border: '1px solid black',
                padding: '1rem',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >

      <Grid container size={12} style={{border:"1px solid black"}}>

        <Grid container size={6} style={{border:"1px solid black"}}>

          <Grid size={12} style={{ border:"1px solid black", display:"inline"}}>
            <Typography style={{fontSize:20}}>Sensor candidates</Typography>
          </Grid>

          <Grid container>
          {regulators.map((regulator, index) => (
                <Grid size={12} key={index}>
                  <Button
                    variant="outlined"
                    onClick={() => { setRegulator(regulator) }}

                    >
                      {regulator["refseq"]}
                  </Button>
                </Grid>
          ))}
        </Grid>
        </Grid>       


        {/* End Regulator selection */}


        <Grid container size={6} style={{border:"1px solid black"}}>
          {Regulator ? 

          <Grid >
            <Typography style={{fontSize:20}}>{Regulator["refseq"]}</Typography>
          </Grid>

              :
            <Grid size={12}>
              <Typography style={{fontSize:20}}>No regulator selected</Typography>
            </Grid>
          }
        </Grid>

        </Grid>
        </Box>
  
      );
  };
  