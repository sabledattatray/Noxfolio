'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Key, Copy, RefreshCw, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export function APIKeyManager() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey] = useState('bf_live_7a2f9c8d1e3b5a6c9d0e1f2a3b4c5d6e7f8a9b0c');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    // Add toast notification here
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 opacity-5">
        <Key className="w-16 h-16" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <CardTitle>API Credentials</CardTitle>
        </div>
        <CardDescription>Use this key to authenticate your requests to the BillForge API.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Secret Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Input 
                type={showKey ? 'text' : 'password'} 
                value={apiKey} 
                readOnly 
                className="bg-accent/30 border-border/50 rounded-xl font-mono pr-12"
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button variant="outline" className="rounded-xl border-border/50" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <p className="text-[10px] text-amber-500/80 font-medium">
            Keep this key secret. If compromised, rotate it immediately.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-sm font-bold">Permissions</p>
            <p className="text-xs text-muted-foreground">Full Access (All Scopes)</p>
          </div>
          <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rotate Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
