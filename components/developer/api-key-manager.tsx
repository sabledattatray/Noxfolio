'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Key,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  Plus,
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function APIKeyManager() {
  const {
    data: keysData,
    error,
    mutate,
    isLoading,
  } = useSWR('/api/developer/keys', fetcher);

  const keys = Array.isArray(keysData) ? keysData : [];
  const apiError =
    error || (!isLoading && !Array.isArray(keysData) ? keysData?.error : null);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('Default API Key');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API Key copied to clipboard!');
  };

  const handleCreateKey = async () => {
    setIsCreating(true);
    try {
      const res = await fetch('/api/developer/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      if (res.ok) {
        const data = await res.json();
        await mutate();
        setShowKey(data.key);
      }
    } catch (err) {
      console.error('Failed to create key:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 right-0 p-6 opacity-5">
        <Key className="h-16 w-16" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Noxfolio API Credentials</CardTitle>
              <CardDescription>
                Use these keys to authenticate your requests from external
                sites.
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name..."
              className="bg-accent/30 w-40 rounded-xl"
            />
            <Button
              onClick={handleCreateKey}
              disabled={isCreating}
              className="rounded-xl"
            >
              {isCreating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              New Key
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        ) : apiError ? (
          <div className="text-sm text-rose-500">
            {apiError || 'Failed to load API keys.'}
          </div>
        ) : keys.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            No API keys generated yet.
          </div>
        ) : (
          <div className="space-y-4">
            {keys.map((key: any) => (
              <div
                key={key.id}
                className="bg-accent/20 border-border/50 space-y-3 rounded-2xl border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{key.name}</span>
                  <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    Created {new Date(key.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="group relative flex-1">
                    <Input
                      type={showKey === key.key ? 'text' : 'password'}
                      value={key.key}
                      readOnly
                      className="border-border/50 rounded-xl bg-black/20 pr-12 font-mono text-xs"
                    />
                    <button
                      onClick={() =>
                        setShowKey(showKey === key.key ? null : key.key)
                      }
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                    >
                      {showKey === key.key ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    className="border-border/50 h-9 rounded-xl"
                    onClick={() => copyToClipboard(key.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-[11px] leading-relaxed font-medium text-amber-500">
            <strong>Security Warning:</strong> These keys provide full access to
            your organization data. Never expose them in client-side code.
            Always use them in a secure backend environment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
