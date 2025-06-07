// src/UserDataForm.js
import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LigandTable from './LigandTable.js';
import RegulatorTable from './RegulatorTable.js';

// This is a cached data file for testing purposes. Not necessary for production
// import data from '../example.json'
// import data from '../database.json'
import data from '../ligify_regulators.json'



const Search = () => {
  // State for the main "smiles" input
  const [smiles, setSmiles] = useState("C=CC(=O)[O-]");

//   // State for the advanced filters
//   const [filters, setFilters] = useState({
//     max_reactions: 20,
//     proteins_per_reaction: 20,
//     reviewed: true,
//     lineage: 'Family',
//     max_operons: 20,
//     max_alt_chems: 10,
//   });

  // State for API response
  const [apiResponse, setApiResponse] = useState(null);


  // State for loading and error
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes for the main "smiles" input
  const handleSmilesChange = (e) => {
    setSmiles(e.target.value);
  };

  // Handle changes for the filter inputs
//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };


  // Used for testing purposes. Fetches data from a cached result
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setApiResponse(data);
    setLoading(false);
    console.log('Response from API:', data);
  }

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage('');
//     setApiResponse(null);

//     const dataToSend = {
//       smiles,
//       filters,
//     };

//     try {

//       const response = await fetch('https://ligify-api.groov.bio/ligify', {

//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const responseData = await response.json();
//       console.log('Response from API:', responseData);
//       setApiResponse(responseData);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       setErrorMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <form onSubmit={handleSubmit2} style={{ padding: '2rem', maxWidth:'90%' }}>
      <Grid container spacing={2}>
        {/* SMILES Input */}

        <Grid size={12} 
            display="flex"
            justifyContent='center'>
          <TextField
            label="SMILES"
            variant="outlined"
            width="300px"
            value={smiles}
            onChange={handleSmilesChange}
            required
          />
        </Grid>


        {/* Submit Button */}
        <Grid container size={12}  
          justifyContent="center"
          >
          <Button 
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>





        {/* API Response */}

        {/* {apiResponse ? 

        <> */}
              {/* Spacer */}
              <Grid size={{xs:0, sm:1, md:2}}></Grid>
        <Grid size={{xs:12, sm:10, md:8}}>

          {/* <Metrics 
            metrics={apiResponse["metrics"]}
          /> */}

          {/* <LigandTable
            ligand={data}
          /> */}
        <RegulatorTable
            regulators={data}
          />

        </Grid>
        {/* </>

              :
              <></>
        } */}



        {/* Error Message */}
        {errorMessage && (
          <Grid item xs={12}>
            <Alert severity="error">
              <Typography variant="h6">Error:</Typography>
              <p>{errorMessage}</p>
            </Alert>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Search;
