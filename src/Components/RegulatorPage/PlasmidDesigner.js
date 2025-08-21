import React from 'react';

import { Box, Grid, Typography, Paper, Button, Link } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import Select from '@mui/material/Select';

import {
    generateGenBank,
    downloadGenBank
} from "../../utils/genbank-generator.js";
import optimizeForEcoli from "../../utils/codon-optimizer.js";
import { Toys } from '@mui/icons-material';

export default function PlasmidDesigner(data) {

    const regulated_seq = data['data']['protein']['context']['promoter']['regulated_seq']
    const protein_seq = data['data']['protein_seq']

    const handleDownload = () => {
        var refseq = data['data']["refseq"]
        var codonOptimizedReg = optimizeForEcoli(protein_seq)
        const genbank = generateGenBank(refseq, reporter, regulated_seq, expressionPromoter, rbs, codonOptimizedReg, backbone);
        downloadGenBank(genbank, data['data']['refseq']);
    }

    const [reporter, setReporter] = React.useState('GFP');
    const changeReporter = (event) => {
    setReporter(event.target.value);
    };
    const [induciblePromoter, setInduciblePromoter] = React.useState('Forward');
    const changeInduciblePromoter = (event) => {
    setInduciblePromoter(event.target.value);
    };
    const [expressionPromoter, setExpressionPromoter] = React.useState('P150');
    const changeExpressionPromoter = (event) => {
    setExpressionPromoter(event.target.value);
    };
    const [rbs, setRBS] = React.useState('4.6');
    const changeRBS = (event) => {
    setRBS(event.target.value);
    };
    const [backbone, setBackbone] = React.useState('pTWIST_Kan_Medium');
    const changeBackbone = (event) => {
    setBackbone(event.target.value);
    };
    const [plasmidSize, setPlasmidSize] = React.useState(3374 + regulated_seq.length + (protein_seq.length * 3) + 3);
    const changePlasmid = (event) => {
    setPlasmidSize(event.target.value);
    };



  return (
    <Box sx={{ flexGrow: 1 }}>

      <Grid container style={{ width: '100%' }}>

        {/* Component Title */}
        <Grid size={12}>
          <Typography
            component="div"
            sx={{ ml: { xs: '5%', sm: '2.5%' }, fontSize: 28, fontWeight: 300 }}
          >
            Plasmid Designer
          </Typography>
        </Grid>

        <Grid size={12} mt={1}>
          <Paper
            elevation={0}
            sx={{
              padding: 3,
              border: '1px solid #c7c7c7',
            //   background: '#f2f2f2',
            }}
          >
            {/* Plasmid length indicator */}

            <Grid container size={{xs:12, sm:10, md:6}}  mb={1}>
                    <Grid size={{xs:3, sm:1.5}} textAlign="right">
                        <Typography
                            component="span"
                            width="100px"
                            sx={{
                            fontSize: { xs: 14, sm: 16, md: 16 },
                            paddingRight: '15px',
                            borderRight: '2px solid #0084ff',
                            }}
                        >
                            <b>Size</b>
                        </Typography>
                    </Grid>

                    <Grid size={{xs: 5, sm: 4}} textAlign="left" ml={'15px'}>
                        <Typography
                            component="span"
                            width="100px"
                            sx={{ fontSize: { xs: 14, sm: 16, md: 16 },
                                    paddingLeft: {xs:0, sm:3, md:1.5} }}
                        >
                            {plasmidSize} bp
                        </Typography>
                    </Grid>
            </Grid>


            {/* Plasmid designer image */}

                <Grid container size={12}>
                    <Grid size={{xs:12, md:6}} mt={3 } pr={2} sx={{borderRight: {xs:'none', sm:'none', md:"1px solid black"} }}>
                        <Box
                        component="img"
                        justifyContent="center"
                        sx={{ width: '100%'}}
                        src="/Ligify_PlasmidDesigner.png"
                        alt="Ligify plasmid architecture"
                        />
                        <Typography
                            sx={{fontSize: 16}}
                            mt={2}
                            textAlign="center"
                        >
                            <b>Reporter plasmid architecture</b>
                        </Typography>
                    </Grid>







                    {/* Plasmid designer dropdown selectors */}


                    <Grid size={{xs:12, md:6}} mt={3} pl={2}>
                        
                        <Grid container >

                            <Grid size={{xs:12, md:6}} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Reporter</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={reporter}
                                    label="Reporter"
                                    onChange={changeReporter}
                                    >
                                        <MenuItem value={"GFP"}>GFP</MenuItem>
                                        <MenuItem value={"RFP"}>RFP</MenuItem>

                                    <FormHelperText>
                                        <Typography sx={{fontSize:16, width:220, borderTop:"1px solid black"}} p={2}>
                                            Fluorescent reporter info: <br/>
                                            <a style={{paddingLeft:50}} href="https://www.fpbase.org/protein/gfpmut2/"  target="_blank">GFP</a>
                                            <a style={{paddingLeft:50}} href="https://www.fpbase.org/protein/mscarlet-i3/"  target="_blank">RFP</a>
                                        </Typography>
                                    </FormHelperText>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs:12, md:6}} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Inducible promoter</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={induciblePromoter}
                                    label="Inducible promoter"
                                    onChange={changeInduciblePromoter}
                                    >
                                        <MenuItem value={"Forward"}>Forward</MenuItem>
                                        <MenuItem value={"Reverse"}>Reverse</MenuItem>
                                    <FormHelperText>
                                        <Typography sx={{fontSize:16, width:220, borderTop:"1px solid black"}} p={2}>
                                            Set the orientation of the regulator-controlled promoter
                                        </Typography>
                                    </FormHelperText>
                                    </Select>
                                </FormControl>

                            </Grid>

                            <Grid size={{xs:12, md:6}} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Expression promoter</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={expressionPromoter}
                                    label="Expression promoter"
                                    onChange={changeExpressionPromoter}
                                    >
                                        <MenuItem value={"P1"}>P1</MenuItem>
                                        <MenuItem value={"P10"}>P10</MenuItem>
                                        <MenuItem value={"P50"}>P50</MenuItem>
                                        <MenuItem value={"P150"}>P150</MenuItem>
                                        <MenuItem value={"P250"}>P250</MenuItem>
                                        <MenuItem value={"P500"}>P500</MenuItem>
                                        <MenuItem value={"P750"}>P750</MenuItem>
                                        <MenuItem value={"P1000"}>P1000</MenuItem>

                                        <FormHelperText>
                                            <Typography sx={{fontSize:16, width:220, borderTop:"1px solid black"}} p={2}>
                                                An extension of the sigma70 Anderson series promoters <br/>
                                                <a href="https://pubmed.ncbi.nlm.nih.gov/34985281/"  target="_blank">More info here</a>
                                            </Typography>
                                        </FormHelperText>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs:12, md:6}} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">RBS</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={rbs}
                                    label="RBS"
                                    onChange={changeRBS}
                                    >
                                        <MenuItem value={"0.75"}>0.75</MenuItem>
                                        <MenuItem value={"2.3"}>2.3</MenuItem>
                                        <MenuItem value={"4.6"}>4.6</MenuItem>
                                        <MenuItem value={"8.5"}>8.5</MenuItem>
                                        <MenuItem value={"13"}>13</MenuItem>
                                        <MenuItem value={"18"}>18</MenuItem>
                                        <MenuItem value={"23"}>23</MenuItem>

                                        <FormHelperText>
                                            <Typography sx={{fontSize:16, width:220, borderTop:"1px solid black"}} p={2}>
                                                A series of bicistronic context-independent RBSs <br/>
                                                <a href="https://pubs.acs.org/doi/10.1021/acssynbio.3c00093"  target="_blank">More info here</a>
                                            </Typography>
                                        </FormHelperText>

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs:12, md:6}} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Backbone</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={backbone}
                                    label="Backbone"
                                    onChange={changeBackbone}
                                    >
                                        <MenuItem value={"pTWIST_Kan_Medium"}>pTWIST_Kan_Medium</MenuItem>
                                        <MenuItem value={"pTWIST_Amp_Medium"}>pTWIST_Amp_Medium</MenuItem>
                                        <MenuItem value={"pTWIST_Chlor_Medium"}>pTWIST_Chlor_Medium</MenuItem>
                                        <MenuItem value={"None"}>None</MenuItem>

                                        <FormHelperText>
                                            <Typography sx={{fontSize:16, width:220, borderTop:"1px solid black"}} p={2}>
                                                Twist Biosciences cloning vectors. .
                                                <a href="https://www.twistbioscience.com/products/genes/vectors?tab=catalog-vectors"  target="_blank">More info here</a>
                                            </Typography>
                                        </FormHelperText>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid size={{xs:12, md:6}} p={2}>

                                <Button 
                                    variant="contained"
                                    fullWidth
                                    sx={{fontSize:16, height:"100%", backgroundColor: "#f9ffba", color:"black"}}
                                    onClick={handleDownload}
                                    // disabled={loading}
                                    // startIcon={loading && <CircularProgress size={20} />}
                                >
                                    Download Plasmid
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>

                    </Grid>


          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
