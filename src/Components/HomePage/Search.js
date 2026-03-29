import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  Tab,
  Tabs,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Alert,
  Chip,
  Autocomplete,
  Button
} from '@mui/material';


export default function Search() {

  const [searchTab, setSearchTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSearchTab(newValue);
  };


  const [smiles, setSmiles] = useState('');
  const threshold = 0.2;
  const maxResults = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Chemical name search state
  const [selectedChem, setSelectedChem] = useState(null);
  const [chemInputValue, setChemInputValue] = useState('');
  const [chemMap, setChemMap] = useState([]);

  useEffect(() => {
    fetch('https://groov-api.com/ligify_chem_map.json')
      .then(res => res.json())
      .then(data => setChemMap(data))
      .catch(() => {}); // fail silently; autocomplete just stays empty
  }, []);

  const iupacToName = useMemo(() => {
    const map = {};
    for (const entry of chemMap) {
      if (entry.iupac) map[entry.iupac.toLowerCase()] = entry.name;
    }
    return map;
  }, [chemMap]);

  const chemFilterOptions = (options, { inputValue }) => {
    const lower = inputValue.toLowerCase().trim();
    if (!lower) return options.slice(0, 20);

    const scored = [];
    for (const o of options) {
      const name = o.name.toLowerCase();
      const iupac = o.iupac.toLowerCase();
      let score;
      if (name === lower)              score = 0; // exact
      else if (name.startsWith(lower)) score = 1; // name starts-with
      else if (iupac.startsWith(lower))score = 2; // iupac starts-with
      else if (name.includes(lower))   score = 3; // name contains
      else if (iupac.includes(lower))  score = 4; // iupac contains
      else continue;
      scored.push({ score, o });
    }

    scored.sort((a, b) => a.score - b.score || a.o.name.localeCompare(b.o.name));
    return scored.slice(0, 50).map(s => s.o);
  };


  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const refseq = (data.get("refseq") || "").trim();
    const smilesVal = (data.get("smiles") || "").trim();

    if (refseq) {
      navigate(`/database/${encodeURIComponent(refseq)}`);
    }
    if (smilesVal) {
      setSmiles(smilesVal);
      handleLigandSearch(smilesVal);
    }
  };

  const handleChemNameSearch = () => {
    if (!selectedChem) {
      setError('Please select a chemical from the list');
      return;
    }
    handleLigandSearch(selectedChem.smiles);
  };


  // Ligand search function
  const handleLigandSearch = async (smilesInput = smiles) => {
    if (!smilesInput.trim()) {
      setError('Please enter a SMILES string');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]);
    setHasSearched(true);

    try {
      const response = await fetch(
        'https://api.groov.bio/ligifyLigandSearch',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            smiles: smilesInput,
            threshold,
            maxResults
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedResults = data.results.map(result => {
          const apiName = result.name || result.ligandId;
          const commonName = iupacToName[apiName?.toLowerCase()] || apiName;
          return {
            sensorId: result.regulatorId,
            ligandId: result.ligandId,
            name: commonName,
            similarity: result.similarity,
            label: commonName
          };
        });

        console.log(formattedResults);
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError('Error searching: ' + err.message);
    } finally {
      setLoading(false);
    }
  };




  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={searchTab} onChange={handleTabChange} centered>
            <Tab label="Ligand" />
            <Tab label="RefSeq" />
            <Tab label="Chemical Name" />
          </Tabs>
        </Box>

        {searchTab === 0 ? (

          <Box component="form" noValidate justify="center" onSubmit={handleSubmit}>
            <TextField
                    name="smiles"
                    sx={{ width: '100%' }}
                    label= 'Ligand SMILES'
                    variant="outlined"
                    placeholder="Enter SMILES (e.g., C1=CC(=C(C=C1C(=O)O)O)[O-])"
                  />
          </Box>

        ) : searchTab === 1 ? (

          <Box component="form" noValidate justify="center" onSubmit={handleSubmit}>
            <TextField
                    name="refseq"
                    sx={{ width: '100%' }}
                    label= 'RefSeq ID'
                    variant="outlined"
                    placeholder="Enter RefSeq (e.g., WP_003963520.1)"
                  />
          </Box>

        ) : (

          <Box>
            <Autocomplete
              options={chemMap}
              getOptionLabel={(option) => option.name}
              filterOptions={chemFilterOptions}
              value={selectedChem}
              onChange={(_, newValue) => setSelectedChem(newValue)}
              inputValue={chemInputValue}
              onInputChange={(_, newInputValue) => setChemInputValue(newInputValue)}
              loading={chemMap.length === 0}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chemical Name"
                  variant="outlined"
                  placeholder="e.g., glucose, caffeine, ATP"
                  sx={{ width: '100%' }}
                />
              )}
            />
            {selectedChem && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                SMILES: {selectedChem.smiles}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleChemNameSearch}
              disabled={!selectedChem || loading}
              sx={{ mt: 1.5, width: '100%' }}
            >
              Search
            </Button>
          </Box>

        )}

      {/* Results Area */}
      <Box sx={{ mt: 2, maxHeight: '500px', overflow: 'auto' }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <CircularProgress size={60} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Searching ligands... This may take 10-15 seconds
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Search Results */}
        {hasSearched && !loading && searchResults.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Found {searchResults.length} similar ligands:
            </Typography>
            <List sx={{ pt: 0 }}>
              {searchResults.map((result, index) => (
                <Card key={index} sx={{ mb: 1 }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => navigate(`/database/${result.sensorId}`)}
                        sx={{ p: 0 }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle1">{result.name}</Typography>
                              <Chip
                                label={`${(result.similarity * 100).toFixed(1)}% similar`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                Sensor ID: {result.sensorId}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Ligand ID: {result.ligandId}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        )}

        {/* No Results */}
        {hasSearched && !loading && searchResults.length === 0 && !error && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No similar ligands found. Try adjusting your search parameters.
            </Typography>
          </Box>
        )}
      </Box>

    </Box>
  );
}
