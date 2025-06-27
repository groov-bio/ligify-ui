import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/About.js';
import Search from './Components/Search.js';


function App() {
  return (
    <BrowserRouter>

        <Container maxWidth="90vw" sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
            <img width="370" src="Ligify_Logo.png"/>

          <Box sx={{width: {xs:'80%', sm: '50%', md:'50%'} }} mb={3}>

      <Routes>

          <Route path="/" element={<About />} />

          <Route path="/search" element={<Search />} />

      </Routes>

    
      </Box>
          
          </Container>

    </BrowserRouter>
  );
}

export default App;
