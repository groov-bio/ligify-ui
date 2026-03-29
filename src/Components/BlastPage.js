import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Alert,
  Chip,
  Slider,
  Collapse,
  Link,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';


const DEFAULTS = { identity: 30, coverage: 60, maxResults: 50 };


export default function BlastPage() {
  const navigate = useNavigate();

  const [sequence, setSequence] = useState('');
  const [identity, setIdentity] = useState(DEFAULTS.identity);
  const [coverage, setCoverage] = useState(DEFAULTS.coverage);
  const [maxResults, setMaxResults] = useState(DEFAULTS.maxResults);
  const [showParams, setShowParams] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    const seq = sequence.trim().replace(/\s+/g, '');
    if (!seq) {
      setError('Please enter a protein sequence');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('https://api.groov.bio/ligifyBlast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence: seq, identity, coverage, max_results: maxResults }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSearch();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6, px: 3 }}>
      <Typography variant="h4" fontWeight={300} gutterBottom>
        Sequence Search
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Paste an amino acid sequence to find similar regulators in the Ligify database via BLAST.
      </Typography>

      <TextField
        multiline
        minRows={5}
        maxRows={12}
        fullWidth
        label="Protein sequence"
        placeholder="MPEVQTDHPETAELSKPQLRMVDLNLLT..."
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        inputProps={{ style: { fontFamily: 'monospace', fontSize: 13 } }}
      />

      {/* Parameters */}
      <Box sx={{ mt: 1, mb: 1 }}>
        <Link
          component="button"
          variant="body2"
          color="text.secondary"
          onClick={() => setShowParams((v) => !v)}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
        >
          <TuneIcon fontSize="small" />
          {showParams ? 'Hide parameters' : 'Show parameters'}
        </Link>
      </Box>

      <Collapse in={showParams}>
        <Box sx={{ px: 1, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="body2" gutterBottom>
              Min. identity: <strong>{identity}%</strong>
            </Typography>
            <Slider
              value={identity}
              onChange={(_, v) => setIdentity(v)}
              min={20}
              max={100}
              step={1}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}%`}
              sx={{ color: 'black' }}
            />
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>
              Min. coverage: <strong>{coverage}%</strong>
            </Typography>
            <Slider
              value={coverage}
              onChange={(_, v) => setCoverage(v)}
              min={20}
              max={100}
              step={1}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}%`}
              sx={{ color: 'black' }}
            />
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>
              Max results: <strong>{maxResults}</strong>
            </Typography>
            <Slider
              value={maxResults}
              onChange={(_, v) => setMaxResults(v)}
              min={1}
              max={500}
              step={1}
              valueLabelDisplay="auto"
              sx={{ color: 'black' }}
            />
          </Box>
        </Box>
      </Collapse>

      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
        >
          Search
        </Button>
        <Typography variant="caption" color="text.secondary">
          Ctrl+Enter to search
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <CircularProgress size={60} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Running BLAST search...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {results && !loading && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {results.num_results} result{results.num_results !== 1 ? 's' : ''} for query of {results.query_length} aa
            </Typography>

            {results.results.length === 0 ? (
              <Typography color="text.secondary">
                No similar regulators found. Try lowering the identity or coverage thresholds.
              </Typography>
            ) : (
              <List sx={{ pt: 0 }}>
                {results.results.map((hit, index) => (
                  <Card key={index} sx={{ mb: 1 }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => navigate(`/database/${hit.refseq_id}`)}
                          sx={{ p: 0 }}
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                <Typography variant="subtitle1" fontFamily="monospace">
                                  {hit.refseq_id}
                                </Typography>
                                <Chip
                                  label={`${hit.identity.toFixed(1)}% identity`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                                <Chip
                                  label={`${hit.coverage.toFixed(1)}% coverage`}
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    </CardContent>
                  </Card>
                ))}
              </List>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
