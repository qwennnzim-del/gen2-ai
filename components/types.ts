export interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export enum ModelType {
  GEMINI_2_5_FLASH = 'gemini-3-flash-preview',
}

export interface SendMessageParams {
  history: Message[];
  message: string;
}

export type Language = 'en' | 'id';

export interface AppSettings {
  language: Language;
}