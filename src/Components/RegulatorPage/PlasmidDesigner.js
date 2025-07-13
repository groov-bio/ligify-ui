import React from 'react';

import { Box, Grid, Typography, Paper } from '@mui/material';

export default function PlasmidDesigner(data) {




    const handleDownload = () => {
        const plasmid = "ATGCTAGC"
        // const plasmid = regulator.plasmid_sequence
    
        // Define the file name and type
        const fileName = data.refseq+'_plasmid.gb';
        const mimeType = 'text/plain';
    
        // Create a Blob from the plasmid sequence
        const blob = new Blob([plasmid], { type: mimeType });
    
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
    
        // Append the anchor to the body
        document.body.appendChild(a);
    
        // Programmatically click the anchor to trigger the download
        a.click();
    
        // Clean up by removing the anchor and revoking the object URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };



  return (
    <Box sx={{ flexGrow: 1 }}>




        {/* <Grid size={12} mt={3}  mb={2} textAlign="center">
          <Button 
            variant="contained"
            color="secondary"
            type="submit"
            style={{fontSize:12}}
            onClick={handleDownload}
            // disabled={loading}
            // startIcon={loading && <CircularProgress size={20} />}
          >
            Download Plasmid
          </Button>
          </Grid> */}



      <Grid container style={{ width: '100%' }}>

        {/* Component Title */}
        <Grid size={12}>
          <Typography
            component="div"
            sx={{ ml: { xs: '5%', sm: '2.5%' }, fontSize: 28, fontWeight: 300 }}
          >
            Plasmid Designer
          </Typography>
        </Grid>

        <Grid size={12} mt={1}>
          <Paper
            elevation={0}
            sx={{
              padding: 3,
              border: '1px solid #c7c7c7',
              background: '#f2f2f2',
            }}
          >
            {/* Plasmid length indicator */}

            <Grid size={{xs:6, sm:10, md:6}} mb={3}>
              <Grid container>
                <Grid item xs={5} sm={2} textAlign="right">
                  <Typography
                    component="span"
                    width="100px"
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 16 },
                      paddingRight: '15px',
                      borderRight: '2px solid #0084ff',
                    }}
                  >
                    <b>Size</b>
                  </Typography>
                </Grid>

                <Grid item xs={5} sm={4} textAlign="left" ml={'15px'}>
                  <Typography
                    component="span"
                    width="100px"
                    sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}
                  >
                    4,128 bp
                  </Typography>
                </Grid>
              </Grid>
            </Grid>


            {/* <Typography
              component="div"
              sx={{ fontSize: { xs: 16, sm: 22 }, overflowWrap: 'anywhere' }}
            >
              {props.sequence}
            </Typography> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
