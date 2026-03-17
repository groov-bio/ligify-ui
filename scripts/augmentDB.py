# This code contains several functions that ADD DATA to the Ligify database after its initial creation

# The functions should only need to be run once (to add the data).

import json
import requests
import time

# load the database into memory
with open("../public/ligifyDB.json", "r") as f:
    data = json.load(f)


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
    for i in range(2500, len(data)):
        time.sleep(0.5)
        org_tax = get_refseq_metadata(data[i]['refseq'])
        data[i]["organism"] = org_tax["organism"]
        data[i]["taxon"] = org_tax["taxon"]

        print(i)

    with open("../public/ligifyDB.json", "w") as f:
        json.dump(data,f)


with open("../public/ligifyDB.json") as f:
    json.dumps(data)