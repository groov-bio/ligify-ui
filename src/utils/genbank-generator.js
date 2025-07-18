// genbank-generator.js

/**
 * Represents a sequence feature with genomic coordinates and metadata
 */
 class SeqFeature {
    constructor(start, end, strand, type, qualifiers = {}) {
        this.start = start;
        this.end = end;
        this.strand = strand;
        this.type = type;
        this.qualifiers = qualifiers;
    }
}

/**
 * Represents a sequence record with metadata and features
 */
class SeqRecord {
    constructor(sequence, id, name, description, annotations = {}) {
        this.sequence = sequence;
        this.id = id;
        this.name = name;
        this.description = description;
        this.annotations = annotations;
        this.features = [];
    }
    
    addFeature(feature) {
        this.features.push(feature);
    }
}

/**
 * Main GenBank generator class
 */
class GenBankGenerator {
    constructor(plasmidComponents, annotationsFn, codonOptFn) {
        this.plasmidComponents = plasmidComponents;
        this.getAnnotations = annotationsFn;
        this.codonOptimize = codonOptFn;
    }
    
    /**
     * Formats current date for GenBank header
     */
    formatGenBankDate() {
        const now = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                       'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const day = now.getDate().toString().padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    /**
     * Formats DNA sequence with proper spacing and line numbers
     */
    formatSequence(sequence, lineLength = 60) {
        let formatted = '';
        let position = 1;
        
        for (let i = 0; i < sequence.length; i += lineLength) {
            const chunk = sequence.slice(i, i + lineLength);
            const positionStr = position.toString().padStart(9, ' ');
            
            // Add spaces every 10 characters
            let spacedChunk = '';
            for (let j = 0; j < chunk.length; j += 10) {
                if (j > 0) spacedChunk += ' ';
                spacedChunk += chunk.slice(j, j + 10);
            }
            
            formatted += `${positionStr} ${spacedChunk}\n`;
            position += chunk.length;
        }
        
        return formatted;
    }
    
    /**
     * Formats a single feature for GenBank output
     */
    formatFeature(feature) {
        let location;
        
        if (feature.strand === 1) {
            location = `${feature.start + 1}..${feature.end}`;
        } else {
            location = `complement(${feature.start + 1}..${feature.end})`;
        }
        
        let featureStr = `     ${feature.type.padEnd(16)} ${location}\n`;
        
        // Add qualifiers
        for (const [key, value] of Object.entries(feature.qualifiers)) {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    featureStr += `                     /${key}="${v}"\n`;
                });
            } else {
                featureStr += `                     /${key}="${value}"\n`;
            }
        }
        
        return featureStr;
    }
    

    /**
     * Translates DNA sequence to protein using standard genetic code
     */
     translateDNA(dnaSequence, strand = 1) {
        const geneticCode = {
            'TTT': 'F', 'TTC': 'F', 'TTA': 'L', 'TTG': 'L',
            'TCT': 'S', 'TCC': 'S', 'TCA': 'S', 'TCG': 'S',
            'TAT': 'Y', 'TAC': 'Y', 'TAA': '*', 'TAG': '*',
            'TGT': 'C', 'TGC': 'C', 'TGA': '*', 'TGG': 'W',
            'CTT': 'L', 'CTC': 'L', 'CTA': 'L', 'CTG': 'L',
            'CCT': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
            'CAT': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
            'CGT': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
            'ATT': 'I', 'ATC': 'I', 'ATA': 'I', 'ATG': 'M',
            'ACT': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
            'AAT': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
            'AGT': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
            'GTT': 'V', 'GTC': 'V', 'GTA': 'V', 'GTG': 'V',
            'GCT': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
            'GAT': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
            'GGT': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
        };
        
        let sequence = dnaSequence.toUpperCase();
        
        // If negative strand, reverse complement first
        if (strand === -1) {
            const complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'};
            sequence = sequence.split('').reverse().map(base => complement[base] || base).join('');
        }
        
        let protein = '';
        for (let i = 0; i < sequence.length - 2; i += 3) {
            const codon = sequence.slice(i, i + 3);
            protein += geneticCode[codon] || 'X';
        }
        
        return protein;
    }


    /**
     * Converts SeqRecord to GenBank format string
     */
    recordToGenBank(record) {
        const date = this.formatGenBankDate();
        const sequenceLength = record.sequence.length;
        
        let genbank = '';

        // Header - ensure proper spacing and formatting
        const locusName = record.name.substring(0, 16).padEnd(16);
        const lengthStr = sequenceLength.toString().padStart(11);
        const topology = record.annotations.topology === 'circular' ? 'circular' : 'linear';

        genbank += `LOCUS       ${locusName} ${lengthStr} bp    DNA     ${topology} SYN ${date}\n`;
        genbank += `DEFINITION  ${record.description}\n`;
        genbank += `ACCESSION   ${record.id}\n`;
        genbank += `VERSION     ${record.id}\n`;
        genbank += `KEYWORDS    .\n`;
        genbank += `SOURCE      synthetic DNA construct\n`;
        genbank += `  ORGANISM  synthetic DNA construct\n`;
        genbank += `            other sequences; artificial sequences; synthetic DNA construct.\n`;
        genbank += `FEATURES             Location/Qualifiers\n`;
        
        
        // Features
        record.features.forEach(feature => {
            genbank += this.formatFeature(feature);
        });
        
        // Origin section
        genbank += `ORIGIN\n`;
        genbank += this.formatSequence(record.sequence.toLowerCase());
        genbank += `//\n`;
        
        return genbank;
    }
    
    /**
     * Main function to create GenBank file
     */
    createGenBank(regulatorName, reporter, promoterSeq, expressionPromoter, regulatorRBS, regulatorCDS, backbone) {
        
        // Initialize annotations
        const annotations = [
            {"type": "misc_feature",
            "label": "L3S2P00 terminator",
            "color": "#a6a6a6",
            "start": 0,
            "end": 64,
            "strand": -1}
        ]

        const terminator = "ggaccaaaacgaaaaaaggggagcggtttcccgctcccctcttttctggaatttggtaccgaggaatgaagcaggatta"
        var index = terminator.length;
        
        // Create the component sequences
        let reporterSeq;
        let reporterRBS;
        if (reporter === "GFP"){
            reporterSeq = "ttatttgtatagttcatccatgccatgtgtaatcccagcagctgttacaaactcaagaaggaccatgtggtctctcttttcgttgggatctttcgaaagggcagattgtgtggacaggtaatggttgtctggtaaaaggacagggccatcgccaattggagtattttgttgataatggtctgctagttgaacgcttccatcttcaatgttgtgtctaattttgaagttaactttgattccattcttttgtttgtctgccatgatgtatacattgtgtgagttatagttgtattccaatttgtgtccaagaatgtttccatcttctttaaaatcaataccttttaactcgattctattaacaagggtatcaccttcaaatttgacttcagcacgtgtcttgtagttcccgtcatctttgaaaaatatagttctttcctgtacataaccttcgggcatggcactcttgaaaaagtcatgctgtttcatatgatctgggtatctcgcaaagcattgaagaccatacgcgaaagtagtgacaagtgttggccatggaacaggtagttttccagtagtgcaaataaatttaagggtaagttttccgtatgttgcatcaccttcaccctctccactgacagaaaatttgtgcccattaacatcaccatctaattcaacaagaattgggacaactccagtgaaaagttcttctcctttactcat"
            reporterRBS = "ATATACCCCCTTATTCTCCCGTA"
            const gfpTranslation = this.translateDNA(reporterSeq, -1);
            // add reporter annotation
            annotations.push(
                {"type": "CDS",
                "label": "GFP_mut2",
                "color": "#00ff1e",
                "start": index,
                "end": index+reporterSeq.length,
                "strand": -1,
                "translation": gfpTranslation}
            )
            annotations.push(
                {"type": "misc_feature",
                "label": "GFP_mut2",
                "color": "#00ff1e",
                "start": index,
                "end": index+reporterSeq.length,
                "strand": -1}
            )

            // add reporter RBS annotation
            annotations.push(
                {"type": "misc_feature",
                "label": "GFP_RBS",
                "color": "#94ffa4",
                "start": index+reporterSeq.length,
                "end": index+reporterSeq.length+reporterRBS.length,
                "strand": -1}
            )
            index += (reporterSeq.length + reporterRBS.length)
        } else {
            reporterSeq = "ttagctccccccggaaccaccagtgctatggcgtgccacggagcgttcgtactgttctactacggtgtagtcctcgttatgagaggtgatatccaatttgcgatcaatattaaacgctcctggcatttgaacaggttttttagctttgtaggtcgttttgaaatcggctaagtagcgcccgccatctttaagacgtaaagccatcttaatatcccccttcaataccacgtcctctgggtataagcgctcagtactcgcctcccatcccatagtgcgcttttgcatgaccggaccatcgggcgggaagttgccaccacgcaattttactttgtagatcagggtcccatcctccaagcttgtatcttgggttactgagacagtacccccgtcctcaaagatcatcacgcgctcccatttgaagccttcggggaagctctgcttccaataatcaggaatatccgctggatgcttaataaaggcgcgagatccgtacatgaactggggacttaagatgtcccaactaaacggcagcgggcccccttttgtcaccttcaattttgctgtttgtgtaccctcataggggcggccttcgccctcgccctcaatctcaaactcgtgaccgttcatcgagccttccatgtgaaccttgaagcgcatgaactctttaatcacagcctctgtcgagtccat"
            reporterRBS = "aattactccttattaacccggaggtttacg"
            const rfpTranslation = this.translateDNA(reporterSeq, -1);
            // add reporter annotation
            annotations.push(
                {"type": "CDS",
                "label": "RFP (mScarlet-i)",
                "color": "#ff0037",
                "start": index,
                "end": index+reporterSeq.length,
                "strand": -1,
                "translation": rfpTranslation}
            )
            annotations.push(
                {"type": "misc_feature",
                "label": "RFP (mScarlet-i)",
                "color": "#ff0037",
                "start": index,
                "end": index+reporterSeq.length,
                "strand": -1}
            )
            // add reporter RBS annotation
            annotations.push(
                {"type": "misc_feature",
                "label": "RFP RBS",
                "color": "#ff9191",
                "start": index+reporterSeq.length,
                "end": index+reporterSeq.length+reporterRBS.length,
                "strand": -1}
            )
            index += (reporterSeq.length + reporterRBS.length)
        }

        // add insulator
        const reporterInsulator = "atatacccccttattctcccgtattaaacaaaattatttgtagaggccccatttcgtccttttggactcatcaggggtggtacacaccaccctatggggct"
        annotations.push(
            {"type": "misc_feature",
            "label": "ElvJ",
            "color": "#c587ff",
            "start": index,
            "end": index+reporterInsulator.length,
            "strand": -1}
        )
        index += reporterInsulator.length

        // add regulated_promoter annotation
        annotations.push(
            {"type": "misc_feature",
            "label": regulatorName+"_promoter",
            "color": "#fffb80",
            "start": index,
            "end": index+promoterSeq.length,
            "strand": -1}
        )
        index += promoterSeq.length


        // add bidirectional terminator
        const bidirectionalTerminator = "CATAAAAAAATGGCGCCGATGGGCGCCATTTTTCACTGTGTCATACGTAAAAAAGGGCGATCTTGCGACCGCCCTTTTTTTATTAAATGT"
        annotations.push(
            {"type": "misc_feature",
            "label": "DT60 double terminator",
            "color": "#a6a6a6",
            "start": index,
            "end": index+bidirectionalTerminator.length,
            "strand": -1}
        )
        index += bidirectionalTerminator.length


        // add expression promoter
        const promoters = {
            "P1": "aacgggctgtcgacctttgaaaagttcgATTACAgctagctcagtcctaggGACAATgctagcggatggc",
            "P10": "aacgggctgtcgaccggcgaaaagttcgATTACAgctagctcagtcctaggTACAATgctagcggatggc",
            "P50": "aacgggctgtcgaccggcgtgccgttcgTTTACCgctagctcagtcctaggTACAATgctagcggatggc",
            "P150": "aacgggctgtcgacctttgaaaagttcgTTTACCgctagctcagtcctaggTACAATgctagcggatggc",
            "P250": "aacgaaaatatatttttcaaaagtatcgTTTACCgctagctcagtcctaggTACAATgctagcggatggc",
            "P500": "aacgggctgtcgacctttgaaaagttcgTTTACAgctagctcagtcctaggTACAATgctagcggatggc",
            "P750": "aacgctcagtggcgcgcctcagtcctcgTTGACAgctagctcagtcctaggTACAATgctagcggatggc",
            "P1000": "aacgaaaatatatttttcaaaagtatcgTTGACAgctagctcagtcctaggTACAATgctagcggatggc",
        }
        var expressionPromoterSeq = promoters[expressionPromoter]
        annotations.push(
            {"type": "misc_feature",
            "label": expressionPromoter + " sigma70 Promoter",
            "color": "#ff8080",
            "start": index,
            "end": index+expressionPromoterSeq.length,
            "strand": 1}
        )
        annotations.push(
            {"type": "misc_feature",
            "label": "-35",
            "color": "#ff8080",
            "start": index + 28,
            "end": index + 28 + 6,
            "strand": 1}
        )
        annotations.push(
            {"type": "misc_feature",
            "label": "-10",
            "color": "#ff8080",
            "start": index + 51,
            "end": index + 51 + 6,
            "strand": 1}
        )
        index += expressionPromoterSeq.length

        // add Regulator bicistronic RBS
        const RBSs = {
            "0.75": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCGGATTCTAGTTAAAT",
            "2.3": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCTATGTGTTTTTAAAT",
            "4.6": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCGCCGGTGTTTTAAAT",
            "8.5": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCGGCGCGGTGTTAAAT",
            "13": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCTTATCGGGGTTAAAT",
            "18": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCTTGCAGAGGTTAAAT",
            "23": "GGGCCCAAGTTCACTTAAAAAGGAGATCAACAATGAAAGCAATTTTCGTACTGAAACATCTTAATCATGCGGAGGCAGCTTAAAT",
        }
        var regulatorRBSSeq = RBSs[regulatorRBS]
        const leaderPeptideTranslation = this.translateDNA(regulatorRBSSeq.slice(32,83), 1)
        annotations.push(
            {"type": "misc_feature",
            "label": "Bicistronic RBS "+regulatorRBS,
            "color": "#ffbd52",
            "start": index,
            "end": index+regulatorRBSSeq.length,
            "strand": 1}
        )
        annotations.push(
            {"type": "misc_feature",
            "label": "5'-UTR",
            "color": "#ffcb87",
            "start": index,
            "end": index + 32,
            "strand": 1}
        )
        annotations.push(
            {"type": "misc_feature",
            "label": "RBS",
            "color": "#ffbd52",
            "start": index + 70,
            "end": index + 79,
            "strand": 1}
        )
        annotations.push(
            {"type": "CDS",
            "label": "Leader peptide",
            "color": "#ffbd52",
            "start": index + 32,
            "end": index + regulatorRBSSeq.length - 2,
            "strand": 1,
            "translation":leaderPeptideTranslation}
        )
        index += regulatorRBSSeq.length

        // Add regulator coding sequence
        const regulatorTranslation = this.translateDNA(regulatorCDS, 1);
        annotations.push(
            {"type": "CDS",
            "label": regulatorName,
            "color": "#ffa3fa",
            "start": index,
            "end": index+regulatorCDS.length,
            "strand": 1,
            "translation":regulatorTranslation}
        )
        annotations.push(
            {"type": "misc_feature",
            "label": regulatorName,
            "color": "#ffa3fa",
            "start": index,
            "end": index+regulatorCDS.length,
            "strand": 1}
        )
        index += regulatorCDS.length

        // Add regulator's terminator
        const regTerminator = "TAATCCTAATCACTTTCAGCCAAAAAACTTAAGACCGCCGGTCTTGTCCACTACCTTGCAGTAATGCGGTGGACAGGATCGGCGGTTTTCTTTTCTCTTCTCAA"
        annotations.push(
            {"type": "misc_feature",
            "label": "ECK12_spy_terminator",
            "color": "#a6a6a6",
            "start": index + 14,
            "end": index + regTerminator.length,
            "strand": 1}
        )
        index += regTerminator.length


        if (backbone === "pTWIST_Kan_Medium"){
            // Add p15A-Kan backbone
            var backboneSeq = 'AGGCTAGGTGGAGGCTCAGTGATGATAAGTCTGCGATGGTGGATGCATGTGTCATGGTCATAGCTGTTTCCTGTGTGAAATTGTTATCCGCTCAGAGGGCACAATCCTATTCCGCGCTATCCGACAATCTCCAAGACATTAGGTGGAGTTCAGTTCGGCGAGCGGAAATGGCTTACGAACGGGGCGGAGATTTCCTGGAAGATGCCAGGAAGATACTTAACAGGGAAGTGAGAGGGCCGCGGCAAAGCCGTTTTTCCATAGGCTCCGCCCCCCTGACAAGCATCACGAAATCTGACGCTCAAATCAGTGGTGGCGAAACCCGACAGGACTATAAAGATACCAGGCGTTTCCCCCTGGCGGCTCCCTCGTGCGCTCTCCTGTTCCTGCCTTTCGGTTTACCGGTGTCATTCCGCTGTTATGGCCGCGTTTGTCTCATTCCACGCCTGACACTCAGTTCCGGGTAGGCAGTTCGCTCCAAGCTGGACTGTATGCACGAACCCCCCGTTCAGTCCGACCGCTGCGCCTTATCCGGTAACTATCGTCTTGAGTCCAACCCGGAAAGACATGCAAAAGCACCACTGGCAGCAGCCACTGGTAATTGATTTAGAGGAGTTAGTCTTGAAGTCATGCGCCGGTTAAGGCTAAACTGAAAGGACAAGTTTTGGTGACTGCGCTCCTCCAAGCCAGTTACCTCGGTTCAAAGAGTTGGTAGCTCAGAGAACCTTCGAAAAACCGCCCTGCAAGGCGGTTTTTTCGTTTTCAGAGCAAGAGATTACGCGCAGACCAAAACGATCTCAAGAAGATCATCTTATTAAGTCTGACGCTCTATTCAACAAAGCCGCCGTCCATGGGTAGGGGGCTTCAAATCGTCCGCTCTGCCAGTGTTACAACCAATTAACAAATTCTGATTAGAAAAACTCATCGAGCATCAAATGAAACTGCAATTTATTCATATCAGGATTATCAATACCATATTTTTGAAAAAGCCGTTTCTGTAATGAAGGAGAAAACTCACCGAGGCAGTTCCATAGGATGGCAAGATCCTGGTATCGGTCTGCGATTCCGACTCGTCCAACATCAATACAACCTATTAATTTCCCCTCGTCAAAAATAAGGTTATCAAGTGAGAAATCACCATGAGTGACGACTGAATCCGGTGAGAATGGCAAAAGCTTATGCATTTCTTTCCAGACTTGTTCAACAGGCCAGCCATTACGCTCGTCATCAAAATCACTCGCATCAACCAAACCGTTATTCATTCGTGATTGCGCCTGAGCGAGACGAAATACGCGATCGCTGTTAAAAGGACAATTACAAACAGGAATCGAATGCAACCGGCGCAGGAACACTGCCAGCGCATCAACAATATTTTCACCTGAATCAGGATATTCTTCTAATACCTGGAATGCTGTTTTCCCGGGGATCGCAGTGGTGAGTAACCATGCATCATCAGGAGTACGGATAAAATGCTTGATGGTCGGAAGAGGCATAAATTCCGTCAGCCAGTTTAGTCTGACCATCTCATCTGTAACATCATTGGCAACGCTACCTTTGCCATGTTTCAGAAACAACTCTGGCGCATCGGGCTTCCCATACAATCGATAGATTGTCGCACCTGATTGCCCGACATTATCGCGAGCCCATTTATACCCATATAAATCAGCATCCATGTTGGAATTTAATCGCGGCCTCGAGCAAGACGTTTCCCGTTGAATATGGCTCATAACACCCCTTGTATTACTGTTTATGTAAGCAGACAGTTTTATTGTTCATGATGATATATTTTTATCTTGTGCAATGTAACATCAGAGATTTTGAGACACAACGTGGCTTTCCCCCGCCGCTCTAGAACTAGTGGATCCAAATAAAACGAAAGGCTCAGTCGAAAGACTGGGCCTTTCGTTTTATCTGTTGTTTGTCGCATTATACGAGACGTCCAGGTTGGGATACCTGAAACAAAACCCATCGTACGGCCAAGGAAGTCTCCAATAACTGTGATCCACCACAAGCGCCAGGGTTTTCCCAGTCACGACGTTGTAAAACGACGGCCAGTCATGCATAATCCGCACGCATCTGGAATAAGGAAGTGCCATTCCGCCTGACCT'
            annotations.push(
                {"type": "misc_feature",
                "label": "pTWIST_Kan_Medium",
                "color": "#c2c2c2",
                "start": index,
                "end": index + backboneSeq.length,
                "strand": 1}
            )
            // origin
            annotations.push(
                {"type": "misc_feature",
                "label": "p15A origin",
                "color": "#ffb92e",
                "start": index + 252,
                "end": index + 252 + 546,
                "strand": -1}
            )
            index += 798
            // kan
            annotations.push(
                {"type": "misc_feature",
                "label": "Kan",
                "color": "#94ffa4",
                "start": index + 110,
                "end": index + 110 + 816,
                "strand": -1}
            )
            index += 926
            // terminator
            annotations.push(
                {"type": "misc_feature",
                "label": "rrnB T1 terminator",
                "color": "#a6a6a6",
                "start": index + 137,
                "end": index + 137 + 47,
                "strand": 1}
            )
        } else {
            var backboneSeq = ""
        }


        
        const seq = terminator + reporterSeq + reporterRBS + reporterInsulator + promoterSeq + bidirectionalTerminator + expressionPromoterSeq + regulatorRBSSeq + regulatorCDS + regTerminator + backboneSeq
        
        


        
        // Create sequence record
        const record = new SeqRecord(
            seq,
            regulatorName,
            `pLigify_${regulatorName}`,
            `This is a genetic circuit designed by Ligify to express GFP in response to a small molecule using the regulator ${regulatorName}`,
            {
                molecule_type: "DNA",
                topology: "circular"
            }
        );

        annotations.forEach(annotation => {
                const qualifiers = {
                    label: annotation.label,
                    ApEinfo_revcolor: [annotation["color"]],
                    ApEinfo_fwdcolor: [annotation["color"]]
                };
                const feature = new SeqFeature(
                    annotation['start'],
                    annotation['end'],
                    annotation['strand'],
                    annotation['type'],
                    qualifiers
                );
                
                record.addFeature(feature);
            });

    
        
        return this.recordToGenBank(record);
    }
}

/**
 * Simple factory function for easy use in React components
 */
export const createGenBankGenerator = (options = {}) => {
    const {
        plasmidComponents = {
            before_promoter: "",
            before_regulator: "",
            after_regulator: ""
        },
        annotationsFn = null,
        codonOptFn = null
    } = options;
    
    return new GenBankGenerator(plasmidComponents, annotationsFn, codonOptFn);
};

/**
 * Convenience function for quick GenBank generation
 */
export const generateGenBank = (regulatorName, reporter, promoterSeq, expressionPromoter, regulatorRBS, regulatorCDS, backbone) => {
    const generator = createGenBankGenerator();
    return generator.createGenBank(regulatorName, reporter, promoterSeq, expressionPromoter, regulatorRBS, regulatorCDS, backbone);
};

/**
 * Utility function to download GenBank file in browser
 */
export const downloadGenBank = (genbankContent, regulator_name) => {
    const filename = "Ligify_"+regulator_name.toString()+".gb"
    const blob = new Blob([genbankContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Export classes for advanced usage
export { GenBankGenerator, SeqRecord, SeqFeature };

// Default export for convenience
export default {
    createGenBankGenerator,
    generateGenBank,
    downloadGenBank,
    GenBankGenerator,
    SeqRecord,
    SeqFeature
};