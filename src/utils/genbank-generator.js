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
    createGenBank(regulatorName, reporter, promoterSeq, expressionPromoter) {
        // Codon optimize the natural sequence
        // const optRegulatorSeq = this.codonOptimize ? 
        //     this.codonOptimize(regulatorProteinSeq) : 
        //     regulatorProteinSeq;
        
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
            // add reporter annotation
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
            // add reporter annotation
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
                "color": "#ffdb94",
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
        const bidirectionalTerminator = "ggaccaaaacgaaaaaaggcccccctttcgggaggcctcttttctggaatttggtaccgagtgcagacgtaaaaaaagcggcgtggttagccgcttttttaattgccgga"
        annotations.push(
            {"type": "misc_feature",
            "label": "DT5 double terminator",
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
            "label": expressionPromoter,
            "color": "#ff8080",
            "start": index,
            "end": index+expressionPromoterSeq.length,
            "strand": 1}
        )
        index += expressionPromoterSeq.length




        
        const seq = terminator + reporterSeq + reporterRBS + reporterInsulator + promoterSeq + bidirectionalTerminator + expressionPromoterSeq
        
        


        
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

        // Add annotations if function provided
        // if (this.getAnnotations) {
        //     const annotations = this.getAnnotations(promoterSeq, optRegulatorSeq, regulatorName, regulatorProteinSeq);
            
        //     annotations.forEach(annotation => {
        //         const qualifiers = {
        //             ApEinfo_fwdcolor: [annotation.color],
        //             label: annotation.label
        //         };
                
        //         if (annotation.translation) {
        //             qualifiers.translation = [annotation.translation];
        //         }
                
        //         const feature = new SeqFeature(
        //             annotation.start,
        //             annotation.end,
        //             annotation.strand,
        //             annotation.type,
        //             qualifiers
        //         );
                
        //         record.addFeature(feature);
        //     });
        // }
        
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
export const generateGenBank = (regulatorName, reporter, promoterSeq, expressionPromoter) => {
    const generator = createGenBankGenerator();
    return generator.createGenBank(regulatorName, reporter, promoterSeq, expressionPromoter);
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