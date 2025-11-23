import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GEMINI_CHAT_MODEL, GEMINI_PRO_ANALYSIS_MODEL } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const createChatSession = (systemInstruction: string, useSearchTool: boolean = false): Chat => {
  const ai = getClient();
  
  const tools = useSearchTool ? [{ googleSearch: {} }] : undefined;

  return ai.chats.create({
    model: GEMINI_CHAT_MODEL,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
      maxOutputTokens: 2000,
      tools: tools,
    },
  });
};

export const analyzeDocument = async (text: string, prompt: string): Promise<string> => {
  const ai = getClient();
  
  // Using the Pro model for deep analysis/reasoning
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: GEMINI_PRO_ANALYSIS_MODEL,
    contents: `
      Analyze the following legal text based on this request: "${prompt}".
      
      LEGAL TEXT TO ANALYZE:
      ---
      ${text}
      ---
      
      Format the output in clear Markdown with headings and bullet points.
      Highlight risks, obligations, and missing terms if relevant.
      If the text contains complex legal jargon, offer a brief simplification.
    `,
    config: {
      temperature: 0.3, // Lower temperature for more factual/analytical output
      thinkingConfig: { thinkingBudget: 1024 } // Use thinking tokens for complex analysis
    }
  });

  return response.text || "Unable to generate analysis.";
};