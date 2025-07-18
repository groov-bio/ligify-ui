//PredictedPromoter.js

import {
    Typography,
    Button
  } from '@mui/material';
  import {Grid, Paper, Box} from '@mui/material';
  
  export default function PredictedPromoter({ promoter }) {



      return (


        <Box sx={{ flexGrow: 1 }}>
        <Grid container style={{ width: '100%' }}>
          {/* Component Title */}
          <Grid size={12}>
            <Typography
              component="div"
              sx={{ ml: { xs: '5%', sm: '2.5%' }, fontSize: 28, fontWeight: 300 }}
            >
              Predicted Promoter Sequence
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
              {/* Length indicator */}
  
              <Grid size={{xs:12, sm:12, md:12}} mb={3}>
                <Grid container>

                  <Grid  size={{xs:3, sm:1}} textAlign="right">
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
                      sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}
                    >
                      {promoter.length}
                    </Typography>
                  </Grid>

                      {/* Copy button */}
                  <Grid size={{xs:3, sm:6.5}} textAlign="right">
                      <Button
                      variant="outlined">
                        Copy
                      </Button>
                  </Grid>
                </Grid>
              </Grid>
  
              {/* Promoter Sequence */}
  

                <Box
                  sx={{
                    marginBottom: { xs: '0px', sm: '7px' },
                    display: 'inline-block',
                  }}
                >
             <Typography fontSize={18} sx={{wordBreak:"break-word", overflowWrap:"break-word"}}>
                 {promoter}
             </Typography>
                </Box>

            </Paper>
          </Grid>
        </Grid>
      </Box>



    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container style={{ width: '100%' }}>

    //       {/* Component Title */}
    //     <Grid size={12} >
    //       <Typography
    //         component="div"
    //         style={{ marginLeft: '5%', fontSize: 28, width: '100%', fontWeight: 300 }}
    //       >
    //         Predicted Promoter
    //       </Typography>
    //     </Grid>

    //     <Grid size={12}>
    //       <Paper
    //         elevation={0}
    //         sx={{
    //           border: '1px solid #c7c7c7',
    //           padding: 3,
    //           // height: { xs: '300px', sm: '500px' },
    //         }}
    //       >

    //         <Typography fontSize={18} sx={{wordBreak:"break-word", overflowWrap:"break-word"}}>
    //             {promoter}
    //         </Typography>

    //         </Paper>
    //     </Grid>

    //     </Grid>
    // </Box>

        );

    }