import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  Tab,
  Tabs
} from '@mui/material';

// import '../css/App.css';

export default function Search() {
  //Capture screen size
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

      var chemical = encodeURIComponent(smiles);
      console.log(chemical);
      setSmiles(chemical);
      handleLigandSearch();

      // navigate(`/database/${encodeURIComponent(smiles)}`);
    }
  };



  // Ligand search function

  const handleLigandSearch = async () => {
    if (!smiles.trim()) {
      setError('Please enter a SMILES string');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]);
    setHasSearched(true);
    
    try {
      const response = await fetch(
        'https://api.groov.bio/ligandSearch',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            smiles,
            threshold,
            maxResults
            // smiles,
            // threshold,
            // maxResults
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
            sensorId: result.sensorId,
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
    <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={searchTab} onChange={handleTabChange} centered>
            <Tab label="RefSeq" />
            <Tab label="Ligand" />
            <Tab label="Sequence" />
          </Tabs>
        </Box>

        {searchTab === 0 ? (

    <Box component="form" noValidate justify="center" onSubmit={handleSubmit}>
        <TextField
                name="refseq"
                sx={{ width: '100%' }}
                label= 'RefSeq ID'
                variant="outlined"
                placeholder="Enter RefSeq (e.g., WP_003963520.1)"
              />
    </Box>

        ) :  searchTab == 1 ? (
          
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
                  name="seq"
                  sx={{ width: '100%' }}
                  label= 'Regulator sequence'
                  variant="outlined"
                  placeholder="Enter sequence (e.g., MPEVQTDHPETAELSKP...)"
                />
      </Box>

        )
      }    

    </>
  );
}
