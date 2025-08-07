import React, { useRef } from 'react';
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

import LigifyDB from "./LigifyDB.js";
import Usage from "./Usage.js"
import Statistics from "./Statistics.js"
import Citation from "./Citation.js"
import Contact from "./Contact.js"

export default function About() {

    const theme = useTheme();
    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

      // Create refs for each section
    const ligifyDBRef    = useRef(null);
    const usageRef    = useRef(null);
    const statisticsRef  = useRef(null);
    const citationRef    = useRef(null);
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
                    onClick={() => handleScroll(ligifyDBRef)}
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
                bgcolor: 'background.default',
                p: 3,
                ml: 0,
                mt: 10,
            }}
            >
                {/* Default About section */}

        <Box
            ref={ligifyDBRef}
            id="introduction"
            sx={{ scrollMarginTop: '80px' }}  // adjust for any fixed headers
          >
            <LigifyDB/>
        </Box>

        <Box
            ref={usageRef}
            id="usage"
            sx={{ scrollMarginTop: '80px' }}
          >
            <Usage />
          </Box>

          <Box
            ref={statisticsRef}
            id="statistics"
            sx={{ scrollMarginTop: '80px' }}
          >
            <Statistics />
          </Box>

          <Box
            ref={citationRef}
            id="citation"
            sx={{ scrollMarginTop: '80px' }}
          >
            <Citation />
          </Box>

          <Box
            ref={contactRef}
            id="contact"
            sx={{ scrollMarginTop: '80px' }}
          >
            <Contact />
          </Box>


            </Box>
        </Grid>
        </Box>
    );
          


};