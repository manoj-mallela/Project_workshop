
import { LEXICON, STOP_WORDS } from '../constants';
import { AnalysisResult, Sentiment } from '../types';

export const analyzeWithLexicon = (text: string): AnalysisResult => {
  const cleanText = text.toLowerCase().replace(/[^\w\s]/gi, '');
  const tokens = cleanText.split(/\s+/).filter(t => t.length > 0);
  
  const filteredTokens = tokens.filter(t => !STOP_WORDS.has(t));
  
  let score = 0;
  const importantFeatures: {word: string, weight: number}[] = [];
  
  tokens.forEach(token => {
    if (LEXICON[token]) {
      const weight = LEXICON[token];
      score += weight;
      importantFeatures.push({ word: token, weight });
    }
  });

  // Normalize score to -1 to 1 range (clamped)
  const normalizedScore = Math.max(-1, Math.min(1, score / 10));
  
  let sentiment = Sentiment.NEUTRAL;
  if (normalizedScore > 0.1) sentiment = Sentiment.POSITIVE;
  if (normalizedScore < -0.1) sentiment = Sentiment.NEGATIVE;

  return {
    sentiment,
    score: normalizedScore,
    tokens: filteredTokens,
    importantFeatures: importantFeatures.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight)),
    explanation: `Lexicon analysis identified ${importantFeatures.length} emotive keywords. Total sentiment sum: ${score}. This approach relies purely on a pre-defined dictionary and doesn't understand context or word order.`
  };
};
