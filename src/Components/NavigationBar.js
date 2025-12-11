import React from 'react';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
} from '@mui/material';

import { Link } from 'react-router-dom';




const navItems = ['Home', 'Browse', 'About'];
const linkItems = ['/home', '/database', '/about'];

const indexes = [0, 1, 2];

export default function NavigationBar() {

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

        {/* LigifyDB logo that links to Home ONLY IN DESKTOP */}
        <Box
          sx={{ display: { xs: 'none', sm: 'block' } }}
          style={{ position: 'absolute', left: 0 }}
        >
          <Button sx={{ marginLeft: { sm: 1, md: 5 } }}>
            <Link to={'/home'}>
              <Box
                component="img"
                sx={{ height: '50px' }}
                src="/Ligify_Logo_Dark2.png"
                alt="Ligify logo dark"
              />
            </Link>
          </Button>
        </Box>


        <Toolbar>
            {/* Home/Browse/About sections ONLY IN DESKTOP */}
          <Box
            sx={{ display: { xs: 'none', sm: 'block' } }}
            style={{ alignItems: 'center' }}
          >
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







                    {/* LigifyDB logo that links to Home ONLY IN MOBILE */}
          <IconButton
            disableRipple
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ display: { sm: 'none' } }}
          >

            <Link to="/home">
              <Box
                component="img"
                display="flex"
                justifyContent="center"
                sx={{ height: '40px' }}
                src="/Ligify_Logo_Dark.png"
                alt="Ligify logo dark"
              />
            </Link>


            <Button
                sx={{
                  color: '#fff',
                  marginLeft: 3,
                  marginRight: { sm: 2, md: 5 },
                }}
              >
                <Link
                  to={'/database'}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 300,
                  }}
                >
                  Browse
                </Link>
            </Button>

            <Button
                sx={{
                  color: '#fff',
                  marginLeft: 5,
                  marginRight: { sm: 2, md: 5 },
                }}
              >
                <Link
                  to={'/about'}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 300,
                  }}
                >
                  About
                </Link>
            </Button>

          </IconButton>
          
        </Toolbar>

      </AppBar>



    </>
  );
}
