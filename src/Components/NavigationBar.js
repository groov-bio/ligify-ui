import React, { useState, useEffect } from 'react';

import {
  AppBar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Fade,
  useMediaQuery,
  useTheme,
  Avatar,
} from '@mui/material';

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Person from '@mui/icons-material/Person';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const navItems = ['Browse', 'Tools', 'About'];
const linkItems = ['/database', '/tools', '/about/about-groovdb'];
const aboutTitles = [
  'About groovDB',
  'Citing',
  'Contributing',
  'Contact',
  'Change Log',
];
const aboutLinks = [
  '/about/about-groovdb',
  '/about/cite',
  '/about/contributing',
  '/about/contact',
  '/about/change-log',
];
const indexes = [0, 1, 2];

export default function NavigationBar(props) {
  // State that defines whether or not the top left button was clicked
  const [mobileOpen, setMobileOpen] = useState(false);

  // State to manage the open/close status of the "About" dropdown
  const [aboutOpen, setAboutOpen] = useState(false);

  //To detect size of screen
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Open or close side bar menu in mobile format.
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAboutToggle = () => {
    setAboutOpen(!aboutOpen);
  };

  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
    setAvatarOpen(!avatarOpen);
  };
  const handleAvatarClose = () => {
    setAvatarAnchorEl(null);
  };




  return (
    <>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: 'black',
          alignItems: { xs: 'left', sm: 'center' },
        }}
        id="top_menu_bar"
      >
        {/* Home section */}

        {/* groovDB logo that links to Home */}
        <Box
          sx={{ display: { xs: 'none', sm: 'block' } }}
          style={{ position: 'absolute', left: 0 }}
        >
          <Button sx={{ marginLeft: { sm: 1, md: 5 } }}>
            <Link to={'/home'}>
              <Box
                component="img"
                sx={{ height: '50px' }}
                src="/groovDB_Icon.png"
                alt="groovDB_icon"
              />
            </Link>
          </Button>
        </Box>

        <Toolbar>
          {/* show only in mobile format */}
          {/* three little slits icon */}
          <IconButton
            disableRipple
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {mobileOpen ? (
              <CloseIcon onClick={handleDrawerToggle} sx={{ width: 70 }} />
            ) : (
              <MenuIcon onClick={handleDrawerToggle} sx={{ width: 70 }} />
            )}

            <Link to="/home">
              <Box
                component="img"
                display="flex"
                justifyContent="center"
                sx={{ height: '30px', ml: 5 }}
                src="/groovDB_icon_mobile.png"
                alt="groovDB_icon"
              />
            </Link>
          </IconButton>

          <Box
            sx={{ display: { xs: 'none', sm: 'block' } }}
            style={{ alignItems: 'center' }}
          >
            {/* Browse sections */}
            {indexes.map((index) => (
              <Button
                key={index}
                sx={{
                  color: '#fff',
                  marginLeft: 5,
                  marginRight: { sm: 2, md: 5 },
                }}
              >
                <Link
                  to={linkItems[index]}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontSize: 20,
                    fontWeight: 300,
                  }}
                >
                  {navItems[index]}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>

      </AppBar>

      {/* This is the white box that flips out from the top */}
      {mobileOpen ? (
        <List
          style={{
            backgroundColor: 'white',
            position: 'fixed',
            width: '100%',
            paddingTop: '70px',
            zIndex: 1000,
            borderBottom: '1px solid black',
          }}
        >
          {indexes.map((index) => (
            <React.Fragment key={index}>
              {navItems[index] === 'About' ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleAboutToggle}>
                      <Typography
                        style={{
                          fontSize: 20,
                          fontWeight: 300,
                          marginRight: '75%',
                        }}
                      >
                        About
                      </Typography>
                      {aboutOpen ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={aboutOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {aboutTitles.map((title, subIndex) => (
                        <Link
                          to={aboutLinks[subIndex]}
                          onClick={handleDrawerToggle}
                          key={subIndex}
                          style={{
                            color: 'black',
                            textDecoration: 'none',
                            textTransform: 'none',
                            width: '100vw',
                            fontSize: 18,
                            fontWeight: 300,
                          }}
                        >
                          <ListItem key={subIndex} disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              {title}
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <Link
                    to={linkItems[index]}
                    onClick={handleDrawerToggle}
                    style={{
                      width: '100%',
                      textDecoration: 'None',
                    }}
                  >
                    <ListItemButton>
                      <ListItemText>
                        <Typography
                          sx={{ fontSize: 20, fontWeight: 300, color: 'black' }}
                        >
                          {navItems[index]}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      ) : null}
    </>
  );
}
