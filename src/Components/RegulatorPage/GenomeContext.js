import React, { useState, useEffect } from 'react';

import { Stage, Layer, Line } from 'react-konva';

import {
  Box,
  Typography,
  Paper,
  Link,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { generateGraphic } from '../../lib/FormatOperon';

export default function GenomeContext({ data, alias }) {

  const [operon, setOperon] = useState([]);
  const [geneFocus, setGeneFocus] = useState(undefined);
  const [formattedData, setFormattedData] = useState([]);

  const lineRef = React.useRef(null);

  const arrowLength = parseInt(window.innerHeight) > 800 ? 20 : 15;
  const geneHeight = parseInt(window.innerHeight) > 800 ? 40 : 30;
  const yOffset = 3;
  const xOffset = 3;
  const strokeWidth = parseInt(window.innerHeight) > 800 ? 3 : 2;
  // Needed to arbitrarily set to 0.87 because operon extends past viewport otherwise
  //To detect size of screen
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  let operonWidth;
  if (isSmallScreen === true) {
    operonWidth = parseInt(window.innerWidth) * 0.87;
  } else {
    operonWidth = parseInt(window.innerWidth) * 0.62;
  }

  useEffect(() => {
    //the if statement here is used to prevent this from running on initialization.
    if (data) {

      const graphic = generateGraphic(data.operon, data.enzyme_index);

      setFormattedData(graphic);
    }
  }, [data]);

  useEffect(() => {
    var x_pos = xOffset;
    const genes = [];
    var counter = 0;

    // calculate total percentage of genes + spacers such that operon doesn't overflow? Or rewrite this on the backend?
    for (var gene of formattedData) {
      var genePercent = parseInt(gene.length);

      var geneLength =
        genePercent > 2
          ? operonWidth * (genePercent * 0.01) - arrowLength
          : operonWidth * (genePercent * 0.01);
      var spacerLength = operonWidth * (parseInt(gene.spacer) * 0.01);

      genes.push(
        <Line
          key={counter}
          ref={lineRef}
          closed
          points={
            gene.direction == '+'
              ? [
                  x_pos,
                  yOffset,
                  x_pos + geneLength,
                  yOffset,
                  x_pos + geneLength + arrowLength,
                  yOffset + geneHeight / 2,
                  x_pos + geneLength,
                  yOffset + geneHeight,
                  x_pos,
                  yOffset + geneHeight,
                ]
              : [
                  x_pos + arrowLength,
                  yOffset,
                  x_pos + arrowLength + geneLength,
                  yOffset,
                  x_pos + arrowLength + geneLength,
                  yOffset + geneHeight,
                  x_pos + arrowLength,
                  yOffset + geneHeight,
                  x_pos,
                  yOffset + geneHeight / 2,
                ]
          }
          stroke="black"
          strokeWidth={strokeWidth}
          fill={gene.color}
          //Konva doesn't like Line element IDs being integers
          id={String(counter)}
          opacity={counter == geneFocus ? 1 : 0.5}
          onClick={(e) => {
            setGeneFocus(parseInt(e.target.getAttrs().id));
          }}
          //Need to include this for "click" to work on mobile
          onTap={(e) => {
            setGeneFocus(parseInt(e.target.getAttrs().id));
          }}
          onMouseEnter={(e) => {
            // style stage container:
            const container = e.target.getStage().container();
            container.style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage().container();
            container.style.cursor = 'default';
          }}
        />
      );

      x_pos += geneLength + arrowLength;
      x_pos += spacerLength;
      counter += 1;
    }

    setOperon(genes);
  }, [formattedData, geneFocus]);

  return (


    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ width: '100%' }}>

          {/* Component Title */}
        <Grid size={12} >
          <Typography
            component="div"
            style={{ marginLeft: '5%', fontSize: 28, fontWeight: 300 }}
          >
            Genome Context
          </Typography>
        </Grid>

        {/* Operon */}

        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #c7c7c7',
              padding: 3,
              // height: { xs: '300px', sm: '500px' },
            }}
          >

        {/* <Grid size={12} mt={1}> */}

            <Grid container spacing={5} columns={12}>
              <Grid size={12} align="center" >
                <Stage width={operonWidth} height={50}>
                  <Layer>{operon}</Layer>
                </Stage>
              </Grid>

              {/* Color-coded Legend */}

              <Grid container size={{xs:12,md:10}} columns={12} spacing={1}>
                <Grid size={{xs:1, md:2}}></Grid>
                <Grid size={{xs:2,md:2}} >
                  <Typography
                    textAlign="center"
                    pt={1}
                    pb={1}
                    sx={{
                      fontSize: { xs: 10, sm: 12, md: 16 },
                      width: '90%',
                      display: 'inline-block',
                      backgroundColor: 'red',
                      borderRadius: '10px',
                      color: 'white',
                    }}
                  >
                    Enzyme
                  </Typography>
                </Grid>
                <Grid size={{xs:2, md:2}} >
                  <Typography
                    textAlign="center"
                    pt={1}
                    pb={1}
                    sx={{
                      fontSize: { xs: 10, sm: 12, md: 16 },
                      width: '90%',
                      display: 'inline-block',
                      backgroundColor: 'yellow',
                      borderRadius: '10px',
                      color: 'black',
                    }}
                  >
                    Transporter
                  </Typography>
                </Grid>
                <Grid size={{xs:2, md:2}}>
                  <Typography
                    textAlign="center"
                    pt={1}
                    pb={1}
                    sx={{
                      fontSize: { xs: 10, sm: 12, md: 16 },
                      width: '90%',
                      display: 'inline-block',
                      backgroundColor: 'blue',
                      borderRadius: '10px',
                      color: 'white',
                    }}
                  >
                    Regulator
                  </Typography>
                </Grid>
                <Grid size={{xs:2, md:2}}>
                  <Typography
                    textAlign="center"
                    pt={1}
                    pb={1}
                    sx={{
                      fontSize: { xs: 10, sm: 12, md: 16 },
                      width: '90%',
                      display: 'inline-block',
                      backgroundColor: 'black',
                      borderRadius: '10px',
                      color: 'white',
                    }}
                  >
                    Other
                  </Typography>
                </Grid>
                <Grid size={{xs:2, md:2}}>
                  <Typography
                    textAlign="center"
                    pt={1}
                    pb={1}
                    sx={{
                      fontSize: { xs: 10, sm: 12, md: 14 },
                      width: '100%',
                      display: 'inline-block',
                      backgroundColor: 'green',
                      borderRadius: '10px',
                      color: 'white',
                    }}
                  >
                    Associated enzyme
                  </Typography>
                </Grid>
              </Grid>


              {/* Gene Annotation Table */}

              <Grid
                size={12}
                mb={3}
                align="left"
                style={{ textAlign: 'center' }}
              >
                {geneFocus != undefined ? (


                  <Grid container size={12} mt={3} spacing={1}>

                  {/* Accession label */}
            <Grid size={{xs:12,sm:6}} >

                  <Grid container size={12}>

                      <Grid size={{xs:3,sm:2,md:2}} textAlign="right">
                        <Typography
                          component="span"
                          width="100px"
                          sx={{
                            fontSize: { xs: 14, sm: 16, md: 16 },
                            paddingRight: '15px',
                            borderRight: '2px solid #0084ff',
                          }}
                        >
                          <b>Accession</b>
                        </Typography>
                      </Grid>

                      <Grid
                        size={{xs:8, sm:3, md:2}}
                        textAlign="left"
                        ml={'25px'}
                      >
                        <Link
                          href={
                            'https://www.ncbi.nlm.nih.gov/protein/' +
                            formattedData[geneFocus].accession
                          }
                          target="_blank"
                          style={{ textDecoration: 'None', color: '#243fab' }}
                        >
                          <Typography
                            component="span"
                            width="100px"
                            sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}
                          >
                            {formattedData[geneFocus].accession}
                          </Typography>
                        </Link>
                      </Grid>

                  </Grid>



            </Grid>


                    {/* Description label */}
            <Grid size={{xs:12,sm:6}}>

              <Grid container size={12}>

                      <Grid  size={{xs:3,sm:2}} textAlign="right">
                        <Typography
                          component="div"
                          width="100px"
                          sx={{
                            fontSize: { xs: 14, sm: 16, md: 16 },
                            paddingRight: '15px',
                            borderRight: '2px solid #0084ff',
                          }}
                        >
                          <b>Description</b>
                        </Typography>
                      </Grid>


                      <Grid
                        size={{xs:8,sm:4,md:5}}
                        textAlign="left"
                        ml={'35px'}
                        pl={'15px'}
                        maxWidth={{sm:'50%',md:'300px'}}
                        sx={{overFlow:"wrap"}}
                      >
                        <Typography
                          component="div"
                          sx={{ fontSize: { xs: 14, sm: 16, md: 16 } }}
                        >
                          {formattedData[geneFocus].description}
                        </Typography>

                      </Grid>

                </Grid>

            </Grid>
                  </Grid>

                ) : (
                  <Typography
                    component="div"
                    align="center"
                    sx={{ fontSize: 24 }}
                  >
                    <i>Please select a gene</i>
                  </Typography>
                )}
              </Grid>
            </Grid>


            </Paper>
        </Grid>


      </Grid>
      
    </Box>
  );
}
