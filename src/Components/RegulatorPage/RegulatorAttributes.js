// src/RegulatorAttributes.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid';


  export default function RegulatorAttributes({data}) {

  
    if (data.uniprot_id !== null){
      var uniprot_link = "https://www.uniprot.org/uniprotkb/"+(data.uniprot_id).toString()
      var uniprot_name = data.uniprot_id
    } else {
      var uniprot_link = "None"
      var uniprot_name = "None"
    }

    if (data.protein.organism[6] !== undefined){
      var organismName = data.protein.organism[5] + ", " + data.protein.organism[6]
    }
    else {
      var organismName = data.protein.organism[5]
    }

    // format the data to display regulator attributes
    const reg_attr = {  "Annotation": {"name": data.annotation, "link": "None"}, 
                        "RefSeq ID": {"name": data.refseq, "link": "https://www.ncbi.nlm.nih.gov/protein/"+(data.refseq).toString()}, 
                        "Uniprot ID": {"name": uniprot_name, "link":uniprot_link},
                        "Organism": {"name":organismName, "link":"None"} 
                      }

      return (

      <Grid size={{xs:12, sm:12}} offset={{xs:0, lg:1}} mb={3}>
        <Grid container style={{ width: '100%' }}>

        {Object.keys(reg_attr).map((key, index) => (

        <>
        <Grid size={{xs:12, md:6, lg:5}} 
            key={index} 
            mb={1}>

              <Grid container>

                <Grid size={{xs:5, sm:4, md:5}} textAlign="right" style={{borderRight: '2px solid #0084ff', paddingRight: '25px',}}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: { xs: 12, sm: 14, md: 16 },

                    }}
                  >
                    <b>{key}</b>
                  </Typography>
                </Grid>

                    {/* Overflow text onto two lines */}
                    
                <Grid size={{xs:5, sm:6, md:4}} textAlign="left" ml={3}>
                {reg_attr[key]["link"] != "None" ?
                  <Link
                        href={reg_attr[key]["link"]}
                        target="_blank"
                        style={{ textDecoration: 'None', color: '#243fab'}} 
                      >
                        <Typography
                          component="span"
                          width="100px"
                          sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}

                        >
                          {reg_attr[key]["name"]}
                        </Typography>
                    </Link>

                    :

                    <Typography
                      component="div"
                      width="250px"
                      sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
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

        </Grid>

  
      )
    }
    