export interface Attachment {
  file: File;
  previewUrl: string;
  base64: string;
  type: 'image' | 'video' | 'document';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
  attachments?: Attachment[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export enum ModelType {
  GEMINI_V3_PRO = 'gemini-3-pro-preview', // Model paling cerdas (Reasoning)
  GEMINI_V3 = 'gemini-3-flash-preview',   // Model seimbang
  GEMINI_V2 = 'gemini-flash-latest',      // Model tercepat
}

export interface SendMessageParams {
  history: Message[];
  message: string;
  attachments?: Attachment[];
}

export type Language = 'en' | 'id';

export interface AppSettings {
  language: Language;
  model: ModelType;
}