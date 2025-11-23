export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Persona {
  id: string;
  name: string;
  roleDescription: string;
  systemInstruction: string;
  icon: string;
  color: string;
}

export enum AppMode {
  CHAT = 'CHAT',
  DOCUMENT_ANALYSIS = 'DOCUMENT_ANALYSIS'
}
