import React from 'react';

import { Box, Grid, Typography, Paper, Button } from '@mui/material';

export default function ProteinSeq(data) {

  var protein_seq = data["protein_seq"]

  function splitStringIntoChunks(str, chunkSize) {
    let result = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      result.push(str.slice(i, i + chunkSize));
    }
    return result;
  }

  const proteinChunks = splitStringIntoChunks(protein_seq, 10);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ width: '100%' }}>
        {/* Component Title */}
        <Grid size={12}>
          <Typography
            component="div"
            sx={{ ml: { xs: '5%', sm: '2.5%' }, fontSize: 28, fontWeight: 300 }}
          >
            Protein Sequence
          </Typography>
        </Grid>

        <Grid item xs={12} mt={1}>
          <Paper
            elevation={0}
            sx={{
              padding: 3,
              border: '1px solid #c7c7c7',
              background: '#f2f2f2',
            }}
          >
            {/* Protein length indicator */}

            <Grid size={12} mb={3}>
              <Grid container>
                <Grid size={{xs:2, sm:1}} textAlign="right">
                  <Typography
                    component="span"
                    width="100px"
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 16 },
                      paddingRight: '15px',
                      borderRight: '2px solid #0084ff',
                    }}
                  >
                    <b>Length</b>
                  </Typography>
                </Grid>

                <Grid size={{xs:5, sm:4}} textAlign="left" ml={'15px'}>
                  <Typography
                    component="span"
                    width="100px"
                    sx={{ fontSize: { xs: 14, sm: 16, md: 16 },
                          paddingLeft: {xs:0, sm:3, md:1.5}  }}
                  >
                    {protein_seq.length}
                  </Typography>
                </Grid>

                    {/* Copy button
                  <Grid size={{xs:3, sm:6.6}} textAlign="right" mb={-3}>
                      <Button
                      variant="outlined">
                        Copy
                      </Button>
                  </Grid> */}

              </Grid>
            </Grid>

            {/* Protein Sequence */}

            {proteinChunks.map((seq, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: '100px', sm: '130px' },
                  marginBottom: { xs: '0px', sm: '7px' },
                  display: 'inline-block',
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontSize: { xs: 12, sm:16, md: 18 } }}
                >
                  {seq}
                </Typography>
              </Box>
            ))}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
