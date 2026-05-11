'use client';

import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Error:', error);
  }, [error]);

  return (
    <div className="animate-in fade-in flex min-h-[400px] items-center justify-center p-6 duration-500">
      <Card className="bg-card border-destructive/20 relative w-full max-w-md overflow-hidden rounded-[32px] shadow-2xl">
        <div className="bg-destructive absolute top-0 left-0 h-1.5 w-full" />
        <CardHeader className="flex flex-col items-center pt-12 text-center">
          <div className="bg-destructive/10 text-destructive mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <AlertCircle className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight">
            Something went wrong
          </CardTitle>
          <CardDescription className="px-4 font-medium">
            We've encountered an unexpected error. Our engineers have been
            notified.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 px-8 pb-12">
          <div className="bg-muted/50 border-border/50 text-muted-foreground max-h-[100px] w-full overflow-auto rounded-xl border p-4 font-mono text-[10px]">
            {error.message || 'Unknown runtime error'}
          </div>
          <div className="grid w-full grid-cols-2 gap-4 pt-4">
            <Button
              onClick={() => reset()}
              className="shadow-primary/20 h-12 rounded-xl font-bold shadow-lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl font-bold"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
