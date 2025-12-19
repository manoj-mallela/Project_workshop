
import { SampleReview } from './types';

export const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: '1',
    source: 'Amazon',
    text: "This product changed my life. The packaging was eco-friendly and the build quality is superb. Highly recommended for anyone looking for reliability.",
    groundTruth: 'POSITIVE' as any
  },
  {
    id: '2',
    source: 'IMDb',
    text: "The pacing was sluggish and the plot holes were big enough to drive a truck through. I expected more from this director. A total waste of time.",
    groundTruth: 'NEGATIVE' as any
  },
  {
    id: '3',
    source: 'Amazon',
    text: "It arrived broken. The customer service was unresponsive for weeks. Avoid this seller at all costs!",
    groundTruth: 'NEGATIVE' as any
  },
  {
    id: '4',
    source: 'IMDb',
    text: "An absolute masterpiece. The cinematography was breathtaking and the lead actor deserves an Oscar for this performance.",
    groundTruth: 'POSITIVE' as any
  }
];

// Simplified AFINN-165 style lexicon for client-side sentiment
export const LEXICON: Record<string, number> = {
  "amazing": 4, "awesome": 4, "excellent": 3, "good": 2, "great": 3, "love": 3, "best": 3,
  "superb": 4, "wonderful": 4, "fantastic": 4, "masterpiece": 5, "recommended": 2,
  "reliable": 2, "positive": 2, "nice": 2, "happy": 3, "brilliant": 4, "quality": 1,
  "bad": -3, "terrible": -4, "awful": -4, "worst": -5, "horrible": -4, "hate": -3,
  "waste": -3, "broken": -3, "poor": -2, "disappointing": -2, "avoid": -3,
  "useless": -3, "boring": -2, "slow": -1, "slug": -1, "hole": -1, "failure": -3,
  "brokenly": -4, "unresponsive": -2, "expensive": -1, "cheap": -1, "flaw": -2
};

export const STOP_WORDS = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
  "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", 
  "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", 
  "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", 
  "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", 
  "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", 
  "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", 
  "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", 
  "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", 
  "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", 
  "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", 
  "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"
]);
