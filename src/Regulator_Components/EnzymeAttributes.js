// src/Regulators.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';


  export default function EnzymeAttributes({data}) {
  
    // format the data to display regulator attributes
    const reg_attr = {  "Annotation": {"name": data.protein.enzyme.description, "link": "None"}, 
                        "RefSeq ID": {"name": data.protein.enzyme.ncbi_id, "link": "https://www.ncbi.nlm.nih.gov/protein/"+(data.protein.enzyme.ncbi_id).toString()}, 
                        "Uniprot ID": {"name": data.protein.enzyme.uniprot_id, "link": "https://www.uniprot.org/uniprotkb/"+(data.protein.enzyme.uniprot_id).toString()}, 
                        "Reaction": {"name": data.equation, "link":"None"},
                        "RHEA ID": {"name":data.rhea_id, "link":"https://www.rhea-db.org/rhea?query="+(data.rhea_id).toString()} }

      return (

        <Grid container>

        {Object.keys(reg_attr).map((key, index) => (

        <Grid item size={12} 
            key={index} 
            mb={1}>
              <Grid container>

                <Grid item xs={6} textAlign="right">
                  <Typography
                    component="div"
                    width="100px"
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 16 },
                      paddingRight: '15px',
                      borderRight: '2px solid #0084ff',
                    }}
                  >
                    <b>{key}</b>
                  </Typography>
                </Grid>

                <Grid item xs={5} textAlign="left" ml={'15px'} >
                {reg_attr[key]["link"] != "None" ?
                  <Link
                        href={reg_attr[key]["link"]}
                        target="_blank"
                        style={{ textDecoration: 'None', color: '#243fab'}} 
                      >
                        <Typography
                          component="span"
                          width="100px"
                          sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}

                        >
                          {reg_attr[key]["name"]}
                        </Typography>
                    </Link>

                    :

                    <Typography
                      component="div"
                      width="250px"
                      sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}
                    >
                      {reg_attr[key]["name"]}
                    </Typography>
                }

                  </Grid>

              </Grid>



            </Grid>




                )
            )}






                {/* Enzyme references */}

                <Grid item xs={6} textAlign="right">
                  <Typography
                    component="div"
                    width="100px"
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 16 },
                      paddingRight: '15px',
                      borderRight: '2px solid #0084ff',
                    }}
                  >
                    <b>References</b>
                  </Typography>
                </Grid>


          {(data.protein.enzyme.dois).map((name, index) => (
                <Grid item xs={5} textAlign="left" ml={'15px'} key={index}>
                <Link
                        href={"https://doi.org/"+{name}}
                        target="_blank"
                        style={{ textDecoration: 'None', color: '#243fab'}} 
                      >
                        <Typography
                          component="div"
                          width="250px"
                          sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}

                        >
                          {name}
                        </Typography>
                    </Link>
                </Grid>
          ))}


        </Grid>



  
      )
    }
    