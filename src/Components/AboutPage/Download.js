import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress  } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useAllSensors } from './downloadCache.js';

export default function Download() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { data: sensorsData = [], isLoading, error } = useAllSensors();


  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Use cached data if available, otherwise fetch fresh data
      let dataToDownload;
      if (sensorsData.length > 0) {
        // Use cached data - wrap in same format as API response
        dataToDownload = { sensors: sensorsData };
      } else {
        // Fallback to direct fetch if cache is empty
        const response = await fetch('https://groov-api.com/ligifyDB.json');
        dataToDownload = await response.json();
      }

      // Create a blob from the data
      const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
        type: 'application/json',
      });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ligifyDB.json';
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading sensors:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const buttonLoading = isLoading || isDownloading;
  const buttonDisabled = buttonLoading || error;

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
        fontWeight="300"
        gutterBottom
      >
        Download the Database
      </Typography>

      <Typography mt={2} mb={2} sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
          All sensor data can be downloaded as a single JSON file via the link above. The file is 15.6 MB.
      </Typography>

      <Button
      variant="contained"
      startIcon={
        buttonLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <DownloadIcon />
        )
      }
      onClick={handleDownload}
      disabled={buttonDisabled}
      sx={{ whiteSpace: 'nowrap', minWidth: '200px' }}
    >
      {isLoading
        ? 'Loading...'
        : isDownloading
        ? 'Downloading...'
        : error
        ? 'Error loading data'
        : 'Download'}
    </Button>


    </Box>
  );
}
