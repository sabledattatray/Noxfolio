'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Send,
  Sparkles,
  Search,
  BarChart3,
  Mail,
  Plus,
  Calendar,
  Bot,
  User,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  { label: 'Find', icon: Search, color: 'text-blue-600 dark:text-blue-400' },
  {
    label: 'Analyze',
    icon: BarChart3,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Email',
    icon: Mail,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Create',
    icon: Plus,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Schedule',
    icon: Calendar,
    color: 'text-rose-600 dark:text-rose-400',
  },
];

export function AIChat({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const text = customText || input;
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate Dynamic AI response
    setTimeout(() => {
      let response = `I'm analyzing your request to "${userMessage}". As your Noxfolio assistant, I can help you find records, generate reports, or schedule tasks. What would you like to do next?`;

      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes('find')) {
        response = `I've scanned your Noxfolio database. I found 12 recent contacts and 3 pending deals that match your query. Would you like me to list them for you?`;
      } else if (lowerMsg.includes('analyze')) {
        response = `Analyzing your revenue data... Your month-over-month growth is up by 14%, primarily driven by the 'Enterprise' segment. I've generated a detailed breakdown in your Analytics tab.`;
      } else if (lowerMsg.includes('email')) {
        response = `I've drafted a follow-up email for your pending deals. It uses your 'Professional' template and is ready for review in the 'Outbox'. Should I send it?`;
      } else if (lowerMsg.includes('schedule') || lowerMsg.includes('create')) {
        response = `Understood. I've added a new follow-up task to your calendar for tomorrow at 10:00 AM. I'll also notify the team on Slack. Anything else?`;
      } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
        response = `Hello! I'm Noxify, your Noxfolio AI assistant. I'm ready to help you manage your CRM, analyze data, or automate your daily tasks. What are we working on today?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response,
        },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  if (!isOpen || !mounted) return null;

  const chatContent = (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 fixed right-6 bottom-6 z-[99999] flex h-[650px] w-[420px] flex-col overflow-hidden rounded-none border border-zinc-200 shadow-none duration-500 dark:border-zinc-800 dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
      style={{
        backgroundColor: '#ffffff',
        isolation: 'isolate',
      }}
    >
      {/* SOLID HEADER */}
      <div
        className="flex shrink-0 items-center justify-between border-b border-white/10 p-5"
        style={{ backgroundColor: '#4f46e5' }} // Brand Indigo
      >
        <div className="flex items-center gap-3 text-white">
          <div className="rounded-none bg-white/20 p-2 backdrop-blur-md">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg leading-none font-black tracking-tighter uppercase">
              Noxfolio
            </h3>
            <p className="mt-1 text-[10px] font-black tracking-widest text-white/70 uppercase">
              AI Assistant
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10 rounded-none text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content Area */}
      <div
        ref={scrollRef}
        className="relative flex-1 overflow-y-auto bg-white dark:bg-[#09090b]"
      >
        <div className="min-h-full">
          {messages.length === 0 ? (
            /* Default Welcome View */
            <div className="flex min-h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 rounded-none border border-indigo-600/10 bg-indigo-600/5 p-6">
                <Sparkles className="h-10 w-10 text-indigo-600" />
              </div>
              <h2 className="mb-2 text-2xl font-black text-zinc-900 dark:text-white">
                How can I help you today?
              </h2>
              <p className="mb-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Choose a category to start or type your request below.
              </p>

              <div className="grid w-full grid-cols-1 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() =>
                      handleSend(`Help me ${s.label.toLowerCase()}`)
                    }
                    className="group flex items-center justify-between rounded-none border border-zinc-200 bg-zinc-50 p-4 transition-all hover:border-indigo-600 hover:bg-indigo-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-indigo-600"
                  >
                    <div className="flex items-center gap-3">
                      <s.icon
                        className={cn(
                          'h-4 w-4 transition-colors group-hover:text-white',
                          s.color,
                        )}
                      />
                      <span className="text-sm font-bold text-zinc-700 transition-colors group-hover:text-white dark:text-zinc-300">
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-white" />
                  </button>
                ))}
              </div>

              <p className="mt-8 text-[10px] font-black tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                Click a category for suggestions, or just type anything
              </p>
            </div>
          ) : (
            /* Chat History View */
            <div className="space-y-6 p-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-3',
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-none border',
                      msg.role === 'assistant'
                        ? 'border-indigo-600/20 bg-indigo-600/10 text-indigo-600'
                        : 'border-zinc-800 bg-zinc-900 text-white',
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] border p-4 text-sm leading-relaxed shadow-none',
                      msg.role === 'assistant'
                        ? 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'
                        : 'border-indigo-600 bg-indigo-600 font-medium text-white shadow-none',
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-indigo-600/20 bg-indigo-600/10 text-indigo-600">
                    <Bot className="h-4 w-4 animate-pulse" />
                  </div>
                  <div className="rounded-none border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 border-t border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="relative flex items-center gap-2">
          <Input
            placeholder="Type your request here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="h-14 rounded-none border-zinc-200 bg-white pr-14 text-sm font-medium text-zinc-900 focus-visible:ring-indigo-600/30 dark:border-zinc-800 dark:bg-[#09090b] dark:text-white"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-2 h-10 w-10 rounded-none bg-indigo-600 text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-4 text-center text-[9px] font-black tracking-widest text-zinc-400 uppercase opacity-60 dark:text-zinc-500">
          Powered by Noxfolio AI • Industrial Grade Automation
        </p>
      </div>
    </div>
  );

  return createPortal(chatContent, document.body);
}
