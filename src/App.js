import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';


import Home from './Components/HomePage/Home.js';
import NavigationBar from './Components/NavigationBar.js';
import RegulatorTable from './Components/BrowsePage/RegulatorTable.js'
import RegulatorPage from './Components/RegulatorPage/RegulatorPage.js'
// import About from './Components/About.js';
// import Search from './Components/Search.js';



import './css/App.css';





// import AddSensor from './Components/addSensor/AddSensor.js';
// import RegFamilyTiles from './Components/RegFamilyTiles.js';
// import Account from './Components/About/Account/Account.js';
// import Admin from './Components/About/Admin/Admin.js';
// import About from './Components/About/About.js';
// import Tools from './Components/Tools.js';



export default function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const setUser = useUserStore(context => context.setUser);
  
  // Check for authenticated user on app initialization
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await checkAuthStatus(setUser);
  //     } catch (err) {
  //       return;
  //     }
  //   };
    
  //   checkAuth();
  // }, [setUser]);
  
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
          {/* <Route path="/about/*" element={<About />} /> */}
        </Routes>
      </Box>
    </Box>
    </BrowserRouter>
  )
}









// function App() {
//   return (
//     <BrowserRouter>

//         <Container maxWidth="90vw" sx={{
//           justifyContent: 'center',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}>
//             <img width="370" src="Ligify_Logo.png"/>

//           <Box sx={{width: {xs:'80%', sm: '50%', md:'50%'} }} mb={3}>

//       <Routes>

//           <Route path="/" element={<About />} />

//           <Route path="/search" element={<Search />} />

//       </Routes>

    
//       </Box>
          
//           </Container>

//     </BrowserRouter>
//   );
// }

// export default App;
