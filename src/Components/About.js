import { Typography, Box } from '@mui/material';

export default function About() {

    return (
    <Box>
    
    <Typography align="center" sx={{fontSize:15}}>
        Predict microbial transcription factors responsive to your chemical
        using a guilt-by-association model.
    </Typography>
    <Typography align="center" sx={{fontSize:15}} mt={1}>
        Previous version of Ligify <a href="https://ligify.streamlit.app/" target="_blank" rel="noopener noreferrer"> here</a>.
    </Typography>
    <Typography align="center" sx={{fontSize:15}} mt={1}>
        More information <a href="https://pubs.acs.org/doi/10.1021/acssynbio.4c00372" target="_blank" rel="noopener noreferrer"> here</a>.
    </Typography>

  </Box>

    );
};