import React, { useState, useEffect } from 'react';
// import '@nightingale-elements/nightingale-structure';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Structure({ accession }) {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [structureExists, setStructureExists] = useState(false);



  // Check if structure exists, then load component
  useEffect(() => {
    if (!accession) return;

    const checkAndLoad = async () => {
      setIsLoading(true);
      
      // Check if structure exists
      try {
        const response = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${accession}`);
        if (!response.ok) {
          console.warn(`Structure not found for accession: ${accession}`);
          setHasError(true);
          setIsLoading(false);
          return;
        }
        setStructureExists(true);
      } catch (error) {
        console.error('Error checking structure:', error);
        setHasError(true);
        setIsLoading(false);
        return;
      }

      // If structure exists and component not loaded, load it
      if (!isComponentLoaded) {
        try {
          const module = await import('@nightingale-elements/nightingale-structure');
          const NightingaleStructureComponent = module.default;
          
          if (!window.customElements.get('nightingale-structure')) {
            window.customElements.define(
              'nightingale-structure',
              NightingaleStructureComponent
            );
          }
          setIsComponentLoaded(true);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load NightingaleStructure:', error);
          setHasError(true);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkAndLoad();
  }, [accession, isComponentLoaded]);



  //   const fetchStructure = async () => {
  //     try {
  //       const response = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${accession}`);

  //       if (response.status === 404) {
  //         // Handle 404 error without throwing
  //         setHasError(true);
  //         console.warn(`Structure not found for accession: ${accession}`);
  //       } else if (response.ok) {
  //         setHasError(false);
  //       }
  //     } catch (error) {
  //       // Handle network or parsing errors
  //       console.error('Error fetching structure:', error);
  //       setHasError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchStructure();
  // }, [accession]);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ width: '100%' }}>

    {/* Component Title */}
      <Grid size={12}>
          <Typography
            component="div"
            style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
          >
            Predicted Structure
          </Typography>
        </Grid>


        <Grid size={12}>
          {isLoading ? (
            <Typography variant="h6">Loading structure viewer...</Typography>
          ) : hasError ? (
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color="error">
                Error: Unable to load structure viewer
              </Typography>
            </div>
          ) : accession ? (
            !isComponentLoaded || !structureExists ? (
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                  Structure not found
                </Typography>
              </div>
            ) : (
              <div>
                <nightingale-structure
                  protein-accession={accession}
                  height="500px"
                  structure-id={`AF-${accession}-F1`}
                  hide-table
                />
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6">No structure available</Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
