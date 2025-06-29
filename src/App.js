import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './Components/HomePage/Home.js';
import NavigationBar from './Components/NavigationBar.js';
import RegulatorTable from './Components/BrowsePage/RegulatorTable.js'
import RegulatorPage from './Components/RegulatorPage/RegulatorPage.js'
import About from './Components/AboutPage/About.js';



import './css/App.css';




export default function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <BrowserRouter>
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows={isSmallScreen ? `56px` : `64px`}
      gridAutoRows="auto"
      sx={{ height: '100vh' }}
    >
      <Box gridColumn="span 12">
        <NavigationBar />
      </Box>
      <Box gridColumn="span 12">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<RegulatorTable />} />
          <Route path="/database/:refseq" element={<RegulatorPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
    </BrowserRouter>
  )
}
