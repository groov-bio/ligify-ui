// src/EnzymeAttributes.js
import React from 'react';
import {
    Box,
    Link,
    Paper,
    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid';


  export default function EnzymeAttributes({data}) {
  
    // format the data to display regulator attributes
    const reg_attr = {  "Annotation": {"name": data.protein.enzyme.description, "link": "None"}, 
                        "RefSeq ID": {"name": data.protein.enzyme.ncbi_id, "link": "https://www.ncbi.nlm.nih.gov/protein/"+(data.protein.enzyme.ncbi_id).toString()}, 
                        "Uniprot ID": {"name": data.protein.enzyme.uniprot_id, "link": "https://www.uniprot.org/uniprotkb/"+(data.protein.enzyme.uniprot_id).toString()}, 
                        "Reaction": {"name": data.equation, "link":"None"},
                        "RHEA ID": {"name":data.rhea_id, "link":"https://www.rhea-db.org/rhea?query="+(data.rhea_id).toString()} }

      return (

      <Box sx={{ flexGrow: 1 }} mr={1}>
        <Grid container style={{ width: '100%' }}>

          <Grid size={12} >
            <Typography
              component="div"
              style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
            >
              Associated Enzyme
            </Typography>
          </Grid>

          <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              padding: "40px",
              height: { xs: '150px', sm: '250px' },
            }}
          >


        {Object.keys(reg_attr).map((key, index) => (

        <Grid size={12} 
            key={index} 
            mb={1}>
              <Grid container>

                <Grid textAlign="right">
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

                <Grid size={5} textAlign="left" ml={'15px'} >
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

                <Grid container size={12}>

                <Grid textAlign="right">
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


                <Grid container size={5} textAlign="left" ml={'15px'}>
          {(data.protein.enzyme.dois).map((name, index) => (

                <Grid key={index}>
                <Link
                        href={"https://doi.org/"+name}
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
</Grid>

          </Paper>
          </Grid>


        </Grid>

        </Box>



  
      )
    }
    