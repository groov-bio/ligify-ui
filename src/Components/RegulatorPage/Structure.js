import React, { useState, useEffect } from 'react';
// import '@nightingale-elements/nightingale-structure';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Structure({ accession }) {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  // Lazy load ProtvistaStructure only when needed
  useEffect(() => {
    if (
      !isComponentLoaded
    ) {
      setIsLoading(true);
      import('@nightingale-elements/nightingale-structure')
        .then((module) => {
          const NightingaleStructureComponent = module.default;
          // Define the custom element only after the component is loaded
          if (!window.customElements.get('nightingale-structure')) {
            window.customElements.define(
              'nightingale-structure',
              NightingaleStructureComponent
            );
          }
          setIsComponentLoaded(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load NightingaleStructure:', error);
          setIsLoading(false);
        });
    }
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
            <Typography variant="h6">Loading...</Typography>
          ) : accession ? (
            !isComponentLoaded ? (
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                  Error: Structure not found (404)
                </Typography>
              </div>
            ) : (
              <nightingale-structure
                protein-accession={accession} // Forces re-mounting on accession change
                height="500px"
                structure-id={`AF-${accession}-F1`}
                hide-table
              />
            )
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" mt={"50%"}>No structure available</Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
