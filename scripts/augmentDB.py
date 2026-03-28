# This code contains several functions that ADD DATA to the Ligify database after its initial creation

# The functions should only need to be run once (to add the data).

import json
import requests
import time



# Add Protein Seq ID from input Uniprot ID:
import requests
from pprint import pprint

def get_protein_id(uniprot_id: str) -> str | None:
    """
    Given a UniProt accession, return the first RefSeq protein ID (e.g., AAA85299.1).
    Returns None if not found.
    """
    url = f"https://rest.uniprot.org/uniprotkb/{uniprot_id}.json"

    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Failed to fetch UniProt entry: {uniprot_id}")

    data = response.json()
    # pprint(data)

    # Look through cross-references
    for ref in data.get("uniProtKBCrossReferences", []):
        if ref.get("database") == "EMBL":
            # properties may contain multiple IDs
            props = ref.get("properties", {})
            return props[0]['value']
    return None



# for entries that fail, fetch protein ID via entrez ipg
from Bio import Entrez
Entrez.email = "simonsnitz@gmail.com"

def fetch_ipg_info(protein_accession: str):
    """
    Given a protein accession (e.g., AAA85299.1),
    return IPG records from NCBI.
    """
    # Step 1: Search IPG database
    search_handle = Entrez.esearch(
        db="ipg",
        term=protein_accession
    )
    search_results = Entrez.read(search_handle)
    search_handle.close()

    id_list = search_results.get("IdList", [])
    if not id_list:
        print(f"No IPG entries found for {protein_accession}")
        return None

    # Step 2: Fetch IPG records
    fetch_handle = Entrez.efetch(
        db="ipg",
        id=",".join(id_list),
        rettype="ipg",
        retmode="text"
    )
    ipg_data = fetch_handle.read()
    fetch_handle.close()

    decoded = ipg_data.decode("utf-8").strip()
    lines = decoded.split("\n")
    proteins = [i.split("\t")[6] for i in lines][1:]
    for i in proteins:
        if i[0:3] != "WP_":
            return i




# First pass: fetch records via Uniprot API
def add_proteinID_uniprotAPI():
    with open('../public/ligifyDB.json', 'r') as f:
        data = json.load(f)

    for i in range(0,len(data)):
        reg = data[i]
        if reg["uniprot_id"] != None:
            reg['protein_id'] = get_protein_id(reg["uniprot_id"])
            if reg['protein_id'] == None:
                print("failed for: "+str(reg['uniprot_id']))
        print(i)
        with open('ligifyDB_protID.json', "w") as f:
            json.dump(data, f)


# Second pass: fetch records via Entrez IPG API
def add_proteinID_EntrezAPI():
    with open('ligifyDB_protID2.json', 'r') as f:
        data = json.load(f)

    for i in range(0,len(data)):
        reg = data[i]
        if 'protein_id' not in reg:
            reg['protein_id'] = fetch_ipg_info(reg["refseq"])
            print("added protein ID for: "+str(reg['protein_id']))
            with open('ligifyDB_protID2.json', "w") as f:
                json.dump(data, f)
        print(i)
# add_proteinID_EntrezAPI()




def refseq_to_uniprot(refseq_id: str) -> list[str]:
    """
    Given a RefSeq protein accession (e.g., WP_231850867.1),
    return matching UniProt accessions.
    """
    url = "https://rest.uniprot.org/uniprotkb/search"

    params = {
        "query": {refseq_id},
        "fields": "accession",
        "format": "json"
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        print("DEBUG URL:", response.url)
        print("DEBUG RESPONSE:", response.text)
        raise ValueError(f"UniProt API request failed: {response.status_code}")

    data = response.json()

    accessions = []
    for result in data.get("results", []):
        accessions.append(result.get("primaryAccession"))

    if len(accessions) != 0:
        return accessions[0]
    else:
        return None


# Attempt to fill in Uniprot IDs for ~700 entries where they're missing.
def fill_in_uniprotIDs():
    with open('ligifyDB_protID2.json', 'r') as f:
        data = json.load(f)

    for i in range(0,len(data)):
        reg = data[i]
        if reg["uniprot_id"] == None:
            uniprot = refseq_to_uniprot(reg['refseq'])
            if uniprot != None:
                reg["uniprot_id"] = uniprot
                with open('ligifyDB_protID2.json', "w") as f:
                    json.dump(data, f)
                print("added Uniprot ID for: "+str(reg["uniprot_id"]))
            else:
                if reg['protein_id'] != None:
                    uniprot2 = refseq_to_uniprot(reg['protein_id'])
                    if uniprot2 != None:
                        reg["uniprot_id"] = uniprot2
                        with open('ligifyDB_protID2.json', "w") as f:
                            json.dump(data, f)
                        print("added Uniprot ID for: "+str(reg["uniprot_id"]))
                    else:
                        print('failed to fetch uniprot ID')
        print(i)

# fill_in_uniprotIDs()



with open('ligifyDB_protID2.json', 'r') as f:
    data = json.load(f)

c = 0
for reg in data:
    if reg['uniprot_id'] == None:
        c += 1
print(c)


# Add organism name and taxon ID
def get_refseq_metadata(refseq_id: str) -> dict:
    """
    Given a RefSeq protein ID, return organism name and taxon ID using NCBI E-utilities.

    Parameters:
        refseq_id (str): RefSeq accession (e.g., WP_003963520.1)
    Returns:
        dict: {"organism": str, "taxon": int}
    """
    
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
    
    params = {
        "db": "protein",
        "id": refseq_id,
        "retmode": "json"
    }
    
    response = requests.get(base_url, params=params)
    response.raise_for_status()
    data = response.json()
    
    # Extract UID (NCBI internal ID)
    try:
        uid = data["result"]["uids"][0]
        record = data["result"][uid]
    
        organism = record.get("organism")
        taxon = record.get("taxid")

    except:
        organism = 'none'
        taxon = 'none'
    
    return {
        "organism": organism,
        "taxon": taxon
    }



# Add the "organism name" and "taxonomy ID" from input RefSeq ID:
def add_org_tax():
    # load the database into memory
    with open("../public/ligifyDB.json", "r") as f:
        data = json.load(f)

    for i in range(2500, len(data)):
        time.sleep(0.5)
        org_tax = get_refseq_metadata(data[i]['refseq'])
        data[i]["organism"] = org_tax["organism"]
        data[i]["taxon"] = org_tax["taxon"]

        print(i)

    with open("../public/ligifyDB.json", "w") as f:
        json.dump(data,f)


def create_fasta():
    # load the database into memory
    with open("../public/ligifyDB.json", "r") as f:
        data = json.load(f)

    fasta = ""
    for i in data:
        refseq = i['refseq']
        proteinSeq = i['protein_seq']
        fasta = fasta + ">" + refseq + "\n" + proteinSeq + "\n"

    with open("ligifyRegs.fasta", "w") as f:
        f.write(fasta)




# Add common chemical name

def smiles_to_name(smiles: str, name_type: str = "iupac") -> str:
    # Step 1: Get CID from SMILES
    url_cid = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/{}/cids/JSON".format(smiles)
    r = requests.get(url_cid)
    if r.status_code != 200:
        return None

    data = r.json()
    try:
        cid = data["IdentifierList"]["CID"][0]
    except (KeyError, IndexError):
        return None

    # Step 2: Fetch name
    url_name = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/property/Title/JSON"
    r = requests.get(url_name)
    if r.status_code != 200:
        return None

    data = r.json()
    try:
        name = data["PropertyTable"]["Properties"][0]["Title"]
        return name
    except (KeyError, IndexError):
        return None




from rdkit import Chem
import requests
from functools import lru_cache
from chembl_webresource_client.new_client import new_client

# Reuse HTTP connection
session = requests.Session()

def canonicalize(smiles: str) -> str:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError("Invalid SMILES")
    return Chem.MolToSmiles(mol)

# --- PubChem (fast primary) ---
@lru_cache(maxsize=10000)
def query_pubchem(smiles: str):
    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/{smiles}/property/Title/JSON"

    try:
        r = session.get(url, timeout=3)
        if r.status_code != 200:
            return None

        data = r.json()
        return data["PropertyTable"]["Properties"][0].get("Title")

    except Exception:
        return None

# --- ChEMBL (fallback only) ---
@lru_cache(maxsize=10000)
def query_chembl(smiles: str):
    molecule = new_client.molecule

    results = molecule.filter(
        molecule_structures__canonical_smiles=smiles
    )

    for res in results:
        if res.get("pref_name"):
            return res["pref_name"]

    return None

# --- FAST main function ---
def smiles_to_name(smiles: str):
    smiles = canonicalize(smiles)

    # 1. Try PubChem first (fast)
    name = query_pubchem(smiles)
    if name:
        return name

    # 2. Fallback to ChEMBL (slower)
    name = query_chembl(smiles)
    if name:
        return name

    return None





# Create dictionary with all chemicals
def create_chemMap_base():
    with open("../public/ligifyDB.json", "r") as f:
        data = json.load(f)

    chemMap = []
    for i in data:
        for chem in i["candidate_ligands"]:
            entry = {
                "iupac": chem["name"],
                "smiles": chem["smiles"]
            }
            if entry in chemMap:
                pass
            else:
                chemMap.append(entry)

    with open("chemMap3.json", "w") as f:
        json.dump(chemMap, f)
    print('done')


# First function to add common names
def add_commonNames():
    with open("chemMap3.json", "r") as f:
        data = json.load(f)

    c = 0
    for i in data:
        if "name" in i:
            c += 1
        else:
            try:
                i['name'] = smiles_to_name(i['smiles']).capitalize()
            except:
                i['name'] = None
            with open("chemMap4.json", "w") as f:
                json.dump(data, f)
            print(str(c)+": file saved")
            c += 1




# Run this to fill in the entries with "none" in their "name" field
# session = requests.Session()
def iupac_to_common_name(iupac_name: str):
    try:
        # Step 1: Get CID from IUPAC name
        url_cid = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{iupac_name}/cids/JSON"
        r = session.get(url_cid, timeout=5)
        r.raise_for_status()
        cid = r.json()["IdentifierList"]["CID"][0]

        # Step 2: Get common name (Title)
        url_name = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/property/Title/JSON"
        r = session.get(url_name, timeout=5)
        r.raise_for_status()

        data = r.json()
        return data["PropertyTable"]["Properties"][0].get("Title")

    except Exception:
        return None
    

# in ligifyDB file, rename "name" to "iupac", and add new common "name" field.
def add_ChemName_to_DB():
    with open('../public/ligifyDB.json', 'r') as f:
        data = json.load(f)

    with open('chemMap_final.json', 'r') as m:
        chemMap = json.load(m)

    for reg in data:
        for chem in reg['candidate_ligands']:
            chem['iupac'] = chem.pop('name')
            #find common name using map
            chemName = [i for i in chemMap if i['iupac'] == chem['iupac']][0]['name']
            if chemName == None:
                print('error')
            else:
                chem['name'] = chemName

    with open('../public/ligifyDB.json', "w") as out:
        json.dump(data, out)
    print('updated ligifyDB.json')

# add_ChemName_to_DB()