
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Sentiment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeWithML = async (text: string): Promise<AnalysisResult> => {
  const prompt = `Analyze the sentiment of the following review as if you were a Machine Learning model (specifically Logistic Regression with TF-IDF vectorization) trained on millions of IMDb and Amazon reviews.
  
  Review Text: "${text}"

  Rules:
  1. Identify the most important "features" (words/tokens) that influenced the classification, providing a "weight" for each (positive for positive influence, negative for negative).
  2. Determine a final sentiment (POSITIVE or NEGATIVE).
  3. Provide a score between -1.0 and 1.0.
  4. Explain how a machine learning model would approach this differently than a simple dictionary-based lookup (mentioning context, word combinations, or specific weights).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"] },
            score: { type: Type.NUMBER },
            importantFeatures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  weight: { type: Type.NUMBER }
                },
                required: ["word", "weight"]
              }
            },
            explanation: { type: Type.STRING }
          },
          required: ["sentiment", "score", "importantFeatures", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      tokens: text.toLowerCase().split(/\s+/).slice(0, 15) // Simplified for UI
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw error;
  }
};
