"""
Generate ligandMap.json: { "ligand_name": ["refseq1", "refseq2", ...], ... }
from the ligifyDB.json file.
"""
import json
from collections import defaultdict

DB_PATH = "../public/ligifyDB.json"
OUT_PATH = "../public/ligandMap.json"

with open(DB_PATH, "r") as f:
    data = json.load(f)

# Normalize root to a list
if isinstance(data, list):
    records = data
elif isinstance(data, dict) and "regulators" in data:
    records = data["regulators"]
else:
    records = list(data.values())

ligand_map = defaultdict(list)

for reg in records:
    refseq = reg.get("refseq", "")
    if not refseq:
        continue
    for ligand in reg.get("candidate_ligands", []):
        name = ligand.get("name", "").strip()
        if name:
            ligand_map[name].append(refseq)

# Sort ligand names alphabetically, deduplicate regulator lists
result = {
    name: sorted(set(refsqs))
    for name, refsqs in sorted(ligand_map.items())
}

with open(OUT_PATH, "w") as f:
    json.dump(result, f, indent=2)

print(f"Done. {len(result)} unique ligands written to {OUT_PATH}")
unique_regs = len({r for refsqs in result.values() for r in refsqs})
print(f"Covering {unique_regs} unique regulators.")
