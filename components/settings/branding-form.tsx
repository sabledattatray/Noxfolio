'use client';

import { useState, useEffect } from 'react';
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
  Globe,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Info,
} from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { Organization } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BrandingForm() {
  const { data: org } = useSWR<Organization>('/api/organization', fetcher);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [branding, setBranding] = useState<any>({
    primaryColor: '#000000',
    accentColor: '#f4f4f5',
    font: 'Inter',
    darkMode: true,
    logo: null,
  });
  const [customDomain, setCustomDomain] = useState('');

  // Sync state with SWR data
  useEffect(() => {
    if (org) {
      if (org.branding) setBranding(org.branding);
      if (org.customDomain) {
        setCustomDomain(org.customDomain);
        setIsVerified(true);
      }
    }
  }, [org]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/organization/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branding, customDomain }),
      });
      if (res.ok) {
        mutate('/api/organization');
        alert(
          'Branding applied successfully! Some changes may take a few minutes to propagate.',
        );
      }
    } catch (error) {
      console.error('Failed to save branding:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDNS = async () => {
    if (!customDomain) return;
    setVerifying(true);
    // Simulate DNS check
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsVerified(true);
    setVerifying(false);
  };

  const resetToDefault = () => {
    setBranding({
      primaryColor: '#000000',
      accentColor: '#f4f4f5',
      font: 'Inter',
      darkMode: true,
      logo: null,
    });
    setCustomDomain('');
    setIsVerified(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding({ ...branding, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 overflow-hidden rounded-none backdrop-blur-sm">
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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            {/* Color Section */}
            <div className="space-y-4">
              <Label className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
                Primary Identity
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-xs font-bold">
                    Brand Primary
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
                      className="border-border/50 h-10 w-12 cursor-pointer rounded-none p-1"
                    />
                    <Input
                      value={branding.primaryColor || '#000000'}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          primaryColor: e.target.value,
                        })
                      }
                      className="rounded-none font-mono text-xs uppercase"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor" className="text-xs font-bold">
                    Brand Accent
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
                      className="border-border/50 h-10 w-12 cursor-pointer rounded-none p-1"
                    />
                    <Input
                      value={branding.accentColor || '#f4f4f5'}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          accentColor: e.target.value,
                        })
                      }
                      className="rounded-none font-mono text-xs uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Section */}
            <div className="space-y-4">
              <Label className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
                Domain Configuration
              </Label>
              <div className="space-y-2">
                <Label htmlFor="customDomain" className="text-xs font-bold">
                  Custom Domain
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="customDomain"
                      placeholder="billing.yourcompany.com"
                      value={customDomain}
                      className="rounded-none pl-10"
                      onChange={(e) => {
                        setCustomDomain(e.target.value);
                        setIsVerified(false);
                      }}
                    />
                  </div>
                  <Button
                    variant={isVerified ? 'outline' : 'default'}
                    size="sm"
                    onClick={handleVerifyDNS}
                    disabled={verifying || !customDomain}
                    className="rounded-none px-6 font-bold"
                  >
                    {verifying ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isVerified ? (
                      <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" />
                    ) : (
                      'Verify DNS'
                    )}
                    {isVerified ? 'Verified' : 'Verify'}
                  </Button>
                </div>
                <div className="bg-accent/30 border-border/50 flex items-center gap-3 rounded-none border border-dashed p-3">
                  <Info className="text-primary h-4 w-4" />
                  <p className="text-[10px] leading-relaxed font-medium">
                    Point your CNAME record to{' '}
                    <code className="bg-background text-primary px-1 font-bold">
                      cname.noxfolio.com
                    </code>{' '}
                    to enable white-labeling.
                  </p>
                </div>
              </div>
            </div>

            {/* Assets Section */}
            <div className="space-y-4">
              <Label className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
                Visual Assets
              </Label>
              <div
                className="border-border/50 hover:border-primary/50 group bg-accent/5 relative flex cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-none border-2 border-dashed p-10 transition-colors"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleLogoUpload}
                />
                {branding.logo ? (
                  <div className="relative flex w-full flex-col items-center gap-4">
                    <div className="border-border/50 flex aspect-video w-full items-center justify-center overflow-hidden border bg-white/5 p-4">
                      <img
                        src={branding.logo}
                        alt="Logo Preview"
                        className="max-h-full max-w-full object-contain drop-shadow-md"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none text-[10px] font-bold tracking-widest uppercase"
                    >
                      Change Logo
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-none shadow-sm transition-transform group-hover:scale-110">
                      <ImageIcon className="h-7 w-7" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black tracking-tight uppercase">
                        Click to upload logo
                      </p>
                      <p className="text-muted-foreground mt-1 text-[10px] font-medium">
                        Transparent PNG suggested (Max 2MB)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <Label className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
              Real-time Preview
            </Label>
            <div className="border-border/50 relative space-y-6 overflow-hidden rounded-none border bg-[#050505] p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {branding.logo ? (
                    <img
                      src={branding.logo}
                      className="h-6 w-auto object-contain"
                      alt="Preview Logo"
                    />
                  ) : (
                    <div
                      className="bg-primary h-6 w-6 rounded-none"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                  )}
                  <div className="h-3 w-20 rounded-none bg-white/10" />
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-8 rounded-none bg-white/5" />
                  <div className="h-2 w-8 rounded-none bg-white/5" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex h-10 w-full items-center rounded-none border border-white/10 bg-white/5 px-4">
                  <div className="h-2 w-1/3 rounded-none bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex h-24 items-center justify-center rounded-none border border-white/5 bg-white/5">
                    <Check className="h-6 w-6 text-emerald-500 opacity-20" />
                  </div>
                  <div className="h-24 rounded-none border border-white/5 bg-white/5" />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  className="h-12 w-full rounded-none text-xs font-black tracking-[0.15em] uppercase shadow-xl"
                  style={{
                    backgroundColor: branding.primaryColor,
                    color: '#fff',
                  }}
                >
                  Sample Button
                </Button>
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="text-muted-foreground h-3 w-3" />
                  <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
                    Enterprise Identity Active
                  </span>
                </div>
              </div>

              <div
                className="via-primary absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent to-transparent opacity-30"
                style={{ '--primary': branding.primaryColor } as any}
              />
            </div>
          </div>
        </div>

        <div className="border-border/50 flex items-center justify-between border-t pt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefault}
            className="text-muted-foreground hover:text-foreground rounded-none font-bold"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset to default
          </Button>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-border/50 rounded-none px-8 font-bold"
            >
              Preview Theme
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="shadow-primary/20 h-12 rounded-none px-12 text-xs font-black tracking-widest uppercase shadow-lg"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Apply Branding
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
