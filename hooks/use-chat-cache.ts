'use client';

import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import type { UIMessage } from 'ai';
import type { Vote } from '@/lib/db/schema';
import { fetcher } from '@/lib/utils';

type ChatData = {
  messages: Array<UIMessage>;
  votes?: Array<Vote>;
};

// Cache key prefix
const CHAT_CACHE_KEY_PREFIX = 'chat-data';

export function useChatCache(chatId: string | null) {
  const { cache, mutate } = useSWRConfig();
  const cacheKey = chatId ? `${CHAT_CACHE_KEY_PREFIX}-${chatId}` : null;
  
  // Fetch messages for this chat - will be cached by SWR
  const { data, isLoading } = useSWR<ChatData>(
    chatId ? `/api/chat/${chatId}/data` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Don't revalidate when tab gains focus
      revalidateIfStale: false, // Don't revalidate if data is stale
      dedupingInterval: 60000, // Dedupe requests within this interval (ms)
    }
  );

  // Store chat data in cache
  const setChatCache = useCallback((chatData: ChatData) => {
    if (cacheKey) {
      mutate(cacheKey, chatData, false); // Update cache without revalidation
    }
  }, [cacheKey, mutate]);

  // Clear cache for a specific chat
  const clearChatCache = useCallback(() => {
    if (cacheKey && cache.get(cacheKey)) {
      cache.delete(cacheKey);
    }
  }, [cache, cacheKey]);

  // Clear all chat caches
  const clearAllChatCaches = useCallback(() => {
    if (cache) {
      Array.from(cache.keys())
        .filter(key => typeof key === 'string' && key.startsWith(CHAT_CACHE_KEY_PREFIX))
        .forEach(key => cache.delete(key));
    }
  }, [cache]);

  return {
    chatData: data,
    isLoading,
    setChatCache,
    clearChatCache,
    clearAllChatCaches
  };
}