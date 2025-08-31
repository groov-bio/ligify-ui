import React, { useState } from 'react';
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
  Chip
} from '@mui/material';


export default function Search() {

  const [searchTab, setSearchTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSearchTab(newValue);
  };


  const [smiles, setSmiles] = useState('');
  const [threshold, setThreshold] = useState(0.2);
  const [maxResults, setMaxResults] = useState(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);




  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();                       // prevent page reload
    const data = new FormData(event.currentTarget);
    const refseq = (data.get("refseq") || "").trim();
    const smiles = (data.get("smiles") || "").trim();

    if (refseq) {
      navigate(`/database/${encodeURIComponent(refseq)}`);
    }
    if (smiles) {
      setSmiles(smiles);
      handleLigandSearch(smiles);

      // navigate(`/database/${encodeURIComponent(smiles)}`);
    }
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
      
      // Format results
      if (data.results && data.results.length > 0) {
        
        const formattedResults = data.results.map(result => {
          // const family = rawData[result.sensorId].family;
          // const alias = rawData[result.sensorId].alias;

          return {
            sensorId: result.regulatorId,
            ligandId: result.ligandId,
            name: result.name || result.ligandId,
            similarity: result.similarity,
            // link: `/database/${family}/${alias}`,
            label: `${result.name || result.ligandId}`
          }
        });

        console.log(formattedResults);

        setSearchResults(formattedResults);
        
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setError('Error searching: ' + error.message);
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
            {/* <Tab label="Sequence" /> */}
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

        ) : (

          <Box component="form" noValidate justify="center" onSubmit={handleSubmit}>
            <TextField
                    name="refseq"
                    sx={{ width: '100%' }}
                    label= 'RefSeq ID'
                    variant="outlined"
                    placeholder="Enter RefSeq (e.g., WP_003963520.1)"
                  />
          </Box>

        ) 

        // Eventually enable "search via sequencing" using BLAST

      //   : (

      // <Box component="form" noValidate justify="center" onSubmit={handleSubmit}>
      //     <TextField
      //             name="seq"
      //             sx={{ width: '100%' }}
      //             label= 'Regulator sequence'
      //             variant="outlined"
      //             placeholder="Enter sequence (e.g., MPEVQTDHPETAELSKP...)"
      //           />
      // </Box>
      //   )
      }    

      {/* Results Area - Fixed Height Container */}
      <Box sx={{ 
        mt: 2, 
        // minHeight: searchTab === 1 ? '400px' : '0px',
        maxHeight: '500px',
        overflow: 'auto'
      }}>
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
