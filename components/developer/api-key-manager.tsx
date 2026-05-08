'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Key, Copy, RefreshCw, Eye, EyeOff, ShieldCheck, Loader2, Plus } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function APIKeyManager() {
  const { data: keys, error, mutate, isLoading } = useSWR('/api/developer/keys', fetcher);
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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 opacity-5">
        <Key className="w-16 h-16" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Noxfolio API Credentials</CardTitle>
              <CardDescription>Use these keys to authenticate your requests from external sites.</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Input 
              value={newKeyName} 
              onChange={(e) => setNewKeyName(e.target.value)} 
              placeholder="Key name..."
              className="w-40 bg-accent/30 rounded-xl"
            />
            <Button onClick={handleCreateKey} disabled={isCreating} className="rounded-xl">
              {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              New Key
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="py-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        ) : error ? (
          <div className="text-sm text-rose-500">Failed to load API keys.</div>
        ) : keys?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground italic text-sm">No API keys generated yet.</div>
        ) : (
          <div className="space-y-4">
            {keys.map((key: any) => (
              <div key={key.id} className="p-4 rounded-2xl bg-accent/20 border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{key.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Created {new Date(key.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <Input 
                      type={showKey === key.key ? 'text' : 'password'} 
                      value={key.key} 
                      readOnly 
                      className="bg-black/20 border-border/50 rounded-xl font-mono pr-12 text-xs"
                    />
                    <button 
                      onClick={() => setShowKey(showKey === key.key ? null : key.key)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showKey === key.key ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button variant="outline" className="rounded-xl border-border/50 h-9" onClick={() => copyToClipboard(key.key)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <p className="text-[11px] text-amber-500 font-medium leading-relaxed">
            <strong>Security Warning:</strong> These keys provide full access to your organization data. Never expose them in client-side code. Always use them in a secure backend environment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

