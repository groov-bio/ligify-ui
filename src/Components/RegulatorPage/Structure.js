import React, { useState, useEffect } from 'react';
// import '@nightingale-elements/nightingale-structure';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAlphaFold } from '../../lib/queries';

export default function Structure({ accession }) {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  const { isLoading, isError: hasError, isSuccess: structureExists } = useAlphaFold(accession);

  // Load the nightingale web component once we know the structure exists
  useEffect(() => {
    if (!structureExists || isComponentLoaded) return;

    import('@nightingale-elements/nightingale-structure')
      .then(module => {
        if (!window.customElements.get('nightingale-structure')) {
          window.customElements.define('nightingale-structure', module.default);
        }
        setIsComponentLoaded(true);
      })
      .catch(err => console.error('Failed to load NightingaleStructure:', err));
  }, [structureExists, isComponentLoaded]);




  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ width: '100%' }}>

    {/* Component Title */}
      <Grid size={12}>
          <Typography
            component="div"
            style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
          >
            Structure
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

                <a href={`https://alphafold.ebi.ac.uk/entry/${accession}`} target="__blank" 
                  style={{textDecoration:"None", display:'block',textAlign:"center", marginTop: 10}}>
                  <Typography variant="h6" display="inline" color="black"
                      sx={{fontSize: { xs: 18, sm: 20 }}}>
                    Source: 
                  </Typography>
                  <Typography variant="h6" display="inline" color="blue" marginLeft="3px"
                      sx={{fontSize: { xs: 18, sm: 20 }}}>
                    AlphaFold DB
                  </Typography>
                </a>
        </Grid>
      </Grid>
    </Box>
  );
}
