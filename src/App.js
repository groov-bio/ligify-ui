import React from 'react';
import { Container, Typography } from '@mui/material';
import UserDataForm from './UserDataForm';

function App() {
  return (
    <Container maxWidth="md" sx={{
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        <img width="400" src="Ligify_Logo.png"/>
      {/* <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '2rem' }}>
        Ligify
      </Typography> */}
      <UserDataForm />
    </Container>
  );
}

export default App;
