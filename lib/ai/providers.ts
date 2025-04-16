import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const openRouterBaseURL = 'https://openrouter.ai/api/v1';
const openRouterApiKey = process.env.OPENROUTER_API_KEY!;

const openRouterProvider = createOpenAICompatible({
  baseURL: openRouterBaseURL,
  name: 'openrouter',
  apiKey: openRouterApiKey,
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openRouterProvider.languageModel('openai/gpt-4.1-mini'),
        'chat-model-reasoning': wrapLanguageModel({
          model: openRouterProvider.languageModel('openai/o3-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openRouterProvider.languageModel('openai/gpt-4.1-nano'),
        'artifact-model': openRouterProvider.languageModel('openrouter/auto'),
      },
    });
