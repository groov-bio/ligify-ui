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
import { Link } from 'react-router-dom';


// Import data
import data from '../../ligify_regulators_with_uniprot.json'



const Search = () => {
  // State for the main "smiles" input
  const [smiles, setSmiles] = useState("C=CC(=O)[O-]");


  // State for API response
  const [apiResponse, setApiResponse] = useState(data);


  // State for loading and error
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes for the main "smiles" input
  const handleSmilesChange = (e) => {
    setSmiles(e.target.value);
  };


  // Used for testing purposes. Fetches data from a cached result
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setApiResponse(data);
    setLoading(false);
    console.log('Response from API:', data);
  }

  return (
    <form onSubmit={handleSubmit2} >
      <Grid container spacing={2}>

        <Grid item
          width="45%"
          textAlign="center">
            <Link to="/database">
        <Button 
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Browse
          </Button>
          </Link>
        </Grid>

        <Grid item
          width="45%"
          textAlign="right">
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
                  {/* Submit Button */}
        <Grid  
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
        </Grid>




        </Grid>





        {/* API Response */}

              {/* Spacer */}
              {/* <Grid size={{xs:0, sm:1, md:2}}></Grid> */}
        {/* <Grid size={{xs:12, sm:10, md:8}}> */}


          {/* <LigandTable
            ligand={data}
          /> */}


        {/* <RegulatorTable
            regulators={data}
          /> */}

        {/* </Grid> */}


        {/* Error Message */}
        {/* {errorMessage && (
          <Grid item xs={12}>
            <Alert severity="error">
              <Typography variant="h6">Error:</Typography>
              <p>{errorMessage}</p>
            </Alert>
          </Grid>
        )} */}
      </Grid>


    </form>
  );
};

export default Search;
