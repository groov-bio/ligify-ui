import React from 'react';

import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';

export default function Usage() {
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
        Usage
      </Typography>

      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={1}
        fontWeight="300"
        gutterBottom
      >
        Querying LigifyDB
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        ligify<sup>DB</sup> is an open-source database of bacterial transcription factor-ligand associations
        predicted by genome context. The objective of ligify<sup>DB</sup> is to help researchers reveal the 
        landscape of small molecules that bacteria respond to, which also aims to grow the catalog of chemical-responsive
        geneitic sensors available for biotechnological applications. This resource was created in 2025 by{' '}
        <a href="https://simondoelsnitz.com" target="__blank__">
          Simon d'Oelsnitz
        </a>{' '}
        and Joshua D. Love.
      </Typography>


        <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Building biosensor plasmids
      </Typography >

      <Box
          component="img"
          mb={2}
          ml={"25%"}
          sx={{ width:'50%'}}
          src={'/Ligify_PlasmidDesigner.png'}
          alt="Ligify Plasmid Designer"
        />

      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        The plasmid designer interface enables users to construct their own biosensor-regulated reporter plasmid.
        The following elements are tunable and worth careful consideration.
      </Typography>


      <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon >
              <SpeedIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>Reporter</i></b><br/> 
            Accessing predictions is much faster (milliseconds vs minutes) and computationally less expensive, since 
            all data is pulled from a JSON file and requires virtually zero compute. Furthermore, the entire database can be downloaded locally
            (scroll down).
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SpeedIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>Inducible Promoter</i></b><br/> 
                Data visualizations are much more rich and interactive since they are now hosted from a React application 
                rather than a streamlit server. This includes features for protein structure, ligand structure, and genome context.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SpeedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>Expression Promoter</i></b><br/> 
                Advanced searches can be performed by applying various filters to the entire dataset. For example, a user can 
                filter the dataset based on a regulator's size, annotation, rank, organism, operon size, or distance to the associated enzyme. In 
                addition, characterized regulators in groovDB with over 40% identity to ligifyDB regulators are linked, enabling users to support
                inferences about the ligand or DNA binding properties of the predicted regulator.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SpeedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>RBS</i></b><br/> 
                A new plasmid designer interface enables users to construct their own reporter plasmid that uses the target biosensor
                to regulate the expression of a fluorescent protein. The output of the function is an annotated
                GenBank file that users can download, build and test in the lab. A modular and well-insulated circuit architecture
                is used by default.
            </ListItemText>
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SpeedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>Backbone</i></b><br/> 
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
