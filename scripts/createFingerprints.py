import os
import json
import gzip
import argparse
from pathlib import Path
import sys
from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem import rdFingerprintGenerator

# Set base directory
BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__))).parent
LIGIFY_DB_FILE = BASE_DIR / "src" / "ligifyDB.json"
OUTPUT_DIR = BASE_DIR / "fingerprints"
OUTPUT_FILE = OUTPUT_DIR / "fingerprints.json"
GZIPPED_OUTPUT = OUTPUT_DIR / "fingerprints.json.gz"

# Configuration - matching groov-api settings
FINGERPRINT_RADIUS = 2 
FINGERPRINT_NBITS = 2048

# Create the Morgan fingerprint generator once
morgan_generator = rdFingerprintGenerator.GetMorganGenerator(
    radius=FINGERPRINT_RADIUS,
    fpSize=FINGERPRINT_NBITS
)


def load_ligify_db():
    """Load the ligifyDB.json file"""
    try:
        print(f"Loading ligifyDB from {LIGIFY_DB_FILE}")
        with open(LIGIFY_DB_FILE, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading ligifyDB.json: {e}")
        return None


def generate_fingerprints():
    """Generate fingerprints from ligifyDB.json candidate_ligands"""
    ligify_data = load_ligify_db()
    if not ligify_data:
        return []
    
    # List to store all fingerprint data
    all_fingerprints = []
    ligand_count = 0
    regulator_count = 0
    error_count = 0
    
    # Generate a unique ligand ID counter
    next_ligand_id = 1
    seen_smiles = {}  # Map SMILES to ligand IDs to avoid duplicates
    
    for regulator in ligify_data:
        regulator_id = regulator.get("refseq")
        if not regulator_id:
            continue
            
        candidate_ligands = regulator.get("candidate_ligands", [])
        if not candidate_ligands:
            continue
            
        regulator_count += 1
        if regulator_count % 1000 == 0:
            print(f"Processed {regulator_count} regulators...")
        
        for ligand in candidate_ligands:
            smiles = ligand.get("smiles")
            ligand_name = ligand.get("name", "Unknown")
            
            if not smiles:
                continue
            
            # Check if we've seen this SMILES before
            if smiles in seen_smiles:
                ligand_id = seen_smiles[smiles]["ligand_id"]
                bit_string = seen_smiles[smiles]["bit_string"]
                # Add another regulator association for this ligand
                all_fingerprints.append([bit_string, ligand_id, regulator_id, ligand_name, smiles])
                continue
            else:
                # Generate a new ligand ID
                ligand_id = f"LIG{next_ligand_id:05d}"
                next_ligand_id += 1
                
                try:
                    # Generate Morgan fingerprint using RDKit
                    mol = Chem.MolFromSmiles(smiles)
                    if mol:
                        # Generate fingerprint using the MorganGenerator
                        fingerprint = morgan_generator.GetFingerprint(mol)
                        
                        # Convert the fingerprint to a bit string for safe JSON serialization
                        bit_string = fingerprint.ToBitString()
                        
                        # Store for reuse
                        seen_smiles[smiles] = {
                            "ligand_id": ligand_id,
                            "bit_string": bit_string
                        }
                        
                        # Store fingerprint data: [bit_string, ligand_id, regulator_id, ligand_name, smiles]
                        all_fingerprints.append([bit_string, ligand_id, regulator_id, ligand_name, smiles])
                        ligand_count += 1
                    else:
                        print(f"  Warning: Could not parse SMILES: {smiles}")
                        error_count += 1
                except Exception as e:
                    print(f"  Error generating fingerprint for {smiles}: {e}")
                    error_count += 1
    
    print(f"Processed {regulator_count} regulators with {ligand_count} unique ligands")
    print(f"Total fingerprint entries: {len(all_fingerprints)}")
    if error_count > 0:
        print(f"Encountered {error_count} errors")
    
    return all_fingerprints


def save_fingerprints(fingerprints):
    """Save fingerprints to JSON file (safe serialization)"""
    try:
        # Ensure output directory exists
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        
        # Save as JSON file (safe serialization - no pickle vulnerabilities)
        with open(OUTPUT_FILE, "w") as f:
            json.dump(fingerprints, f)
        
        print(f"Saved fingerprints to {OUTPUT_FILE}")
        
        # Create a gzipped version for more efficient storage/transfer
        with open(OUTPUT_FILE, "rb") as f_in:
            with gzip.open(GZIPPED_OUTPUT, "wb") as f_out:
                f_out.write(f_in.read())
        
        print(f"Created compressed version at {GZIPPED_OUTPUT}")
        
        # Print file sizes
        original_size = os.path.getsize(OUTPUT_FILE)
        compressed_size = os.path.getsize(GZIPPED_OUTPUT)
        print(f"Original size: {original_size/1024:.2f} KB")
        print(f"Compressed size: {compressed_size/1024:.2f} KB")
        print(f"Compression ratio: {original_size/compressed_size:.2f}x")
        
    except Exception as e:
        print(f"Error saving fingerprints: {e}")


def main():
    try:
        parser = argparse.ArgumentParser(description='Generate fingerprints for ligify chemical similarity search')
        args = parser.parse_args()
        
        if 'rdkit' not in sys.modules:
            print("Error: RDKit is not installed. Please install it with:")
            print("  pip install rdkit")
            return 1
        
        if not os.path.exists(LIGIFY_DB_FILE):
            print(f"Error: ligifyDB.json not found at {LIGIFY_DB_FILE}")
            return 1
            
        print(f"Generating fingerprints from ligifyDB.json at {LIGIFY_DB_FILE}")
        fingerprints = generate_fingerprints()
        
        if fingerprints:
            save_fingerprints(fingerprints)
            print("Fingerprint generation completed successfully!")
            print(f"Generated {len(fingerprints)} fingerprint entries")
            return 0
        else:
            print("No fingerprints were generated. Check if ligifyDB.json contains candidate_ligands with SMILES strings.")
            return 1
            
    except Exception as e:
        print(f"Unexpected error: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())