import Anthropic from '@anthropic-ai/sdk';
import { API_CONFIG } from '../config/api.config';
import { pdfjs } from "react-pdf";
import mammoth from 'mammoth';

const configurePdfWorker = () => {
  try {
    // Try to load from CDN first
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  } catch (error) {
    console.error('Failed to load PDF worker from CDN:', error);
    // Fallback to local worker if CDN fails
    import('pdfjs-dist/build/pdf.worker.entry').then(worker => {
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    });
  }
};

configurePdfWorker();

const splitTextIntoChunks = (text, chunkSize) => {
  const chunks = [];
  
  // Using regex to split by sentences while preserving sentence endings
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  let currentChunk = '';
  let currentLength = 0;
  
  for (let sentence of sentences) {
    sentence = sentence.trim();
    
    // Skipping empty sentences
    if (!sentence) continue;
    
    // If adding this sentence would exceed chunk size, save current chunk
    if (currentLength + sentence.length > chunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
      currentLength = 0;
    }
    
    // Adding sentence to current chunk
    currentChunk += (currentChunk ? ' ' : '') + sentence;
    currentLength += sentence.length;
  }
  
  // Adding the last chunk if there is one
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  // Handle case where no valid chunks were created
  if (chunks.length === 0 && text.trim()) {
    // If text is longer than chunk size, force split it
    const forcedChunks = [];
    let remaining = text;
    while (remaining) {
      forcedChunks.push(remaining.slice(0, chunkSize));
      remaining = remaining.slice(chunkSize);
    }
    return forcedChunks;
  }
  
  return chunks;
};


export const extractPDFText = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ 
      data: arrayBuffer,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
    }).promise;
    
    let fullText = '';
    const totalPages = pdf.numPages;
    
    for (let i = 1; i <= totalPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ');
      fullText += pageText + '\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Please make sure the file is not corrupted or password protected.');
  }
};

// Helper function to extract text from DOCX
const extractDOCXText = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    throw new Error('Failed to extract text from DOCX file.');
  }
};

// Enhanced file content reader with multiple format support
export const readFileContent = async (file) => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 10MB

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 2 MB limit.');
  }

  try {
    switch (file.type) {
      case 'application/pdf':
        return await extractPDFText(file);
        
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        return await extractDOCXText(file);
        
      case 'text/plain':
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => reject(new Error('Failed to read text file.'));
          reader.readAsText(file);
        });
        
      default:
        throw new Error(`Unsupported file type: ${file.type}`);
    }
  } catch (error) {
    console.error('File reading error:', error);
    throw new Error(`Failed to read file: ${error.message}`);
  }
};

const anthropic = new Anthropic({
  apiKey: API_CONFIG.CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

// Improved plagiarism analysis function with better prompting and response handling
export const analyzePlagiarism = async (file) => {
  try {
    const fileContent = await readFileContent(file);
    
    // Split large documents into chunks to handle API limits
    const CHUNK_SIZE = 3500;
    const chunks = splitTextIntoChunks(fileContent, CHUNK_SIZE);
    
    let overallResults = {
      percentage: 0,
      matches: [],
      analysis: ''
    };

    // Analyze each chunk
    for (let i = 0; i < chunks.length; i++) {
      const message = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: `Analyze this text section (${i + 1}/${chunks.length}) for potential plagiarism. 
          
          Please provide your response in the following format:

          PLAGIARISM_PERCENTAGE: [number between 0-100]
          
          MATCHED_CONTENT:
          1. "[exact matched text]" - Source: [probable source]
          2. "[exact matched text]" - Source: [probable source]
          ...
          
          ANALYSIS:
          [Your detailed analysis of writing style, originality, and potential plagiarism]

          Here's the text to analyze:

          ${chunks[i]}`
        }]
      });

      const responseText = message.content[0].text;
      
      // Parse response with improved extraction
      const chunkResults = {
        percentage: extractPercentageImproved(responseText),
        matches: extractMatchesImproved(responseText),
        analysis: extractAnalysisImproved(responseText)
      };

      // Weight the results based on chunk size
      const chunkWeight = chunks[i].length / fileContent.length;
      overallResults = mergeResultsWeighted(overallResults, chunkResults, chunkWeight);
    }
    
    // Round the final percentage to one decimal place
    overallResults.percentage = Math.round(overallResults.percentage * 10) / 10;
    
    // Remove duplicate matches
    overallResults.matches = removeDuplicateMatches(overallResults.matches);
    
    return overallResults;
  } catch (error) {
    console.error('Plagiarism analysis failed:', error);
    if (error.response?.status === 413) {
      throw new Error('File is too large. Please upload a file smaller than 10MB.');
    }
    if (error instanceof Anthropic.APIError) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw error;
  }
};

// Improved percentage extraction
const extractPercentageImproved = (text) => {
  // Look for the percentage in the structured format first
  const structuredMatch = text.match(/PLAGIARISM_PERCENTAGE:\s*(\d+(\.\d+)?)/i);
  if (structuredMatch) {
    return parseFloat(structuredMatch[1]);
  }

  // Fallback to looking for percentage mentions in the text
  const percentageMatches = text.match(/(\d+(\.\d+)?)\s*%\s*(?:similarity|plagiarism|matched|identical)/gi);
  if (percentageMatches) {
    // Take the highest percentage found
    const percentages = percentageMatches.map(match => {
      const num = parseFloat(match);
      return !isNaN(num) ? num : 0;
    });
    return Math.max(...percentages);
  }

  return 0;
};

// Improved matches extraction
const extractMatchesImproved = (text) => {
  const matches = [];
  
  // Look for matches in the structured format
  const matchedSection = text.match(/MATCHED_CONTENT:(.+?)(?=ANALYSIS:|$)/s);
  if (matchedSection) {
    const matchLines = matchedSection[1].split('\n').filter(line => line.trim());
    matchLines.forEach(line => {
      const match = line.match(/"([^"]+)"\s*-\s*Source:\s*([^"\n]+)/);
      if (match) {
        matches.push({
          text: match[1].trim(),
          source: match[2].trim()
        });
      }
    });
  }

  // Fallback to looking for quoted text with sources
  if (matches.length === 0) {
    const regex = /"([^"]+)"\s*(?:-|:|from|source|matches)\s*([^"\n]+)/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        text: match[1].trim(),
        source: match[2].trim()
      });
    }
  }

  return matches;
};

// Improved analysis extraction
const extractAnalysisImproved = (text) => {
  // Look for analysis in the structured format
  const analysisMatch = text.match(/ANALYSIS:(.+?)(?=\n\n|$)/s);
  if (analysisMatch) {
    return analysisMatch[1].trim();
  }

  // Fallback to original analysis markers
  const analysisMarkers = [
    'Analysis:',
    'Writing style analysis:',
    'Style analysis:',
    'Overall analysis:'
  ];
  
  for (const marker of analysisMarkers) {
    const parts = text.split(marker);
    if (parts.length > 1) {
      const analysis = parts[1].split(/\n\n|\r\n\r\n/)[0].trim();
      if (analysis) return analysis;
    }
  }
  
  return '';
};

// Improved results merging with weighting
const mergeResultsWeighted = (overall, chunk, weight) => {
  return {
    percentage: overall.percentage + (chunk.percentage * weight),
    matches: [...overall.matches, ...chunk.matches],
    analysis: overall.analysis + (overall.analysis ? '\n\n' : '') + chunk.analysis
  };
};

// Remove duplicate matches based on text similarity
const removeDuplicateMatches = (matches) => {
  const seen = new Set();
  return matches.filter(match => {
    const key = match.text.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};