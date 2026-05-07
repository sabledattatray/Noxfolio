'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Image as ImageIcon, Loader2, Check, RefreshCcw } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { Organization } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BrandingForm() {
  const { data: org } = useSWR<Organization>('/api/organization', fetcher);
  const [loading, setLoading] = useState(false);
  const [branding, setBranding] = useState<any>(org?.branding || {
    primaryColor: '#000000',
    accentColor: '#f4f4f5',
    font: 'Inter',
    darkMode: true
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/organization/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branding }),
      });
      if (res.ok) {
        mutate('/api/organization');
        // Optionally trigger a page refresh or dynamic theme update
      }
    } catch (error) {
      console.error('Failed to save branding:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    setBranding({
      primaryColor: '#000000',
      accentColor: '#f4f4f5',
      font: 'Inter',
      darkMode: true
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding({ ...branding, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Brand Customization
        </CardTitle>
        <CardDescription>Configure your organization's visual identity across the platform.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Colors</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-xs">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color" 
                      id="primaryColor"
                      value={branding.primaryColor || '#000000'}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-12 h-10 p-1 rounded-lg cursor-pointer border-border/50"
                    />
                    <Input 
                      value={branding.primaryColor || '#000000'}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="font-mono text-xs rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor" className="text-xs">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color" 
                      id="accentColor"
                      value={branding.accentColor || '#f4f4f5'}
                      onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                      className="w-12 h-10 p-1 rounded-lg cursor-pointer border-border/50"
                    />
                    <Input 
                      value={branding.accentColor || '#f4f4f5'}
                      onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                      className="font-mono text-xs rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Configuration</Label>
              <div className="space-y-2">
                <Label htmlFor="customDomain" className="text-xs">Custom Domain (CNAME)</Label>
                <div className="flex gap-2">
                  <Input 
                    id="customDomain"
                    placeholder="billing.yourcompany.com"
                    value={org?.customDomain || ''}
                    className="rounded-lg"
                    onChange={(e) => {
                      // This would normally call an API to verify DNS
                    }}
                  />
                  <Button variant="outline" size="sm" className="rounded-lg">Verify DNS</Button>
                </div>
                <p className="text-[10px] text-muted-foreground">Point your CNAME record to <code className="bg-muted px-1 rounded">cname.billforge.com</code></p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Assets</Label>
              <div 
                className="p-6 border-2 border-dashed border-border/50 rounded-2xl flex flex-col items-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <input 
                  type="file" 
                  id="logo-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                {branding.logo ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-accent/20 flex items-center justify-center p-4">
                    <img src={branding.logo} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <RefreshCcw className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-medium">Click to upload logo</p>
                    <p className="text-[10px] text-muted-foreground">Transparent PNG suggested (Max 2MB)</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preview</Label>
            <div className="rounded-2xl border border-border/50 p-6 space-y-4 bg-background shadow-inner relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none" 
                style={{ backgroundColor: branding.primaryColor }}
              />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary" style={{ backgroundColor: branding.primaryColor }} />
                <div className="h-2 w-24 bg-accent/50 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-8 w-full bg-accent/30 rounded-lg" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-20 bg-accent/20 rounded-lg" />
                  <div className="h-20 bg-accent/20 rounded-lg" />
                </div>
              </div>
              <Button 
                size="sm" 
                className="w-full rounded-lg" 
                style={{ backgroundColor: branding.primaryColor }}
              >
                Sample Button
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={resetToDefault} className="text-muted-foreground hover:text-foreground">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset to default
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">Preview Theme</Button>
            <Button onClick={handleSave} disabled={loading} className="rounded-xl px-8 shadow-lg shadow-primary/20">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
              Apply Branding
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
