'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Quote, Loader2 } from 'lucide-react';

type QuoteData = {
  quote: string;
  author: string;
};

const STORAGE_KEY = 'quote_random_cache_v2';
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const QUOTABLE_ENDPOINT = '/api/quotes';

const FALLBACK_QUOTES: QuoteData[] = [
  { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
];

export function QuoteBlock({ ttl = CACHE_TTL_MS }: { ttl?: number }) {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to track the current quote without triggering re-renders in fetchQuote
  const quoteRef = React.useRef<QuoteData | null>(null);
  
  // Update ref whenever quote state changes
  useEffect(() => {
    quoteRef.current = quote;
  }, [quote]);

  const readCache = useCallback((): QuoteData | null => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { ts: number; data: QuoteData };
      if (Date.now() - parsed.ts > ttl) {
        sessionStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed.data;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, [ttl]);

  const writeCache = useCallback((data: QuoteData) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data }));
    } catch {
      // ignore storage errors (private mode)
    }
  }, []);

  const fetchQuote = useCallback(async (signal?: AbortSignal, { setBusy = true } = {}) => {
    if (setBusy) {
      setLoading(true);
      setError(null);
    }
    try {
      // Create a timeout signal
      const timeoutController = new AbortController();
      const timeoutId = setTimeout(() => timeoutController.abort(), 5000); // 5 second timeout
      
      const res = await fetch(QUOTABLE_ENDPOINT, { 
        signal: signal || timeoutController.signal 
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      
      // Internal API returns { quote, author } directly
      const data: QuoteData = {
        quote: String(json.quote ?? 'No content'),
        author: String(json.author ?? 'Unknown'),
      };
      setQuote(data);
      writeCache(data);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.error('Quote fetch failed:', err);
      setError('Using offline quotes.');
      
      // Use ref to check if we already have a quote
      if (!quoteRef.current) {
        const randomFallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        setQuote(randomFallback);
        // Don't cache fallback to allow retrying API later
      }
    } finally {
      if (setBusy) setLoading(false);
    }
  }, [writeCache]); // Removed 'quote' dependency

  useEffect(() => {
    const controller = new AbortController();
    const cached = readCache();
    if (cached) {
      // show cached immediately, then quietly revalidate in background
      setQuote(cached);
      setLoading(false);
      fetchQuote(controller.signal, { setBusy: false }).catch(() => {});
    } else {
      fetchQuote(controller.signal).catch(() => {});
    }

    // Optional: refresh when tab becomes visible if cache expired
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        const c = readCache();
        if (!c) fetchQuote(controller.signal, { setBusy: false }).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      controller.abort();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [fetchQuote, readCache]);

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Random quote"
      className="relative w-full rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-150 "
    >
      {loading ? (
        <div className="flex h-36 w-full items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse grid place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-48 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="relative z-10">
              <Quote className="mb-4 h-10 w-10 text-zinc-400/40 dark:text-zinc-300/20" />
              <p className="font-serif text-lg italic leading-relaxed text-zinc-900 dark:text-white/90 md:text-xl">
                &ldquo;{quote?.quote ?? 'No quote available'}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {quote?.author ?? 'Unknown'}
                </span>
              </div>

              {/* Quiet status note */}
              <div>
                {error && <span className="text-xs text-rose-600 dark:text-rose-400">{error}</span>}
              </div>
            </div>
          </div>

          {/* decorative blurred shape */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-36 rounded-full bg-gradient-to-tr from-zinc-50/40 to-transparent dark:from-black/30 blur-3xl" />
        </>
      )}
    </div>
  );
}
