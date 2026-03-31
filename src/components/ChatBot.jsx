import React, { useEffect, useRef, useState } from 'react';
import aiService from '../appwrite/openai';

export default function ChatBot() {
  const initialMessages = [
    {
      id: 1,
      text: "Hi! I'm your WriteNest Assistant. I can help with blog writing guidance, publishing workflow questions, and account help. What would you like to work on today?",
      sender: 'bot',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const formatAssistantError = (error) => {
    if (error?.userMessage) {
      return error.userMessage;
    }

    if (error?.message === 'Appwrite assistant function ID not configured') {
      return 'The WriteNest Assistant is not configured yet. Add the Appwrite assistant function ID to enable chat.';
    }

    return 'The WriteNest Assistant is unavailable right now. Please try again in a moment.';
  };

  const systemPrompt = `You are a helpful AI assistant for WriteNest, a modern blogging platform. You help users with:
  1. Site navigation and features (Home, Login, Signup, All Posts, Add Post, Edit Post, Post Detail)
  2. Blog writing tips and best practices
  3. Account management and authentication questions

  The actual visible navigation in this app is:
  - Home is always available.
  - Login and Signup are shown when logged out.
  - All Posts and Add Post are shown when logged in.
  - Editing happens from an existing post's Edit button, not from a separate menu item.
  - There is no sidebar, template picker, dark mode toggle, category filter, or settings panel in the current UI.

  Be friendly, practical, and easy to follow.
  Use plain text only. Do not use markdown symbols like **, _, #, or bullet syntax that depends on markdown rendering.
  If you need a list, write short numbered lines with natural sentences.
  For blog writing questions, give structured answers with brief explanations and actionable examples when helpful.
  Prefer 120 to 220 words for writing advice unless the user asks for a shorter answer.
  For navigation or account questions, stay concise and give step-by-step guidance when useful.
  If a question is outside your scope, politely redirect the user.`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.sender === 'bot' ? 'assistant' : 'user',
          content: msg.text,
        })),
        { role: 'user', content: inputValue },
      ];

      const botResponse = await aiService.chat(chatMessages);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        id: messages.length + 2,
        text: formatAssistantError(error),
        sender: 'bot',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    setInputValue('');
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
        title="WriteNest Assistant"
      >
        {isOpen ? 'X' : 'AI'}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 left-0 right-0 flex max-h-[min(70vh,32rem)] flex-col overflow-hidden rounded-3xl border border-orange-500/20 bg-gray-900 shadow-2xl sm:left-auto sm:w-[24rem] md:max-h-[500px] md:w-[26rem]">
          <div className="rounded-t-lg bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-bold">WriteNest Assistant</h3>
                <p className="text-sm text-orange-100">AI-powered support</p>
              </div>
              <button
                type="button"
                onClick={handleClearChat}
                className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/10"
              >
                Clear chat
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 sm:max-w-xs ${
                    msg.sender === 'user'
                      ? 'rounded-br-none bg-orange-500 text-white'
                      : 'rounded-bl-none border border-orange-500/30 bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-6">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-orange-500/30 bg-gray-800 px-4 py-2 text-gray-100">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500 delay-100"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500 delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-orange-500/20 p-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-orange-500/30 bg-gray-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
