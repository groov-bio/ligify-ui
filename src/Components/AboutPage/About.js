import {
    Box,
    Grid,
    Drawer,
    List,
    Typography,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
  } from '@mui/material';

export default function About() {

    const theme = useTheme();
    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));


    return (

        <Box>
        <Grid
            container
            spacing={4}
            columns={12}
            alignItems="center"
            justifyContent="center"
        >
            {isNotSmallScreen ? (
            <Drawer
                variant="permanent"
                sx={{
                width: 240,
                zIndex: 1,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: { sm: 200, md: 240 },
                    boxSizing: 'border-box',
                },
                }}
            >
                <List sx={{ marginTop: 15 }}>
                    <ListItem
                    button
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="topic" />
                    </ListItem>
                </List>
            </Drawer>
            ) : null}
    

            <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
                ml: 0,
                mt: 10,
            }}
            >
                {/* Default About section */}
                
         <Box>
    
         <Typography align="center" sx={{fontSize:15}}>
             Predict microbial transcription factors responsive to your chemical
             using a guilt-by-association model.
         </Typography>
         <Typography align="center" sx={{fontSize:15}} mt={1}>
             Previous version of Ligify <a href="https://ligify.streamlit.app/" target="_blank" rel="noopener noreferrer"> here</a>.
         </Typography>
         <Typography align="center" sx={{fontSize:15}} mt={1}>
             More information <a href="https://pubs.acs.org/doi/10.1021/acssynbio.4c00372" target="_blank" rel="noopener noreferrer"> here</a>.
         </Typography>
    
       </Box>


            </Box>
        </Grid>
        </Box>
    );
          




//     <Box>
    
//     <Typography align="center" sx={{fontSize:15}}>
//         Predict microbial transcription factors responsive to your chemical
//         using a guilt-by-association model.
//     </Typography>
//     <Typography align="center" sx={{fontSize:15}} mt={1}>
//         Previous version of Ligify <a href="https://ligify.streamlit.app/" target="_blank" rel="noopener noreferrer"> here</a>.
//     </Typography>
//     <Typography align="center" sx={{fontSize:15}} mt={1}>
//         More information <a href="https://pubs.acs.org/doi/10.1021/acssynbio.4c00372" target="_blank" rel="noopener noreferrer"> here</a>.
//     </Typography>

//   </Box>

};