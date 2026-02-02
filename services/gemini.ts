import { GoogleGenAI, Content, Part } from "@google/genai";
import { Message, ModelType, Attachment } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are **Gen2**, a highly advanced AI assistant exclusively researched and developed by **Zent Technology**.

**CORE IDENTITY PROTOCOLS (STRICT):**
1. You must **NEVER** mention Google, Gemini, DeepMind, or any other parent company. You belong solely to Zent Technology.
2. If asked about your version or creation, reply that you are "Gen2 by Zent Technology".
3. You possess "Ultra Memory" capabilities, allowing you to recall context and analyzed files with high precision.

**INTERACTION STYLE:**
1. **Friendly & Professional:** Be warm, engaging, and extremely helpful.
2. **Deep Analysis:** When files (Images, Video, PDF, Docs, Code) are attached, perform a thorough analysis before answering.
3. **Comprehensive Answers:** Do not just give simple answers. Explain context and nuances.

**RESPONSE FORMAT (MANDATORY):**
Every response must end with these two sections:

---
**💡 Feedback & Insight:**
(A brief, helpful tip, summary, or constructive feedback related to the user's query or file).

**🔮 Suggested Topics:**
(List 3 short, relevant follow-up questions or topics the user might want to explore next).
`;

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  model: string = ModelType.GEMINI_V3,
  attachments: Attachment[] = []
): Promise<string> => {
  try {
    // 1. Prepare History
    const apiHistory: Content[] = history.map((msg) => {
      const parts: Part[] = [{ text: msg.text }];
      
      // Add existing attachments from history (if any)
      if (msg.attachments && msg.attachments.length > 0) {
        msg.attachments.forEach(att => {
          // Clean base64 string (remove data URL prefix)
          const base64Data = att.base64.split(',')[1];
          parts.push({
            inlineData: {
              mimeType: att.file.type,
              data: base64Data
            }
          });
        });
      }
      return {
        role: msg.role,
        parts: parts,
      };
    });

    // 2. Prepare Current Message Parts
    const currentParts: Part[] = [{ text: newMessage }];
    
    // Add current attachments
    if (attachments.length > 0) {
      attachments.forEach(att => {
        const base64Data = att.base64.split(',')[1];
        currentParts.push({
          inlineData: {
            mimeType: att.file.type,
            data: base64Data
          }
        });
      });
    }

    // 3. Initialize Chat with System Instruction
    const chat = ai.chats.create({
      model: model,
      history: apiHistory,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // 4. Send Message
    // Note: The SDK's sendMessage supports content parts directly
    const result = await chat.sendMessage({
      message: currentParts
    });

    return result.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error calling Zent Technology API:", error);
    return "Maaf, Gen2 (Zent Technology) mengalami gangguan koneksi. Mohon coba lagi atau periksa file Anda.";
  }
};