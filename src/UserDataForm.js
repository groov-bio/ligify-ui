// src/UserDataForm.js
import React, { useState } from 'react';
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Metrics from './Metrics.js';
import RegulatorTable from './RegulatorTable.js';
import data from './example.json'

const UserDataForm = () => {
  // State for the main "smiles" input
  const [smiles, setSmiles] = useState("C=CC(=O)[O-]");

  // State for the advanced filters
  const [filters, setFilters] = useState({
    max_reactions: 20,
    proteins_per_reaction: 20,
    reviewed: true,
    lineage: 'Family',
    max_operons: 20,
    max_alt_chems: 10,
  });

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
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };



  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setApiResponse(data);
    setLoading(false);
    console.log('Response from API:', data);
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setApiResponse(null);

    const dataToSend = {
      smiles,
      filters,
    };

    try {

      const response = await fetch('https://ligify-api.groov.bio/ligify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Response from API:', JSON.stringify(responseData));
      setApiResponse(responseData);
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit2} style={{ padding: '2rem' }}>
      <Grid container spacing={2}>
        {/* SMILES Input */}
        <Grid size={6} style={{margin: "auto"}}>
          <TextField
            label="SMILES"
            variant="outlined"
            fullWidth
            value={smiles}
            onChange={handleSmilesChange}
            required
          />
        </Grid>

        {/* Advanced Parameters Accordion */}
        <Grid size={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="advanced-parameters-content"
              id="advanced-parameters-header"
            >
              <Typography>Advanced Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Max Reactions */}
                <Grid size={6}>
                  <TextField
                    label="Max Reactions"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="max_reactions"
                    value={filters.max_reactions}
                    onChange={handleFilterChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                {/* Proteins per Reaction */}
                <Grid size={6}>
                  <TextField
                    label="Proteins per Reaction"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="proteins_per_reaction"
                    value={filters.proteins_per_reaction}
                    onChange={handleFilterChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                {/* Reviewed */}
                <Grid size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.reviewed}
                        onChange={handleFilterChange}
                        name="reviewed"
                        color="primary"
                      />
                    }
                    label="Reviewed"
                  />
                </Grid>

                {/* Lineage */}
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel id="lineage-label">Lineage</InputLabel>
                    <Select
                      labelId="lineage-label"
                      id="lineage"
                      name="lineage"
                      value={filters.lineage}
                      label="Lineage"
                      onChange={handleFilterChange}
                    >
                      <MenuItem value="Family">Family</MenuItem>
                      <MenuItem value="Genus">Genus</MenuItem>
                      <MenuItem value="Species">Species</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Max Operons */}
                <Grid size={6}>
                  <TextField
                    label="Max Operons"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="max_operons"
                    value={filters.max_operons}
                    onChange={handleFilterChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                {/* Max Alt Chems */}
                <Grid size={6}>
                  <TextField
                    label="Max Alternative Chems"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="max_alt_chems"
                    value={filters.max_alt_chems}
                    onChange={handleFilterChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
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

        {apiResponse ? 

        <Box style={{width: "100%"}}>

          <Metrics 
            metrics={apiResponse["metrics"]}
          />

          <RegulatorTable
            regulators={apiResponse["regulators"]}
          />

        </Box>
              :
              <></>
        }



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

export default UserDataForm;
