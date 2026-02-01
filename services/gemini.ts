import { GoogleGenAI, Content } from "@google/genai";
import { Message, ModelType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  try {
    // Convert internal message format to API format
    // We only take the last few turns to keep context but avoid token limits if necessary,
    // though Flash has a large context window.
    const apiHistory: Content[] = history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: ModelType.GEMINI_2_5_FLASH,
      history: apiHistory,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    const result = await chat.sendMessage({
      message: newMessage,
    });

    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, something went wrong. Please check your connection or API key.";
  }
};