import type { UIMessage } from 'ai';
import { PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { Greeting } from './greeting';
import { memo } from 'react';
import type { Vote } from '@/lib/db/schema';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import cx from 'classnames';

interface MessagesProps {
  chatId: string;
  status: UseChatHelpers['status'];
  votes: Array<Vote> | undefined;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers['setMessages'];
  reload: UseChatHelpers['reload'];
  isReadonly: boolean;
  isArtifactVisible: boolean;
  selectedChatModel?: string;
  isAwaitingAssistant?: boolean;
}

function PureMessages({
  chatId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  isArtifactVisible,
  selectedChatModel,
  isAwaitingAssistant,
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      data-status={status}
      className={cx(
        'flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden gap-y-2',
      )}
    >
      {messages.length === 0 ? (
        <Greeting />
      ) : (
        <>
          {messages.map((message, idx) => {
            const isLast = idx === messages.length - 1;
            const isUser = message.role === 'user';
            const nextIsAssistant = messages[idx + 1]?.role === 'assistant';
            // Add margin above assistant message if previous is user
            const marginAbove = idx > 0 && message.role === 'assistant' && messages[idx - 1].role === 'user' ? 'mt-4' : '';
            // Add extra margin below the last message
            const marginBelow = isLast ? 'mb-8' : '';
            return (
              <div key={message.id + '-' + idx} className={`w-full ${marginAbove} ${marginBelow}`}>
                <PreviewMessage
                  chatId={chatId}
                  message={message}
                  vote={votes?.find((vote) => vote.messageId === message.id)}
                  isLoading={false}
                  setMessages={setMessages}
                  reload={reload}
                  isReadonly={isReadonly}
                />
                {/* Show ThinkingMessage after each user message that does not have a following assistant message */}
                {isUser && (!nextIsAssistant && (isLast || status === 'streaming')) && (
                  <div className="w-full">
                    <ThinkingMessage modelId={selectedChatModel} />
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export const Messages = memo(
  PureMessages,
  (prevProps, nextProps) => {
    if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;

    if (prevProps.status !== nextProps.status) return false;
    if (prevProps.status && nextProps.status) return false;
    if (prevProps.messages.length !== nextProps.messages.length) return false;
    if (!equal(prevProps.messages, nextProps.messages)) return false;
    if (!equal(prevProps.votes, nextProps.votes)) return false;

    return true;
  },
);
