export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'ChatGPT 4.1',
    description: 'Primary model for all-purpose chats',
  },
  {
    id: 'chat-model-reasoning',
    name: 'ChatGPT o3-mini',
    description: 'Optimized for reasoning tasks',
  },
];
