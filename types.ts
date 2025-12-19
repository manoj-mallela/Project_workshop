
export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL'
}

export interface AnalysisResult {
  sentiment: Sentiment;
  score: number; // -1 to 1
  tokens: string[];
  importantFeatures: {word: string, weight: number}[];
  explanation: string;
}

export interface ComparisonData {
  lexicon: AnalysisResult;
  ml: AnalysisResult;
  rawText: string;
}

export interface SampleReview {
  id: string;
  source: 'Amazon' | 'IMDb';
  text: string;
  groundTruth: Sentiment;
}
