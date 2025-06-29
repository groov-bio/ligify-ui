// src/CandidateLigands.js
import {

    Typography,
  } from '@mui/material';
  import Grid from '@mui/material/Grid2';


  export default function CandidateLigands({data}) {


    return (

        <Grid container mt={7}>
          {/* {(data.protein.enzyme.dois).map((name, index) => ( */}
            {(data.alt_ligands).map((name, index) => (
              <Grid key={index} width={"100%"}>
                <Typography ml={'30%'} textAlign="left" style={{fontSize: "18px"}}>{name}</Typography>
              </Grid>
            ))}
        </Grid>
        
    )
}
