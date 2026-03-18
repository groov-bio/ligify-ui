# This code contains several functions that ADD DATA to the Ligify database after its initial creation

# The functions should only need to be run once (to add the data).

import json
import requests
import time



# Add Protein Seq ID from input Uniprot ID:




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


# Example usage
# if __name__ == "__main__":
#     smiles = "C[C@@]12CC(=O)[C@@H](C1(C)C)CC2=O"
#     print(smiles_to_name(smiles))


def add_common_name():
    # load the database into memory
    with open("../public/ligifyDB.json", "r") as f:
        data = json.load(f)

    for i in range(0, len(data)):
        time.sleep(0.5)
        for k in data[i]['candidate_ligands']:
            smiles = k['smiles']
            common_name = smiles_to_name(smiles)
            k['common_name'] = common_name

        print(i)

    with open("../public/ligifyDB_chemName.json", "w") as f:
        json.dump(data,f)
