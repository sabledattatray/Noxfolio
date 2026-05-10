'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Palette,
  Image as ImageIcon,
  Loader2,
  Check,
  RefreshCcw,
} from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { Organization } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BrandingForm() {
  const { data: org } = useSWR<Organization>('/api/organization', fetcher);
  const [loading, setLoading] = useState(false);
  const [branding, setBranding] = useState<any>(
    org?.branding || {
      primaryColor: '#000000',
      accentColor: '#f4f4f5',
      font: 'Inter',
      darkMode: true,
    },
  );

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
      darkMode: true,
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
    <Card className="border-border/50 bg-card/50 overflow-hidden backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="text-primary h-5 w-5" />
          Brand Customization
        </CardTitle>
        <CardDescription>
          Configure your organization's visual identity across the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Colors
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-xs">
                    Primary Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="primaryColor"
                      value={branding.primaryColor || '#000000'}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          primaryColor: e.target.value,
                        })
                      }
                      className="border-border/50 h-10 w-12 cursor-pointer rounded-lg p-1"
                    />
                    <Input
                      value={branding.primaryColor || '#000000'}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          primaryColor: e.target.value,
                        })
                      }
                      className="rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor" className="text-xs">
                    Accent Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="accentColor"
                      value={branding.accentColor || '#f4f4f5'}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          accentColor: e.target.value,
                        })
                      }
                      className="border-border/50 h-10 w-12 cursor-pointer rounded-lg p-1"
                    />
                    <Input
                      value={branding.accentColor || '#f4f4f5'}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          accentColor: e.target.value,
                        })
                      }
                      className="rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Configuration
              </Label>
              <div className="space-y-2">
                <Label htmlFor="customDomain" className="text-xs">
                  Custom Domain (CNAME)
                </Label>
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
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Verify DNS
                  </Button>
                </div>
                <p className="text-muted-foreground text-[10px]">
                  Point your CNAME record to{' '}
                  <code className="bg-muted rounded px-1">
                    cname.noxfolio.com
                  </code>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Assets
              </Label>
              <div
                className="border-border/50 hover:border-primary/50 group relative flex cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed p-6 transition-colors"
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
                  <div className="bg-accent/20 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl p-4">
                    <img
                      src={branding.logo}
                      alt="Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <RefreshCcw className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-primary/5 text-muted-foreground group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-medium">Click to upload logo</p>
                    <p className="text-muted-foreground text-[10px]">
                      Transparent PNG suggested (Max 2MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Preview
            </Label>
            <div className="border-border/50 bg-background relative space-y-4 overflow-hidden rounded-2xl border p-6 shadow-inner">
              <div
                className="pointer-events-none absolute inset-0 opacity-5"
                style={{ backgroundColor: branding.primaryColor }}
              />
              <div className="flex items-center gap-2">
                <div
                  className="bg-primary h-6 w-6 rounded"
                  style={{ backgroundColor: branding.primaryColor }}
                />
                <div className="bg-accent/50 h-2 w-24 rounded" />
              </div>
              <div className="space-y-2">
                <div className="bg-accent/30 h-8 w-full rounded-lg" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-accent/20 h-20 rounded-lg" />
                  <div className="bg-accent/20 h-20 rounded-lg" />
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

        <div className="border-border/50 flex items-center justify-between border-t pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefault}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset to default
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              Preview Theme
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="shadow-primary/20 rounded-xl px-8 shadow-lg"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Apply Branding
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
