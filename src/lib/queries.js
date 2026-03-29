import { useQuery } from '@tanstack/react-query';

const fetchJson = (url) =>
  fetch(url).then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); });

// { iupac, name, smiles }[]  —  used by Search & BrowsePage
export const useChemMap = () =>
  useQuery({
    queryKey: ['chemMap'],
    queryFn: () => fetchJson('https://groov-api.com/ligify_chem_map.json'),
    staleTime: Infinity,
  });

// { ligand_name: [refseq, ...] }  —  used by BrowsePage
export const useLigandMap = () =>
  useQuery({
    queryKey: ['ligandMap'],
    queryFn: () => fetchJson('https://groov-api.com/ligify-ligand-map.json'),
    staleTime: Infinity,
  });

// AlphaFold existence check  —  used by Structure
export const useAlphaFold = (accession) =>
  useQuery({
    queryKey: ['alphafold', accession],
    queryFn: () => fetchJson(`https://alphafold.ebi.ac.uk/api/prediction/${accession}`),
    enabled: !!accession,
    staleTime: Infinity,
    retry: false,
  });
