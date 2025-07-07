import React, { useState, useEffect } from 'react';

import SmilesDrawer from 'smiles-drawer';

import {
  Box,
  Typography,
  Paper,
  Link,
  Divider,
  Pagination,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';

export default function LigandViewer({ ligand }) {
  const [ligandNumber, setLigandNumber] = useState(1);
  const [ligandName, setLigandName] = useState('Loading ...');
  const [smileValid, setSmileValid] = useState([]);

  const changeLigand = (event, value) => {
    setLigandNumber(value);
    console.log(ligandName)
  };

  // Set the displayed chemical structure
  useEffect(() => {
    if (
      ligand[ligandNumber - 1] !== undefined &&
      ligand[ligandNumber - 1].smiles !== ''
    ) {
      setLigandName(ligand[ligandNumber - 1]['name']);
      let ligandSMILES = ligand[ligandNumber - 1]['smiles'];


      let options = {
        compactDrawing: false,
        bondThickness: 1.2,
      };
      let smilesDrawer = new SmilesDrawer.Drawer(options);

      SmilesDrawer.parse(
        ligandSMILES,
        function (tree) {
          smilesDrawer.draw(tree, 'SMILEScanvas');
        },
        function (err) {
          //TODO - remove
        }
      );
    } else {
      //Missing SMILES

      //Clear canvas
      const canvas = document.getElementById('SMILEScanvas');
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      //Write text
      context.font = '30px Arial';
      context.fillText('Please enter a SMILES to get started.', 0, 200);
    }
  }, [ligandNumber, ligand]);

  //Mark is a ligand has at least SMILES
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < ligand.length; i++) {
      if (ligand[i].smiles === '') {
        temp.push(false);
      } else {
        temp.push(true);
      }
    }

    setSmileValid(temp);
  }, [ligand]);

  //TODO - need to figure out how to display something if a ligand SMILES isn't valid
  //TODO - seems like canvas is required

  return (
    <Box sx={{ flexGrow: 1 }} mr={1}>
      <Grid container style={{ width: '100%' }}>
        {/* Component Title */}
        <Grid size={12} >
          <Typography
            component="div"
            style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
          >
            Candidate Ligands
          </Typography>
        </Grid>

        {/* Chemical Structure and Name */}
        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              height: { xs: '300px', sm: '500px' },
            }}
          >
            <a href={"https://pubchem.ncbi.nlm.nih.gov/#query="+ligandName} target="_blank">
            <Box
              sx={{
                width: { xs: '300px' }, //This is being driven by the paper above
                height: { xs: '300px' }, //This is being driven by the paper above
                marginTop: { xs: 0, sm: '100px' },
                marginBottom: { xs: 0, sm: '100px' },
                margin: 'auto',
                display: 'block',
              }}
              id="daBox"
            >
              <canvas
                style={{
                  width: '100%',
                  height: '100%',
                }}
                id="SMILEScanvas"
              />
            </Box>
            </a>
            <Typography
              component="div"
              mt={{xs:7,sm:-6}}
              sx={{ textAlign: 'center', fontSize: 18, fontWeight: 400 }}
            >
              { ligandName.length > 50 ? 
                    ligandName.slice(0, 50) + "..." 
              : ligandName}
            </Typography>
          </Paper>
        </Grid>

        {/* Pagination */}
        <Grid size={12} mb={3} mt={2}>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={ligand.length}
              page={ligandNumber}
              onChange={changeLigand}
              size="small"
            />
          </Stack>
        </Grid>


      </Grid>
    </Box>
  );
}
