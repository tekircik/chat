'use client';

import type { Attachment, UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher, generateUUID } from '@/lib/utils';
import { Artifact } from './artifact';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import type { VisibilityType } from './visibility-selector';
import { useArtifactSelector } from '@/hooks/use-artifact';
import { toast } from 'sonner';
import { unstable_serialize } from 'swr/infinite';
import { getChatHistoryPaginationKey } from './sidebar-history';
import { SparklesIcon } from './icons';
import { useChatCache } from '@/hooks/use-chat-cache';

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<UIMessage>;
  selectedChatModel: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();
  const { chatData, setChatCache } = useChatCache(id);
  
  // If we have cached data, use it as initial messages instead of server data
  const startingMessages = chatData?.messages?.length ? chatData.messages : initialMessages;

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, selectedChatModel: selectedChatModel },
    initialMessages: startingMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate(unstable_serialize(getChatHistoryPaginationKey));
    },
    onError: () => {
      toast.error('An error occurred, please try again!');
    },
  });

  // Get votes, preferring cached votes if available
  const { data: freshVotes } = useSWR<Array<Vote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );
  
  const votes = chatData?.votes || freshVotes;

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);
  // Reasoning toggle state
  const [isReasoning, setIsReasoning] = useState(false);
  // Always use text-model unless reasoning is toggled
  const currentModel = isReasoning ? 'chat-model-reasoning' : 'text-model';

  const [isAwaitingAssistant, setIsAwaitingAssistant] = useState(false);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    // If a new user message is sent, set isAwaitingAssistant to true
    if (messages.length > prevMessagesLength.current && messages[messages.length - 1]?.role === 'user') {
      setIsAwaitingAssistant(true);
    }
    // If an assistant message is present or streaming started, set to false
    if (status === 'streaming' || messages.some(m => m.role === 'assistant')) {
      setIsAwaitingAssistant(false);
    }
    prevMessagesLength.current = messages.length;
  }, [messages, status]);

  // Update the cache when messages or votes change
  useEffect(() => {
    if (messages.length > 0) {
      setChatCache({ 
        messages,
        votes: freshVotes || chatData?.votes
      });
    }
  }, [messages, freshVotes, setChatCache, chatData?.votes]);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background overflow-x-hidden">
        <ChatHeader
          chatId={id}
          selectedModelId={currentModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          status={status}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          isArtifactVisible={isArtifactVisible}
          selectedChatModel={currentModel}
          isAwaitingAssistant={isAwaitingAssistant}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              status={status}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
              isReasoning={isReasoning}
              setIsReasoning={setIsReasoning}
            />
          )}
        </form>
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
