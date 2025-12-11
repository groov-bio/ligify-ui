import React from 'react';

import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

import SpeedIcon from '@mui/icons-material/Speed';
import LightModeIcon from '@mui/icons-material/LightMode';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';

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
        Querying Ligify
      </Typography >
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
        Users can search the database via the search bar on the Home Page or the data table on the Browse Page.
        Below are the available query methods.
      </Typography>


      <List>
          <ListItem>
            <ListItemIcon >
              <HexagonOutlinedIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>Chemical similarity search</i></b> on the Home Page using a chemical input in SMILES format
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon >
              <FingerprintIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>RefSeq lookup</i></b> on the Home Page using the regulator's NCBI RefSeq ID
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon >
              <FilterListIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>Attribute filtering</i></b> on the Browse Page using the filters tab on the data table
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon >
              <SearchIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>Full text search</i></b> on the Browse Page using the search tab on the data table
            </ListItemText>
          </ListItem>
      </List>


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
          sx={{ ml: {xs:'5%', sm:'15%',md:"25%"}, 
              width:{xs:'90%', sm:'70%', md:'50%'} }}
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
              <LightModeIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
            <b><i>Reporter</i></b><br/> 
            Users can choose between bright and fast maturing{' '}<a href="https://www.fpbase.org/protein/gfpmut2/" target="__blank__">
            GFP</a> or{' '}<a href="https://www.fpbase.org/protein/mscarlet-i3/" target="__blank__">
            RFP</a>. GFP is generally brighter and easier to see by eye on an agar plate, making it better for screening.
            RFP has lower background, due to lower cell autofluorescence, and produces a higher dynamic range.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <HexagonOutlinedIcon fontSize="medium"/>
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>Inducible Promoter</i></b><br/> 
                Forward or reverse orientations can be selected for the predicted promoter region.
                We advise users to look carefully into the operon structure and any associated literature
                to help identify which orientation likely produces the highest response.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <TurnRightIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>Expression Promoter</i></b><br/> 
                Variable strength promoters from an{' '}<a href="https://pubs.acs.org/doi/10.1021/acssynbio.1c00402" target="__blank__">
                extended Anderson series</a>{' '} can be used to tune the expression of the regulator. 
                Fine-tuning the regulator transcription level is needed to optimize the circuit's 
                dynamic range. See this {' '}<a href="https://academic.oup.com/nar/article/43/3/1955/2411344" target="__blank__">
                excellent paper</a>{' '} for detail on how regulator expression affects circuit performance.
            </ListItemText>
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SpeedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>RBS</i></b><br/> 
                Context-independent variable strength{' '}<a href="https://pubs.acs.org/doi/abs/10.1021/acssynbio.3c00093" target="__blank__">
                ribosome binding sites</a>{' '} can be used to tune the expression of the regulator. As with the above, 
                fine-tuning the regulator translation level is needed to optimize the circuit's dynamic range. 
            </ListItemText>
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <DonutLargeOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: { xs: 14, sm: 16, md: 18 } } }}>
              <b><i>Backbone</i></b><br/> 
                A plasmid backbone can be selected with either chloramphenicol, kanamycin, or ampicillin resistance.
                All backbones contain the medium-low copy p15A origin, which has lower copy number variability than high-copy origins.
                For ordering convenience, all backbones are onboarded as {' '}<a href="https://www.twistbioscience.com/products/genes/vectors?tab=catalog-vectors" target="__blank__">
                cloning vectors at TWIST</a>.
            </ListItemText>
          </ListItem>

      </List>





    </Box>
  );
}
