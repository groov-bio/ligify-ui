// src/UserDataForm.js
import React, { useState } from 'react';
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UserDataForm = () => {
  // State for the main "smiles" input
  const [smiles, setSmiles] = useState('');

  // State for the advanced filters
  const [filters, setFilters] = useState({
    max_reactions: 20,
    proteins_per_reaction: 20,
    reviewed: true,
    lineage: 'Family',
    max_operons: 20,
    max_alt_chems: 10,
  });

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      smiles,
      filters,
    };
    console.log('Data to send:', JSON.stringify(dataToSend, null, 2));
    // TODO: Send the data to the API using fetch or axios
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <Grid container spacing={2}>
        {/* Smiles Input */}
        <Grid item xs={12}>
          <TextField
            label="SMILES"
            variant="outlined"
            fullWidth
            value={smiles}
            onChange={handleSmilesChange}
            required
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} mb={5}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>

        {/* Advanced Parameters Accordion */}
        <Grid item xs={12}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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

    </form>
  );
};

export default UserDataForm;
