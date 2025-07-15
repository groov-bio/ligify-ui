import React from 'react';

import { Box, Grid, Typography, Paper, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
    createGenBankGenerator,
    generateGenBank,
    downloadGenBank
} from "../../utils/genbank-generator.js";

export default function PlasmidDesigner(data) {






    // const handleDownload = () => {
    //     const plasmid = "ATGCTAGC"
    //     // const plasmid = regulator.plasmid_sequence
    
    //     // Define the file name and type
    //     const fileName = data.refseq+'_plasmid.gb';
    //     const mimeType = 'text/plain';
    
    //     // Create a Blob from the plasmid sequence
    //     const blob = new Blob([plasmid], { type: mimeType });
    
    //     // Create a URL for the Blob
    //     const url = URL.createObjectURL(blob);
    
    //     // Create a temporary anchor element
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = fileName;
    
    //     // Append the anchor to the body
    //     document.body.appendChild(a);
    
    //     // Programmatically click the anchor to trigger the download
    //     a.click();
    
    //     // Clean up by removing the anchor and revoking the object URL
    //     document.body.removeChild(a);
    //     URL.revokeObjectURL(url);
    //   };

    console.log(data["data"]["refseq"])

    const handleDownload = () => {
        var refseq = data['data']["refseq"]
        var regulated_seq = data['data']['protein']['context']['promoter']['regulated_seq']
        const genbank = generateGenBank(refseq, reporter, regulated_seq);
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


    // const create_plasmid(reporter, induciblePromoter, expressionPromoter, rbs, backbone) {



    // }


  return (
    <Box sx={{ flexGrow: 1 }}>




        {/* <Grid size={12} mt={3}  mb={2} textAlign="center">
          <Button 
            variant="contained"
            color="secondary"
            type="submit"
            style={{fontSize:12}}
            onClick={handleDownload}
            // disabled={loading}
            // startIcon={loading && <CircularProgress size={20} />}
          >
            Download Plasmid
          </Button>
          </Grid> */}



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
              background: '#f2f2f2',
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
                            sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}
                        >
                            4,128 bp
                        </Typography>
                    </Grid>
            </Grid>


            {/* Plasmid designer image */}

                <Grid container size={12}>
                    <Grid size={{xs:12, md:6}} mt={3 } pr={2}>
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
                        >
                            <b>Reporter plasmid architecture</b>
                            <br/>
                            other words
                        </Typography>
                    </Grid>







                    {/* Plasmid designer dropdown selectors */}


                    <Grid size={{xs:12, md:6}} mt={3} pl={2}>
                        
                        <Grid container>

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
                                        <MenuItem value={"P1000"}>P71000</MenuItem>
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



            {/* <Typography
              component="div"
              sx={{ fontSize: { xs: 16, sm: 22 }, overflowWrap: 'anywhere' }}
            >
              {props.sequence}
            </Typography> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
