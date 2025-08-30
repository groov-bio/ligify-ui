// E. coli codon optimization function
// Based on E. coli K-12 codon usage frequencies

// E. coli codon usage table (per 1000 codons)
// Higher values indicate more frequently used codons
const ECOLI_CODON_TABLE = {
    'F': [
      { codon: 'TTT', frequency: 22.0 },
      { codon: 'TTC', frequency: 16.0 }
    ],
    'L': [
      { codon: 'TTA', frequency: 13.0 },
      { codon: 'TTG', frequency: 13.0 },
      { codon: 'CTT', frequency: 11.0 },
      { codon: 'CTC', frequency: 10.0 },
      { codon: 'CTA', frequency: 4.0 },
      { codon: 'CTG', frequency: 52.0 }
    ],
    'S': [
      { codon: 'TCT', frequency: 15.0 },
      { codon: 'TCC', frequency: 15.0 },
      { codon: 'TCA', frequency: 12.0 },
      { codon: 'TCG', frequency: 14.0 },
      { codon: 'AGT', frequency: 15.0 },
      { codon: 'AGC', frequency: 27.0 }
    ],
    'Y': [
      { codon: 'TAT', frequency: 16.0 },
      { codon: 'TAC', frequency: 12.0 }
    ],
    'C': [
      { codon: 'TGT', frequency: 5.0 },
      { codon: 'TGC', frequency: 6.0 }
    ],
    'W': [
      { codon: 'TGG', frequency: 15.0 }
    ],
    'P': [
      { codon: 'CCT', frequency: 7.0 },
      { codon: 'CCC', frequency: 5.0 },
      { codon: 'CCA', frequency: 20.0 },
      { codon: 'CCG', frequency: 23.0 }
    ],
    'H': [
      { codon: 'CAT', frequency: 13.0 },
      { codon: 'CAC', frequency: 10.0 }
    ],
    'Q': [
      { codon: 'CAA', frequency: 15.0 },
      { codon: 'CAG', frequency: 29.0 }
    ],
    'R': [
      { codon: 'CGT', frequency: 20.0 },
      { codon: 'CGC', frequency: 22.0 },
      { codon: 'CGA', frequency: 3.0 },
      { codon: 'CGG', frequency: 5.0 },
      { codon: 'AGA', frequency: 2.0 },
      { codon: 'AGG', frequency: 1.0 }
    ],
    'I': [
      { codon: 'ATT', frequency: 30.0 },
      { codon: 'ATC', frequency: 25.0 },
      { codon: 'ATA', frequency: 4.0 }
    ],
    'M': [
      { codon: 'ATG', frequency: 27.0 }
    ],
    'T': [
      { codon: 'ACT', frequency: 17.0 },
      { codon: 'ACC', frequency: 25.0 },
      { codon: 'ACA', frequency: 13.0 },
      { codon: 'ACG', frequency: 14.0 }
    ],
    'N': [
      { codon: 'AAT', frequency: 17.0 },
      { codon: 'AAC', frequency: 22.0 }
    ],
    'K': [
      { codon: 'AAA', frequency: 33.0 },
      { codon: 'AAG', frequency: 11.0 }
    ],
    'V': [
      { codon: 'GTT', frequency: 18.0 },
      { codon: 'GTC', frequency: 15.0 },
      { codon: 'GTA', frequency: 11.0 },
      { codon: 'GTG', frequency: 26.0 }
    ],
    'A': [
      { codon: 'GCT', frequency: 18.0 },
      { codon: 'GCC', frequency: 26.0 },
      { codon: 'GCA', frequency: 23.0 },
      { codon: 'GCG', frequency: 25.0 }
    ],
    'D': [
      { codon: 'GAT', frequency: 32.0 },
      { codon: 'GAC', frequency: 19.0 }
    ],
    'E': [
      { codon: 'GAA', frequency: 40.0 },
      { codon: 'GAG', frequency: 19.0 }
    ],
    'G': [
      { codon: 'GGT', frequency: 25.0 },
      { codon: 'GGC', frequency: 29.0 },
      { codon: 'GGA', frequency: 8.0 },
      { codon: 'GGG', frequency: 12.0 }
    ],
    '*': [
      { codon: 'TAA', frequency: 2.0 },
      { codon: 'TAG', frequency: 0.2 },
      { codon: 'TGA', frequency: 1.0 }
    ]
  };
  
  // Standard genetic code for translation
  const GENETIC_CODE = {
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
  

  
  /**
   * Translates DNA sequence to protein sequence
   * @param {string} dnaSequence - DNA sequence to translate
   * @returns {string} - Translated protein sequence
   */
  function translateDnaToProtein(dnaSequence) {
    
    let protein = '';
    for (let i = 0; i < dnaSequence.length; i += 3) {
      const codon = dnaSequence.substring(i, i + 3).toUpperCase();
      const aminoAcid = GENETIC_CODE[codon];
      if (!aminoAcid) {
        throw new Error(`Invalid codon: ${codon}`);
      }
      protein += aminoAcid;
    }
    
    return protein;
  }
  
  /**
   * Checks if adding a codon would create any forbidden sequences
   * @param {string} currentDna - Current DNA sequence
   * @param {string} newCodon - Codon to potentially add
   * @param {Array} forbiddenSequences - Array of forbidden sequence strings
   * @returns {boolean} - True if safe to add, false if would create forbidden sequence
   */
  function isSafeFromForbiddenSequences(currentDna, newCodon, forbiddenSequences = []) {
    if (forbiddenSequences.length === 0) return true;
    
    const testSequence = currentDna + newCodon;
    
    // Check if any forbidden sequence would be created
    for (const forbidden of forbiddenSequences) {
      if (testSequence.toUpperCase().includes(forbidden.toUpperCase())) {
        // Additional check: make sure the forbidden sequence wasn't already there
        if (!currentDna.toUpperCase().includes(forbidden.toUpperCase())) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  /**
   * Checks if adding a codon would create a homopolymer run longer than maxLength
   * @param {string} currentDna - Current DNA sequence
   * @param {string} newCodon - Codon to potentially add
   * @param {number} maxLength - Maximum allowed homopolymer length
   * @returns {boolean} - True if safe to add, false if would create long homopolymer
   */
  function isSafeFromHomopolymer(currentDna, newCodon, maxLength = 10) {
    const testSequence = currentDna + newCodon;
    
    // Check for homopolymer runs
    for (let i = 0; i < testSequence.length; i++) {
      let runLength = 1;
      const nucleotide = testSequence[i];
      
      // Count consecutive identical nucleotides
      for (let j = i + 1; j < testSequence.length && testSequence[j] === nucleotide; j++) {
        runLength++;
      }
      
      if (runLength > maxLength) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Finds forbidden sequence violations in a DNA sequence
   * @param {string} dnaSequence - DNA sequence to check
   * @param {Array} forbiddenSequences - Array of forbidden sequence strings
   * @returns {Array} - Array of violation objects with sequence, positions found
   */
  function findForbiddenSequenceViolations(dnaSequence, forbiddenSequences = ['GGAGG', 'TAAGGAG']) {
    const violations = [];
    
    for (const forbidden of forbiddenSequences) {
      const upperSequence = dnaSequence.toUpperCase();
      const upperForbidden = forbidden.toUpperCase();
      let startIndex = 0;
      
      while (true) {
        const index = upperSequence.indexOf(upperForbidden, startIndex);
        if (index === -1) break;
        
        violations.push({
          sequence: forbidden,
          position: index,
          length: forbidden.length
        });
        
        startIndex = index + 1; // Look for overlapping matches
      }
    }
    
    return violations;
  }
  
  /**
   * Finds homopolymer violations in a DNA sequence
   * @param {string} dnaSequence - DNA sequence to check
   * @param {number} maxLength - Maximum allowed homopolymer length
   * @returns {Array} - Array of violation objects with position, nucleotide, and length
   */
  function findHomopolymerViolations(dnaSequence, maxLength = 10) {
    const violations = [];
    
    for (let i = 0; i < dnaSequence.length; i++) {
      let runLength = 1;
      const nucleotide = dnaSequence[i];
      let startPos = i;
      
      // Count consecutive identical nucleotides
      while (i + runLength < dnaSequence.length && dnaSequence[i + runLength] === nucleotide) {
        runLength++;
      }
      
      if (runLength > maxLength) {
        violations.push({
          position: startPos,
          nucleotide: nucleotide,
          length: runLength
        });
      }
      
      // Skip ahead to avoid counting the same run multiple times
      i += runLength - 1;
    }
    
    return violations;
  }
  
  /**
   * Calculates GC content of a DNA sequence
   * @param {string} dnaSequence - DNA sequence
   * @returns {number} - GC content as percentage
   */
  function calculateGcContent(dnaSequence) {
    const gcCount = (dnaSequence.match(/[GC]/gi) || []).length;
    return (gcCount / dnaSequence.length) * 100;
  }
  
  /**
   * Checks if adding a codon would keep GC content within desired range
   * @param {string} currentDna - Current DNA sequence
   * @param {string} newCodon - Codon to potentially add
   * @param {number} minGc - Minimum GC content percentage
   * @param {number} maxGc - Maximum GC content percentage
   * @returns {boolean} - True if GC content would remain in range
   */
  function isGcContentSafe(currentDna, newCodon, minGc = 35, maxGc = 70) {
    const testSequence = currentDna + newCodon;
    const gcContent = calculateGcContent(testSequence);
    return gcContent >= minGc && gcContent <= maxGc;
  }
  
  /**
   * Selects the most optimal codon for a given amino acid based on E. coli usage
   * @param {string} aminoAcid - Single amino acid character
   * @param {string} strategy - Optimization strategy ('most_frequent', 'balanced', 'avoid_rare')
   * @param {string} currentDna - Current DNA sequence (for constraint checking)
   * @param {Object} constraints - Constraint parameters
   * @returns {string} - Optimal codon
   */
  function selectOptimalCodon(aminoAcid, strategy = 'most_frequent', currentDna = '', constraints = {}) {
    const {
      minGc = 35,
      maxGc = 70,
      maxHomopolymer = 10,
      forbiddenSequences = ['GGAGG', 'TAAGGAG'],
      enforceConstraints = true
    } = constraints;
    
    const codons = ECOLI_CODON_TABLE[aminoAcid.toUpperCase()];
    
    if (!codons) {
      throw new Error(`Invalid amino acid: ${aminoAcid}`);
    }
    
    // Sort codons by frequency (descending)
    const sortedCodons = [...codons].sort((a, b) => b.frequency - a.frequency);
    
    // If constraints are disabled, use original logic
    if (!enforceConstraints) {
      switch (strategy) {
        case 'most_frequent':
          return sortedCodons[0].codon;
        case 'balanced':
          const totalFreq = codons.reduce((sum, c) => sum + c.frequency, 0);
          const rand = Math.random() * totalFreq;
          let cumulative = 0;
          for (const codon of codons) {
            cumulative += codon.frequency;
            if (rand <= cumulative) {
              return codon.codon;
            }
          }
          return codons[0].codon;
        case 'avoid_rare':
          const avgFreq = codons.reduce((sum, c) => sum + c.frequency, 0) / codons.length;
          const goodCodons = codons.filter(c => c.frequency >= avgFreq);
          return goodCodons.length > 0 ? goodCodons[0].codon : codons[0].codon;
        default:
          throw new Error(`Unknown strategy: ${strategy}`);
      }
    }
    
    // Filter codons that satisfy constraints
    const validCodons = sortedCodons.filter(codonObj => {
      const codon = codonObj.codon;
      return isSafeFromHomopolymer(currentDna, codon, maxHomopolymer) &&
             isGcContentSafe(currentDna, codon, minGc, maxGc) &&
             isSafeFromForbiddenSequences(currentDna, codon, forbiddenSequences);
    });
    
    // If no codons satisfy constraints, relax constraints gradually
    if (validCodons.length === 0) {
      console.warn(`No codons for ${aminoAcid} satisfy all constraints. Relaxing constraints.`);
      
      // Try with relaxed homopolymer constraint
      const relaxedHomopolymer = sortedCodons.filter(codonObj => {
        const codon = codonObj.codon;
        return isSafeFromHomopolymer(currentDna, codon, maxHomopolymer + 2) &&
               isGcContentSafe(currentDna, codon, minGc, maxGc) &&
               isSafeFromForbiddenSequences(currentDna, codon, forbiddenSequences);
      });
      
      if (relaxedHomopolymer.length > 0) {
        return selectFromValidCodons(relaxedHomopolymer, strategy);
      }
      
      // Try with relaxed GC constraint but keep forbidden sequences
      const relaxedGc = sortedCodons.filter(codonObj => {
        const codon = codonObj.codon;
        return isSafeFromHomopolymer(currentDna, codon, maxHomopolymer) &&
               isGcContentSafe(currentDna, codon, minGc - 5, maxGc + 5) &&
               isSafeFromForbiddenSequences(currentDna, codon, forbiddenSequences);
      });
      
      if (relaxedGc.length > 0) {
        return selectFromValidCodons(relaxedGc, strategy);
      }
      
      // Try with both relaxed constraints but keep forbidden sequences
      const relaxedBoth = sortedCodons.filter(codonObj => {
        const codon = codonObj.codon;
        return isSafeFromHomopolymer(currentDna, codon, maxHomopolymer + 2) &&
               isGcContentSafe(currentDna, codon, minGc - 5, maxGc + 5) &&
               isSafeFromForbiddenSequences(currentDna, codon, forbiddenSequences);
      });
      
      if (relaxedBoth.length > 0) {
        return selectFromValidCodons(relaxedBoth, strategy);
      }
      
      // Last resort: only avoid forbidden sequences
      const onlyForbidden = sortedCodons.filter(codonObj => {
        const codon = codonObj.codon;
        return isSafeFromForbiddenSequences(currentDna, codon, forbiddenSequences);
      });
      
      if (onlyForbidden.length > 0) {
        return selectFromValidCodons(onlyForbidden, strategy);
      }
      
      // If all else fails, use the most frequent codon (should rarely happen)
      console.warn(`Using most frequent codon for ${aminoAcid} despite constraint violations`);
      return sortedCodons[0].codon;
    }
    
    return selectFromValidCodons(validCodons, strategy);
  }
  
  /**
   * Selects a codon from valid options based on strategy
   * @param {Array} validCodons - Array of valid codon objects
   * @param {string} strategy - Selection strategy
   * @returns {string} - Selected codon
   */
  function selectFromValidCodons(validCodons, strategy) {
    switch (strategy) {
      case 'most_frequent':
        return validCodons[0].codon;
        
      case 'balanced':
        const totalFreq = validCodons.reduce((sum, c) => sum + c.frequency, 0);
        const rand = Math.random() * totalFreq;
        let cumulative = 0;
        
        for (const codon of validCodons) {
          cumulative += codon.frequency;
          if (rand <= cumulative) {
            return codon.codon;
          }
        }
        return validCodons[0].codon;
        
      case 'avoid_rare':
        const avgFreq = validCodons.reduce((sum, c) => sum + c.frequency, 0) / validCodons.length;
        const goodCodons = validCodons.filter(c => c.frequency >= avgFreq);
        return goodCodons.length > 0 ? goodCodons[0].codon : validCodons[0].codon;
        
      default:
        return validCodons[0].codon;
    }
  }
  
  /**
   * Optimizes a protein sequence for E. coli expression
   * @param {string} proteinSequence - Protein sequence to optimize
   * @param {Object} options - Optimization options
   * @param {string} options.strategy - Optimization strategy ('most_frequent', 'balanced', 'avoid_rare')
   * @param {boolean} options.removeStopCodons - Whether to remove stop codons except the last one
   * @param {number} options.minGc - Minimum GC content percentage (default: 35)
   * @param {number} options.maxGc - Maximum GC content percentage (default: 70)
   * @param {number} options.maxHomopolymer - Maximum homopolymer length (default: 10)
   * @param {Array} options.forbiddenSequences - Array of forbidden DNA sequences (default: ['GGAGG', 'TAAGGAG'])
   * @param {boolean} options.enforceConstraints - Whether to enforce GC and homopolymer constraints (default: true)
   * @param {number} options.maxRetries - Maximum optimization retries if constraints fail (default: 3)
   * @returns {Object} - Optimization result with original protein, optimized DNA, and statistics
   */
  function optimizeForEcoli(proteinSequence, options = {}) {
    const {
      strategy = 'most_frequent',
      minGc = 35,
      maxGc = 70,
      maxHomopolymer = 10,
      forbiddenSequences = ['GGAGG', 'TAAGGAG'],
      enforceConstraints = true,
      maxRetries = 3
    } = options;
    
    
    const upperProtein = proteinSequence.toUpperCase();
    let processedProtein = upperProtein;
    
    
    const constraints = {
      minGc,
      maxGc,
      maxHomopolymer,
      forbiddenSequences,
      enforceConstraints
    };
    
    let bestResult = null;
    let bestScore = -1;
    
    // Try optimization multiple times if constraints are enabled
    const attempts = enforceConstraints ? maxRetries : 1;
    
    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        let optimizedDna = '';
        const codonUsage = {};
        const warnings = [];
        
        // Optimize each amino acid
        for (let i = 0; i < processedProtein.length; i++) {
          const aminoAcid = processedProtein[i];
          const optimalCodon = selectOptimalCodon(aminoAcid, strategy, optimizedDna, constraints);
          optimizedDna += optimalCodon;
          
          // Track codon usage statistics
          if (!codonUsage[aminoAcid]) {
            codonUsage[aminoAcid] = {};
          }
          codonUsage[aminoAcid][optimalCodon] = (codonUsage[aminoAcid][optimalCodon] || 0) + 1;
        }
        
        // Validate final sequence
        const finalGcContent = calculateGcContent(optimizedDna);
        const homopolymerViolations = findHomopolymerViolations(optimizedDna, maxHomopolymer);
        const forbiddenViolations = findForbiddenSequenceViolations(optimizedDna, forbiddenSequences);
        
        // Calculate optimization score (higher is better)
        let score = 100;
        if (finalGcContent < minGc || finalGcContent > maxGc) {
          score -= Math.abs(finalGcContent - ((minGc + maxGc) / 2)) * 2;
          warnings.push(`GC content ${finalGcContent.toFixed(1)}% outside target range ${minGc}-${maxGc}%`);
        }
        if (homopolymerViolations.length > 0) {
          score -= homopolymerViolations.length * 10;
          warnings.push(`${homopolymerViolations.length} homopolymer violations found`);
        }
        if (forbiddenViolations.length > 0) {
          score -= forbiddenViolations.length * 15; // Higher penalty for forbidden sequences
          warnings.push(`${forbiddenViolations.length} forbidden sequence violations found`);
        }
        

        // Add a stop codon
        const result =  optimizedDna + "TAA";
        
        // Keep track of best result
        if (score > bestScore) {
          bestScore = score;
          bestResult = result;
        }
        
        // If perfect score achieved, return immediately (with a stop codon)
        if (score >= 100) {
          return optimizedDna + "TAA";
        }
        
      } catch (error) {
        if (attempt === attempts - 1) {
          throw error;
        }
        // Continue to next attempt
      }
    }
    
    if (!bestResult) {
      throw new Error('Failed to optimize sequence after multiple attempts');
    }
    
    return bestResult;
  }
  
  
  // Export functions for use in React app
  export {
    optimizeForEcoli,
    translateDnaToProtein,
    calculateGcContent,
    findHomopolymerViolations,
    findForbiddenSequenceViolations,
    ECOLI_CODON_TABLE,
    GENETIC_CODE
  };
  
  // Default export
  export default optimizeForEcoli;