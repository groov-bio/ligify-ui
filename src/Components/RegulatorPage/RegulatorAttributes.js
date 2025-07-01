// src/RegulatorAttributes.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';


  export default function RegulatorAttributes({data}) {

  
    if (data.uniprot_id !== null){
      var uniprot_link = "https://www.uniprot.org/uniprotkb/"+(data.uniprot_id).toString()
      var uniprot_name = data.uniprot_id
    } else {
      var uniprot_link = "None"
      var uniprot_name = "None"
    }

    // format the data to display regulator attributes
    const reg_attr = {  "Annotation": {"name": data.annotation, "link": "None"}, 
                        "RefSeq ID": {"name": data.refseq, "link": "https://www.ncbi.nlm.nih.gov/protein/"+(data.refseq).toString()}, 
                        "Uniprot ID": {"name": uniprot_name, "link":uniprot_link},
                        "Organism": {"name":data.protein.organism[5], "link":"None"} 
                      }

      return (

        <Grid container>

        {Object.keys(reg_attr).map((key, index) => (

        <>
        <Grid size={{sm:0,md:3}}></Grid>
        <Grid size={{sm:12, md:8}} 
            key={index} 
            mb={1}>
              <Grid container>

                <Grid xs={6} textAlign="right">
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

                    {/* Overflow text onto two lines */}
                <Grid xs={5} textAlign="left" ml={'15px'} 
                            >
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
            </>

                )
            )}

        </Grid>



  
      )
    }
    