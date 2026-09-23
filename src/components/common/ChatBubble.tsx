'use client';

import ChatBubbleIcon from '@/components/svgs/ChatBubbleIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/expandable-chat';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSuggestions } from '@/config/ChatPrompt';
import { heroConfig } from '@/config/Hero';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { cn } from '@/lib/utils';
import { Maximize2, Minimize2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import SendIcon from '../svgs/SendIcon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isStreaming?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm Nguyen Huy's Portfolio Assistant. How can I help you?",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
];

const ChatBubble: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic, isMobile } = useHapticFeedback();

  // Auto-resize if any bot message is long, contains email, lists, or code
  const hasLongMessage = messages.some(
    (m) =>
      m.sender === 'bot' &&
      (m.text.length > 180 ||
        m.text.includes('@') ||
        m.text.includes('\n- ') ||
        m.text.includes('```')),
  );

  const chatWindowClassName = cn(
    'transition-all duration-300 ease-in-out',
    isMaximized
      ? 'sm:w-[720px] sm:max-w-[94vw] sm:h-[85vh] sm:max-h-[850px]'
      : hasLongMessage
        ? 'sm:w-[560px] sm:max-w-[90vw] sm:h-[700px] sm:max-h-[85vh]'
        : 'sm:w-[460px] sm:max-w-[90vw] sm:h-[620px] sm:max-h-[80vh]',
  );

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    // Trigger haptic feedback on mobile devices
    if (isMobile()) {
      triggerHaptic('light');
    }

    const messageText = newMessage.trim();
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Create a temporary bot message for streaming
    const botMessageId = Date.now() + 1;
    const botMessage: Message = {
      id: botMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);

    // Send the message using the refactored function
    await sendMessage(messageText, botMessageId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Trigger haptic feedback on mobile devices
    if (isMobile()) {
      triggerHaptic('selection');
    }

    setNewMessage(suggestion);
    // Auto-send the suggestion
    const userMessage: Message = {
      id: Date.now(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create a temporary bot message for streaming
    const botMessageId = Date.now() + 1;
    const botMessage: Message = {
      id: botMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);

    // Send the message (reuse the same logic as handleSendMessage)
    sendMessage(suggestion, botMessageId);
  };

  const sendMessage = async (messageText: string, botMessageId: number) => {
    try {
      // Prepare conversation history in the format the /api/chat route expects
      const history = messages.slice(-10).map((msg) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: msg.text }],
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          history,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error ?? `HTTP error! status: ${response.status}`,
        );
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.text) {
                accumulatedText += data.text;

                // Update the streaming message in real-time
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: true }
                      : msg,
                  ),
                );
              }

              if (data.done) {
                // Finalize the message
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: false }
                      : msg,
                  ),
                );
                break;
              }
            } catch {
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text:
                  error instanceof Error &&
                  error.message &&
                  !error.message.startsWith('HTTP error')
                    ? error.message
                    : "I'm sorry, I'm having trouble responding right now. Please try again later.",
                isStreaming: false,
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
      setNewMessage('');
    }
  };

  return (
    <ExpandableChat
      className="mt-4 ml-4"
      chatWindowClassName={chatWindowClassName}
      position="bottom-right"
      size="xl"
      icon={<ChatBubbleIcon className="h-6 w-6" />}
    >
      <ExpandableChatHeader>
        <div className="flex items-center space-x-3">
          <Avatar className="border-primary h-8 w-8 border-2 bg-blue-300 dark:bg-yellow-300">
            <AvatarImage src="/assets/logo.png" alt="Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold">
              {heroConfig.name}&apos;s Portfolio Assistant
            </h3>
            <div className="text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                Online
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hidden h-8 w-8 sm:flex"
            onClick={() => setIsMaximized((prev) => !prev)}
            title={isMaximized ? 'Thu nhỏ cửa sổ' : 'Phóng to cửa sổ'}
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex w-fit max-w-[92%] flex-col gap-1.5 rounded-2xl px-3.5 py-2.5 text-sm transition-all duration-200 sm:max-w-[88%]',
                  message.sender === 'user'
                    ? 'ml-auto rounded-tr-xs border border-neutral-800 bg-neutral-900 text-neutral-50 shadow-xs dark:border-zinc-700/80 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'bg-muted/80 text-foreground border-border/50 rounded-tl-xs border shadow-xs',
                )}
              >
                <div className="flex w-full min-w-0 items-start gap-2.5">
                  {message.sender === 'bot' && (
                    <Avatar className="border-primary mt-0.5 h-6 w-6 shrink-0 border-2 bg-blue-300 dark:bg-yellow-300">
                      <AvatarImage src="/assets/logo.png" alt="Assistant" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="min-w-0 flex-1 overflow-hidden">
                    {message.sender === 'user' ? (
                      <p className="m-0 text-sm leading-relaxed font-normal [overflow-wrap:anywhere] break-words text-neutral-50 dark:text-zinc-100">
                        {message.text}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="prose prose-sm dark:prose-invert max-w-none flex-1 [overflow-wrap:anywhere] break-words">
                          {message.text ? (
                            <ReactMarkdown
                              components={{
                                // Custom link component
                                a: (props) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary font-medium break-all underline hover:opacity-80"
                                  />
                                ),
                                // Custom paragraph component to remove default margins
                                p: (props) => (
                                  <p
                                    {...props}
                                    className="m-0 leading-relaxed [overflow-wrap:anywhere] break-words"
                                  />
                                ),
                                // Custom inline code component
                                code: ({
                                  children,
                                  className,
                                  ...props
                                }: React.HTMLAttributes<HTMLElement>) => (
                                  <code
                                    className={cn(
                                      'rounded bg-black/10 px-1 py-0.5 font-mono text-xs break-all dark:bg-white/10',
                                      className,
                                    )}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                ),
                                // Custom pre/code-block component
                                pre: (
                                  props: React.HTMLAttributes<HTMLPreElement>,
                                ) => (
                                  <pre
                                    className="my-2 max-w-full overflow-x-auto rounded-lg bg-black/10 p-2.5 font-mono text-xs dark:bg-white/10"
                                    {...props}
                                  />
                                ),
                                // Custom list components
                                ul: (props) => (
                                  <ul
                                    {...props}
                                    className="m-0 space-y-1 pl-4"
                                  />
                                ),
                                ol: (props) => (
                                  <ol
                                    {...props}
                                    className="m-0 space-y-1 pl-4"
                                  />
                                ),
                                li: (props) => (
                                  <li
                                    {...props}
                                    className="m-0 [overflow-wrap:anywhere] break-words"
                                  />
                                ),
                                // Custom strong/bold component
                                strong: (props) => (
                                  <strong
                                    {...props}
                                    className="text-foreground font-semibold"
                                  />
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          ) : (
                            message.isStreaming && (
                              <span className="text-muted-foreground flex items-center gap-1.5">
                                <span className="bg-primary size-1.5 animate-ping rounded-full" />
                                Thinking...
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    <p
                      className={cn(
                        'mt-1.5 text-[10px]',
                        message.sender === 'user'
                          ? 'text-right text-neutral-400 dark:text-zinc-400'
                          : 'text-muted-foreground',
                      )}
                      suppressHydrationWarning
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Show suggestions only when conversation just started */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2">
                <p className="text-muted-foreground px-3 text-xs">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2 px-3">
                  {chatSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-background hover:bg-muted border-muted-foreground/20 h-8 px-3 text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me about my work and experience..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default ChatBubble;
