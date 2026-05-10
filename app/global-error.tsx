'use client';

import React from 'react';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="flex min-h-screen items-center justify-center bg-white p-6 text-black">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-black tracking-tight italic">
            Critical Error
          </h1>
          <p className="leading-relaxed font-medium text-zinc-500">
            A global error has occurred. Please try refreshing the page or
            contacting support if the problem persists.
          </p>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs break-all text-zinc-600">
            {error.message}
          </div>
          <button
            onClick={() => reset()}
            className="h-12 w-full rounded-xl bg-black font-bold text-white transition-transform active:scale-95"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
