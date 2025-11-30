export enum Difficulty {
  BEGINNER = '初級',
  INTERMEDIATE = '中級',
  ADVANCED = '進階',
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  difficulty: Difficulty;
  category: string;
  duration: string; // e.g., "10:05"
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}