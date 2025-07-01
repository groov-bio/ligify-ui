import React, { useState, useEffect } from 'react';
import ProtvistaStructure from 'protvista-structure';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function Structure({ accession }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchStructure = async () => {
      try {
        const response = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${accession}`);

        if (response.status === 404) {
          // Handle 404 error without throwing
          setHasError(true);
          console.warn(`Structure not found for accession: ${accession}`);
        } else if (response.ok) {
          setHasError(false);
        }
      } catch (error) {
        // Handle network or parsing errors
        console.error('Error fetching structure:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStructure();
  }, [accession]);



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
            hasError ? (
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                  Error: Structure not found (404)
                </Typography>
              </div>
            ) : (
              <protvista-structure
                key={accession} // Forces re-mounting on accession change
                height="500px"
                accession={accession}
                structureID={`AF-${accession}-F1`}
                // data={structureData} // Pass fetched data directly
                hide-table
              />
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

// Define the custom element if not already defined elsewhere
if (!window.customElements.get('protvista-structure')) {
  window.customElements.define('protvista-structure', ProtvistaStructure);
}
