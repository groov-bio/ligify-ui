import React, { useRef } from 'react';
import {
    Box,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
  } from '@mui/material';

import Introduction from "./Introduction.js";
import Usage from "./Usage.js";
import Statistics from "./Statistics.js";
import Download from "./Download.js";
import Citation from "./Citation.js";
import Contact from "./Contact.js";

export default function About() {

    const theme = useTheme();
    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

      // Create refs for each section
    const introductionRef    = useRef(null);
    const usageRef    = useRef(null);
    const statisticsRef  = useRef(null);
    const citationRef    = useRef(null);
    const downloadRef    = useRef(null);
    const contactRef     = useRef(null);

      // Generic scroll handler
  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
                    onClick={() => handleScroll(introductionRef)}
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="Introduction" />
                    </ListItem>

                    <ListItem
                    button
                    onClick={() => handleScroll(usageRef)}
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="Usage" />
                    </ListItem>

                    <ListItem
                    button
                    onClick={() => handleScroll(statisticsRef)}
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="Statistics" />
                    </ListItem>

                    <ListItem
                    button
                    onClick={() => handleScroll(downloadRef)}
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="Download" />
                    </ListItem>

                    <ListItem
                    button
                    onClick={() => handleScroll(citationRef)}
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="Citation" />
                    </ListItem>

                    <ListItem
                    button
                    onClick={() => handleScroll(contactRef)}
                    style={{ marginLeft: '10px' }}
                    >
                    <ListItemText primary="Contact" />
                    </ListItem>
                </List>
            </Drawer>
            ) : null}
    

            <Box
            component="main"
            sx={{
                flexGrow: 1,
                mt: 10,
            }}
            >
                {/* Default About section */}

        <Box
            ref={introductionRef}
            id="introduction"
            mb={10}
            sx={{ scrollMarginTop: '80px' }}  // adjust for any fixed headers
          >
            <Introduction/>
        </Box>

        <Box
            ref={usageRef}
            id="usage"
            mb={10}
            sx={{ scrollMarginTop: '80px' }}
          >
            <Usage />
          </Box>

          <Box
            ref={statisticsRef}
            id="statistics"
            mb={10}
            sx={{ scrollMarginTop: '80px' }}
          >
            <Statistics />
          </Box>

          <Box
            ref={downloadRef}
            id="download"
            mb={10}
            sx={{ scrollMarginTop: '80px' }}
          >
            <Download />
          </Box>

          <Box
            ref={citationRef}
            id="citation"
            mb={10}
            sx={{ scrollMarginTop: '80px' }}
          >
            <Citation />
          </Box>

          <Box
            ref={contactRef}
            id="contact"
            mb={10}
            sx={{ scrollMarginTop: '80px', width:{md:'100vw', lg:'85vw'}, ml:{md:0, lg:'13vw'} }}
          >
            <Contact />
          </Box>


            </Box>
        </Grid>
        </Box>
    );
          


};