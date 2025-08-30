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
          sx={{ ml:"10%", width:'80%'}}
          src={'/GraphicAbstract.png'}
          alt="Graphic abstract"
        />

      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Using genome context to predict function 
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
      Transcription factors allosterically bind to two elements: a DNA sequence and a small molecule ligand. 
      Genome context has proven useful to help predict these interactions. 
      For example, a TetR-family regulator co-transcribed with an enzyme that glycosylates the antibiotic kijanimicin 
      {' '}<a href="https://www.sciencedirect.com/science/article/pii/S1074552112004644" target="__blank__">was found to bind</a>{' '}
      specifically to kijanimicin as a ligand.
      Transcription factors also typically 
      {' '}<a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0050562" target="__blank__">regulate their own expression</a>
      , so the DNA sequence they bind is oftentimes located 
      nearby their gene sequence.
      While genome context has been used to manually infer DNA and ligand binding interactions, software tools have been recently 
      built to automate the prediction workflow, including{' '}
      <a href="https://pubs.acs.org/doi/10.1021/acssynbio.2c00679" target="__blank__"> TFBMiner</a> and
      <a href="https://pubs.acs.org/doi/10.1021/acssynbio.4c00372" target="__blank__"> Ligify</a>.

      </Typography > 
      <Box
          component="img"
          mt={3}
          sx={{ ml: {xs:'10%', sm: "15%", md: "20%", lg:"25%"}, width:{xs:"80%", sm:'70%', md:"60%", lg:'50%'} }}
          src={'/GenomeContextPrediction.png'}
          alt="Predict Function from Genome Context"
        />


      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Prediction workflow
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
          mt={3}
          sx={{ width:'100%'}}
          src={'/Ligify-Workflow.png'}
          alt="Ligify Workflow"
        />

      <Typography
        sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }}
        mt={3}
        fontWeight="300"
        gutterBottom
      >
        Database creation
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        To create the database, we started by fetching all unique small molecules from the Rhea database in ChEBI format, 
        which was 13,972 at the time of database generation. Among these, 10,965 could be converted into SMILES format, 
        which is the input for Ligify. We then filtered out generic molecules, such as “water” or “hydron”, and the Ligify
        workflow was performed on the resulting chemicals. 1,685 unique molecules were predicted to be associated with a
        total of 3,215 unique regulators. To reduce false positives we filtered out regulators smaller than 80 amino acids,
        since some of the shortest regulators known to bind DNA and a small molecule are around 90 amino acids long. This
        produced 3,164 unique regulators associated with 1,667 unique molecules. To finalize the database, we (1) removed
        unnecessary data fields to reduce file size, (2) added the protein regulator sequence, (3) added Uniprot links to
        each regulator when possible, and (4) added links to homologous characterized transcription factors in {' '}
        <a href="https://groov.bio" target="_blank" rel="noopener noreferrer">groov<sup>DB</sup></a>.
      </Typography >   
      <Box
          component="img"
          mt={3}
          sx={{ width:'100%'}}
          src={'/DatabaseCreation.png'}
          alt="Database creation"
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
