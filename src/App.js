import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UserDataForm from './Components/UserDataForm.js';
import Grid from '@mui/material/Grid2';

function App() {
  return (
    <Container maxWidth="90vw" sx={{
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
        <img width="370" src="Ligify_Logo.png"/>

      <Box sx={{width: {xs:'80%', sm: '50%', md:'50%'} }} mb={3}>
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
      <UserDataForm />
    </Container>
  );
}

export default App;
