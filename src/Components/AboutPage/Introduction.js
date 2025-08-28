import React from 'react';

import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import GitHubIcon from '@mui/icons-material/GitHub';
import ComputerIcon from '@mui/icons-material/Computer';
import BoltIcon from '@mui/icons-material/Bolt';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import BuildIcon from '@mui/icons-material/Build';


export default function Introduction() {
  return (
    <Box
      mb={5}
      sx={{
        marginLeft: { xs: '10vw', sm: '35vw', md: '30vw' },
        marginRight: { xs: '10vw', sm: '5vw', md: '15vw' },
      }}
    >
      <Typography
        sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }}
        fontWeight="500"
        gutterBottom
      >
        A database of predicted biosensors
      </Typography>
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Ligify<sup>DB</sup> is an open-source database of bacterial transcription factor-ligand associations
        predicted from genome context. The objective of Ligify<sup>DB</sup> is to <b> provide researchers with leads </b>
        to biosensors responsive to any desired chemical. Ultimately, we hope this tool will help grow the catalog of chemical-responsive
        geneitic sensors available for biotechnological applications. 
      </Typography>

      <List>
          <ListItem >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              Created in 2025 by{' '}
              <a href="https://simondoelsnitz.com" target="__blank__">
                Simon d'Oelsnitz
              </a>{' '}
              and Joshua D. Love
            </ListItemText>
          </ListItem>

          <ListItem >
            <ListItemIcon>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              Previous version{' '}
              <a href="https://ligify.streamlit.app/" target="__blank__">
                available on Streamlit
              </a>
            </ListItemText>
          </ListItem>

          <ListItem >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              Source code is publicly available on GitHub:{' '}
              <a href="https://github.com/groov-bio/ligify-ui" target="__blank__">
                https://github.com/groov-bio/ligify-ui
              </a>{' '}
            </ListItemText>
          </ListItem>

      </List>


      <Box
          component="img"
          sx={{ width:'40%'}}
          src={'/Biosensor_structure.png'}
          alt="Biosensor structure"
        />


      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Prediction method
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        The Ligify workflow starts by using the small molecule input 
        to fetch enzymatic reaction IDs associated with that small molecule from the{' '}
        <a href="https://www.rhea-db.org/" target="__blank__"> Rhea database</a>{' '}. 
        Reaction IDs are then used to fetch all bacterial enzymes in UniProt associated with each reaction, and highly 
        homologous enzymes are filtered to limit redundancy. For each unique enzyme associated with the small molecule 
        input, genes encoded nearby the enzyme are fetched from the NCBI Gene database, and their annotations are scanned 
        for the terms “regulator”, “repressor”, and “activator”. If a regulator is found, the corresponding promoter element 
        is retrieved. For regulators expressed in the opposite direction as the enzyme, the region of noncoding DNA between 
        these genes is extracted as the promoter element. For regulators expressed in the same direction as the enzyme, the 
        first region of noncoding DNA upstream from both the regulator and enzyme, which is over 100 base pairs long, is extracted 
        as the promoter element. Finally, a rank for each regulator is calculated based on a set of heuristics, including the 
        regulator–enzyme distance, the operon size, and the number of regulators in the operon.
        This algorithm was initially described in{' '}
        <a href="https://pubs.acs.org/doi/10.1021/acssynbio.4c00372" target="_blank" rel="noopener noreferrer">this publication</a>.
      </Typography >        

      <Box
          component="img"
          sx={{ width:'40%'}}
          src={'/Biosensor_structure.png'}
          alt="Biosensor structure"
        />


        <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Comparison to previous version
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        The previous version of Ligify was hosted on a streamlit app and required computing predictions on demand.
        The new version, Ligify<sup>DB</sup>, is a standalone database of pre-computed predictions that provides the following benefits. 
      </Typography>

      <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon >
              <BoltIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>SPEED</i></b><br/> 
            Accessing predictions is much faster (milliseconds vs minutes) and computationally less expensive, since 
            all data is pulled from a JSON file and requires virtually zero compute. Furthermore, the entire database can be downloaded locally
            (scroll down).
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <BarChartIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>VISUALIZATIONS</i></b><br/> 
                Data visualizations are much more rich and interactive since they are now hosted from a React application 
                rather than a streamlit server. This includes features for protein structure, ligand structure, and genome context.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SearchIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>SEARCH</i></b><br/> 
                Advanced searches can be performed by applying various filters to the entire dataset. For example, a user can 
                filter the dataset based on a regulator's size, annotation, rank, organism, operon size, or distance to the associated enzyme. In 
                addition, characterized regulators in groovDB with over 40% identity to ligifyDB regulators are linked, enabling users to support
                inferences about the ligand or DNA binding properties of the predicted regulator.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <BuildIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>BUILD</i></b><br/> 
                A new plasmid designer interface enables users to construct their own reporter plasmid that uses the target biosensor
                to regulate the expression of a fluorescent protein. The output of the function is an annotated
                GenBank file that users can download, build and test in the lab. A modular and well-insulated circuit architecture
                is used by default.
            </ListItemText>
          </ListItem>

      </List>







    </Box>
  );
}
